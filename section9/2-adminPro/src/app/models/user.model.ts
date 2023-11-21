import { environment } from "src/environments/environment.development"

export class User{
  constructor(
    private email:string,
    private name:string,
    private role?:string,
    private password?:string,
    private img?:string,
    private google?:boolean,
    private uid?:string
  ){
  }
  get urlImg(){
    if(this.img?.includes('lh3.googleusercontent.com')){
      return this.img;
    }
    const img = this.img || 'no-image';
    return `${environment.base_url}/uploads/users/${img}`;
  }
 get getEmail(){
  return this.email;
 }
 get getName(){
  return this.name;
 }
 get getUid(){
  return this.uid;
 }
 set setName(name:string){
  this.name = name;
 }
 set setEmail(email: string){
  this.email = email;
 }
 set setUrlImg(url:string){
  this.img = url;
 }
 get googleSigned(){
  return this.google;
 }
}
