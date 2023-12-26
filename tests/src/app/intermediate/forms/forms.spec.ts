import { FormBuilder } from "@angular/forms";
import { FormRegister } from "./forms";

describe('Forms test',()=>{
  let component: FormRegister;

  beforeEach(()=>{
    component = new FormRegister(new FormBuilder());
  });
  it('Must create a form with two fields,email and password',()=>{
    expect(component.form.contains('email')).toBeTruthy();
    expect(component.form.contains('password')).toBeTruthy();
  });

  it('The email is mandatory',()=>{
    const field = component.form.get('email');
    field?.setValue('');
    expect(field?.valid).toBeFalsy();
  });
  it('The email must be valid',()=>{
    const field = component.form.get('email');
    field?.setValue('cri@g.com');
    expect(field?.valid).toBeTruthy();
  });
});
