import { getBots } from "./array"

describe('Array test',()=>{
  it('Is mandatory return even 3 bots',()=>{
    const res = getBots();
    expect(res.length).toBeGreaterThanOrEqual(3);
  });
  it('Should contains Megaman and Robocop',()=>{
    const resp = getBots();
    expect(resp).toContain('Megaman');
    expect(resp).toContain('Robocop');
  })
})
