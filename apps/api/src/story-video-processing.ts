import {execFile} from "node:child_process";
import {mkdtemp,writeFile,readFile,rm} from "node:fs/promises";
import {tmpdir} from "node:os";
import {join} from "node:path";
import {promisify} from "node:util";
import {BadRequestException,ServiceUnavailableException} from "@nestjs/common";
const execute=promisify(execFile);
export const maxVideoInputBytes=5*1024*1024;
export const maxVideoOutputBytes=10*1024*1024;
let processing=false;
async function run(binary:string,args:string[],timeout:number){try{return await execute(binary,args,{timeout,killSignal:"SIGKILL",maxBuffer:256*1024,encoding:"utf8"});}catch(error){if((error as NodeJS.ErrnoException).code==="ENOENT")throw new ServiceUnavailableException("video-processing-unavailable");throw new BadRequestException("invalid-story-video");}}
const inputOptions=["-max_alloc","134217728","-max_pixels","2073600","-protocol_whitelist","file","-f","mov","-enable_drefs","0","-use_absolute_path","0"];
async function probe(path:string){const output=await run("ffprobe",["-v","error",...inputOptions,"-i",path,"-show_entries","format=duration:stream=codec_type,codec_name,width,height,avg_frame_rate","-of","json"],10000);return JSON.parse(output.stdout) as {format?:{duration?:string};streams?:{codec_type?:string;codec_name?:string;width?:number;height?:number;avg_frame_rate?:string}[]};}
export async function normalizeStoryVideo(bytes:Buffer){
 if(!bytes.length||bytes.length>maxVideoInputBytes)throw new BadRequestException("invalid-video-size");
 if(processing)throw new ServiceUnavailableException("video-processing-busy");processing=true;
 let directory:string|undefined;
 try{
  directory=await mkdtemp(join(tmpdir(),"negarin-story-video-"));const input=join(directory,"input.mp4"),output=join(directory,"output.mp4");await writeFile(input,bytes,{mode:0o600});
  const metadata=await probe(input),streams=metadata.streams??[],video=streams.filter(s=>s.codec_type==="video"),audio=streams.filter(s=>s.codec_type==="audio"),duration=Number(metadata.format?.duration);
  const first=video[0],rate=first?.avg_frame_rate?.split("/").map(Number),fps=rate&&rate.length===2?rate[0]!/rate[1]!:NaN;
  if(video.length!==1||audio.length>1||streams.length!==video.length+audio.length||!first||!Number.isFinite(duration)||duration<=0||duration>60||!first.width||!first.height||first.width>1920||first.height>1920||first.width*first.height>2073600||!Number.isFinite(fps)||fps<=0||fps>60)throw new BadRequestException("invalid-video-metadata");
  await run("ffmpeg",["-nostdin","-hide_banner","-loglevel","error","-xerror","-filter_threads","1","-threads","1",...inputOptions,"-i",input,"-map","0:v:0","-map","0:a:0?","-map_metadata","-1","-map_chapters","-1","-t","60","-vf","scale=w='min(1280,iw)':h='min(1280,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2","-r","30","-c:v","libx264","-threads","1","-preset","veryfast","-crf","26","-pix_fmt","yuv420p","-c:a","aac","-b:a","128k","-movflags","+faststart","-fs",String(maxVideoOutputBytes+1),"-y",output],60000);
  const data=await readFile(output);if(!data.length||data.length>maxVideoOutputBytes)throw new BadRequestException("video-output-too-large");
  const normalized=await probe(output),stream=normalized.streams?.find(s=>s.codec_type==="video"),seconds=Number(normalized.format?.duration);
  if(!stream?.width||!stream.height||stream.codec_name!=="h264"||!Number.isFinite(seconds)||seconds<=0||seconds>60.1||seconds+0.2<duration)throw new BadRequestException("invalid-video-output");
  return {data,width:stream.width,height:stream.height,durationMs:Math.round(seconds*1000)};
 }catch(error){if(error instanceof BadRequestException||error instanceof ServiceUnavailableException)throw error;throw new BadRequestException("invalid-story-video");}
 finally{if(directory)await rm(directory,{recursive:true,force:true}).catch(()=>undefined);processing=false;}
}
