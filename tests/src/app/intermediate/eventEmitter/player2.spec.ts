import { Player2 } from "./player2";

describe('Player 2 emmit',()=>{
  let player : Player2;
  beforeEach(()=>player= new Player2());

  it('Must emit an event when getDamage',()=>{
    let newHp = 0;
    player.hpChange.subscribe(hp=>{
      newHp =hp;
    });
    player.getHurt(1000);
    expect(newHp).toBe(0);
  })
  it('Must emit an event when getDamage, and survive if the damage is less than 100',()=>{
    let newHp = 0;
    player.hpChange.subscribe(hp=>{
      newHp =hp;
    });
    player.getHurt(50);
    expect(newHp).toBe(50);
  })
})
