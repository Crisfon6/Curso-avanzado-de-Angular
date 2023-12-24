import { increase } from "./numbers"

describe('Number Test',()=>{
  it('Should return 100, if the number is higher than 100',()=>{
    const res = increase(300);
    expect(res).toBe(100);
  });
  it('Should return the input number more one, if the number is less than 100',()=>{
    const res = increase(50);
    expect(res).toBe(51);
  });
})
