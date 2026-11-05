import {describe,expect,it} from "vitest";
import {parseAddressBook} from "./address-data";
const address={id:"00000000-0000-4000-8000-000000000001",recipientName:"گیرنده",recipientPhone:"+989121234567",province:"تهران",city:"تهران",postalCode:"1234567890",fullAddress:"خیابان نمونه",isDefault:true};
describe("customer address book response",()=>{
  it("accepts empty books and canonical address data",()=>{
    expect(parseAddressBook({version:0,addresses:[]})).toEqual({version:0,addresses:[]});
    expect(parseAddressBook({version:1,addresses:[address]})?.addresses[0]).toEqual(address);
  });
  it("rejects duplicate IDs, invalid contact fields and inconsistent defaults",()=>{
    for(const addresses of [[address,address],[{...address,isDefault:false}],[{...address,postalCode:"123"}],[{...address,recipientPhone:"invalid"}]])expect(parseAddressBook({version:1,addresses})).toBeNull();
    expect(parseAddressBook({version:-1,addresses:[]})).toBeNull();
  });
});
