import { FormGroup } from "@angular/forms";

export const equalsPasswords = function (pass1Name: string, pass2Name: string) {
  console.log('Equals password');
  return (formGroup: FormGroup) => {
    const pass1control = formGroup.get(pass1Name);
    const pass2control = formGroup.get(pass2Name);
    if(pass1control!.value===pass2control!.value){
      pass2control?.setErrors(null);
    }else{
      pass2control?.setErrors({noEquals:true});
    }
  };
}
