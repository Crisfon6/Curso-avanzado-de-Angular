import { inputUser } from "./booleans"

describe('Boolean test',()=>{
  it('Should return true',()=>{
    const res = inputUser();
    expect(res).toBeTruthy();
    expect(res).not.toBeFalse();
  })
})
