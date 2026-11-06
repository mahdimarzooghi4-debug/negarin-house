import {execFile} from "node:child_process";
import {promisify} from "node:util";
import {mkdtemp,readFile,rm} from "node:fs/promises";
import {join} from "node:path";
import {tmpdir} from "node:os";
export async function storyVideoFixture(duration=1,rate=15){const directory=await mkdtemp(join(tmpdir(),"negarin-video-fixture-"));try{const path=join(directory,"clip.mp4");await promisify(execFile)("ffmpeg",["-hide_banner","-loglevel","error","-f","lavfi","-i",`color=c=blue:s=32x32:r=${rate}:d=${duration}`,"-c:v","libx264","-threads","1","-pix_fmt","yuv420p","-y",path],{timeout:10000,killSignal:"SIGKILL"});return await readFile(path);}finally{await rm(directory,{recursive:true,force:true});}}
