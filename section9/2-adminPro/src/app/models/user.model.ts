import { environment } from "src/environments/environment.development"

export class User{
  constructor(
   public email:string,
   public name:string,
   public role?:string,
   public password?:string,
   public img?:string,
   public google?:boolean,
   public uid?:string
  ){
  }
  get urlImg(){
    if(this.img?.includes('lh3.googleusercontent.com')){
      return this.img;
    }
    const img = this.img || 'no-image';
    return `${environment.base_url}/uploads/users/${img}`;
  }

}
