import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img:string,type: 'users'|'doctors'|'hospitals'): string {
    if(img?.includes('lh3.googleusercontent.com')){
      return img;
    }
    let imgFile = 'no-image';
    if(img && img.length>0){
      imgFile = img;
    }
    return `${environment.base_url}/uploads/${type}/${imgFile}`;
  }

}
