// describe('Pruebas de string');
// it('Should return a string');

import { message } from "./string";

xdescribe('String test',()=>{
  it('should return a string',()=>{
    const resp = message('Crisfon6');
    // expect(typeof resp==='string')
    expect(typeof resp).toBe('string');
  })
  it('Should return a greet with the name',()=>{
    const name = 'Crisfon6';
    const resp = message(name);
    expect(resp).toContain(name);
  })
});
