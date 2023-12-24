import { Component } from '@angular/core';
import { ModalImageService, UploadsService } from 'src/app/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent {
  public fileAvatar!:File;
  public avatarImage!: any;
  constructor(public modalImageService:ModalImageService,private uploadService:UploadsService){

  }
  closeModal(){
    this.modalImageService.closeModal();
  }
  onImgSelected(event: any) {

      const file: File = event.target.files[0];
      if(!file) return;
      this.fileAvatar = file;
      let reader = new FileReader();

      reader.onload = (e) => {
        // get the dataUrl
        let dataUrl = e.target?.result;
        // DO something with tht dataURl

        this.modalImageService.img = dataUrl as string;
      };
      reader.readAsDataURL(file);


  }
  updateAvatar(){
    // // const img = modalImageService.img as File;
    this.uploadService.updateAvatar(this.fileAvatar,this.modalImageService.type,this.modalImageService.id)
    .then(img=>{
      // this.authService.user.setUrlImg(img)
      this.modalImageService.newImage.emit(img);
      Swal.fire('Success','Updated image','success');
    })
    .catch(err=>{
      Swal.fire('Error','Updated image','error');
    })
    .finally(()=>{
      this.modalImageService.closeModal();
    });
  }
}
