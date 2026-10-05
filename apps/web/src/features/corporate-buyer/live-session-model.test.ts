import {describe,expect,it} from "vitest";
import {isCorporateContext,parseCorporateGrantOptions,parseIdentityContext} from "./live-session-model";

describe("Corporate session model",()=>{
  it("accepts an active Corporate Buyer context",()=>{
    const context=parseIdentityContext({
      userId:"00000000-0000-4000-8000-000000000001",
      activeRole:"corporate-buyer",
      organizationId:"00000000-0000-4000-8000-000000000002"
    });
    expect(context).not.toBeNull();
    expect(isCorporateContext(context!)).toBe(true);
  });

  it("keeps another active role switchable instead of treating the identity as malformed",()=>{
    const context=parseIdentityContext({
      userId:"00000000-0000-4000-8000-000000000001",
      activeRole:"artist"
    });
    expect(context).not.toBeNull();
    expect(isCorporateContext(context!)).toBe(false);
  });

  it("offers only organization-scoped Corporate Buyer grants for explicit selection",()=>{
    expect(parseCorporateGrantOptions({grants:[
      {id:"1",role:"artist",organizationId:null,exportPartnerId:null},
      {id:"2",role:"corporate_buyer",organizationId:"org-a",exportPartnerId:null},
      {id:"3",role:"corporate_buyer",organizationId:null,exportPartnerId:null}
    ]})).toEqual([{id:"2",role:"corporate_buyer",organizationId:"org-a",exportPartnerId:null}]);
  });

  it("fails closed on malformed grant payloads",()=>{
    expect(parseCorporateGrantOptions({grants:[{id:"2",role:"corporate_buyer",organizationId:7,exportPartnerId:null}]})).toBeNull();
  });
});
