import {describe,expect,it} from "vitest";
import {parseCustomerProfile} from "./profile-data";
describe("customer profile response",()=>{
 it("accepts an incomplete new profile without inventing a name",()=>{expect(parseCustomerProfile({version:0,displayName:"",phone:"+989121234567"})).toEqual({version:0,displayName:"",phone:"+989121234567"});});
 it("rejects invalid versions, unverified-shaped phone values and malformed names",()=>{
  for(const v of [{version:-1,displayName:"نام",phone:"+989121234567"},{version:0,displayName:" نام ",phone:"+989121234567"},{version:0,displayName:"نام",phone:"09121234567"},{version:0,displayName:"نام\n",phone:"+989121234567"}])expect(parseCustomerProfile(v)).toBeNull();
 });
});
