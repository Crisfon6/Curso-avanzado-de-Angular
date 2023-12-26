import { MedicoComponent } from "src/app/intermediate2-int/medico/medico.component";
import { routes } from "./app.route";

describe('Main routes',()=>{
  it('Must exist the route /medico/:id',()=>{
    expect(routes).toContain( {path:'medico/:id',component:MedicoComponent})
  });
})
