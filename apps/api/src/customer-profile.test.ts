import {describe,expect,it} from "vitest";
import {parseProfileCommand} from "./customer-profile.js";
describe("customer profile command",()=>{
 it("normalizes a display name and preserves the expected version",()=>{expect(parseProfileCommand({version:2,displayName:"  مریم احمدی  "})).toEqual({version:2,displayName:"مریم احمدی"});});
 it.each([null,[],{}, {version:0,displayName:" "},{version:-1,displayName:"نام"},{version:0,displayName:"نام",phone:"+989123456789"},{version:0,displayName:"نام",userId:"other"},{version:0,displayName:"x".repeat(101)},{version:0,displayName:"نام\nدیگر"}])("rejects malformed or identity-changing input %j",body=>{expect(()=>parseProfileCommand(body)).toThrow();});
});
