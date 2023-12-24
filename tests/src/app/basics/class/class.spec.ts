import { Player } from "./class"

describe('Test class',()=>{
  let player = new Player();
  beforeAll(()=>{
    // console.log('beforeAll');
  });
  beforeEach(()=>{
    // console.log('beforeEach');
    player = new Player();
  });
  afterAll(()=>{
    // console.log('afterAll');
  });
  afterEach(()=>{
    // console.log('afterEach');
  });

  it('Must return 80 of hp, if get 20 of damage',()=>{

    const resp = player.getHurt(20);
    expect(resp).toBe(80);
  })
  it('Must return 50 of hp, if get 50 of damage',()=>{
    const resp = player.getHurt(50);
    expect(resp).toBe(50);
  })
  it('Must return 0 of hp, if get 100 or more of damage',()=>{
    const resp = player.getHurt(110);
    expect(resp).toBe(0);
  })
})
