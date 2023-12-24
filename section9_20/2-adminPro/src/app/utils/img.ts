import { environment } from "src/environments/environment.development";

export const getImg = function(img:string,type: 'users'|'doctors'|'hospitals'): string {
  if(img?.includes('lh3.googleusercontent.com')){
    return img;
  }
  let imgFile = 'no-image';
  if(img && img.length>0){
    imgFile = img;
  }
  return `${environment.base_url}/uploads/${type}/${imgFile}`;
}
