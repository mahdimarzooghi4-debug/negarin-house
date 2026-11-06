import {describe,expect,it} from "vitest";
import {BadRequestException,ServiceUnavailableException} from "@nestjs/common";
import {normalizeStoryVideo,maxVideoInputBytes} from "./story-video-processing.js";
import {storyVideoFixture} from "./story-video-fixture.test-helper.js";
describe("story video normalization",{timeout:15000},()=>{
 it("decodes and encodes bounded MP4 as H.264 with real dimensions and duration",async()=>{const output=await normalizeStoryVideo(await storyVideoFixture());expect(output.width).toBeGreaterThan(0);expect(output.height).toBeGreaterThan(0);expect(output.durationMs).toBeGreaterThanOrEqual(900);expect(output.durationMs).toBeLessThanOrEqual(1200);expect(output.data.toString("ascii",4,8)).toBe("ftyp");});
 it("rejects oversized, corrupt and non-media inputs",async()=>{for(const bytes of [Buffer.alloc(0),Buffer.alloc(maxVideoInputBytes+1),Buffer.from("https://example.com/video.mp4"),Buffer.from("<svg/>")])await expect(normalizeStoryVideo(bytes)).rejects.toThrow(BadRequestException);});
 it("rejects duration and frame-rate limits before transcoding",async()=>{await expect(normalizeStoryVideo(await storyVideoFixture(61))).rejects.toThrow(BadRequestException);await expect(normalizeStoryVideo(await storyVideoFixture(1,61))).rejects.toThrow(BadRequestException);});
 it("limits encoding to one job per process and releases the slot",async()=>{const bytes=await storyVideoFixture();const first=normalizeStoryVideo(bytes);await expect(normalizeStoryVideo(bytes)).rejects.toThrow(ServiceUnavailableException);await first;await expect(normalizeStoryVideo(bytes)).resolves.toMatchObject({width:32,height:32});});
});
