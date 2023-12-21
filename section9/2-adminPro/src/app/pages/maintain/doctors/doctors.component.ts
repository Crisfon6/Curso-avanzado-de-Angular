import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Doctor } from 'src/app/models';
import { DoctorsService, ModalImageService, SearchService } from 'src/app/services';
import { getImg } from 'src/app/utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [
  ]
})
export class DoctorsComponent implements OnInit , OnDestroy{

    loading = true;
    doctors: Doctor[] = [];
    subs!:Subscription;

    constructor(private doctorService: DoctorsService,private modalImageService:ModalImageService,private searchService:SearchService) {}

    ngOnInit(): void {
      this.getDoctors();
      this.subs = this.modalImageService.newImage.subscribe(img=>{
        this.getDoctors();
      });
    }
    ngOnDestroy(): void {
      this.subs.unsubscribe();
  }
    getDoctors() {
      this.loading = true;
      this.doctorService.getDoctors().subscribe((doctors) => {
        this.loading = false;
        this.doctors = doctors;
      });
    }

    search(mean: string) {
      if(mean.trim().length<1) {
        this.getDoctors();
        return;
      };
     this.searchService.search('doctors',mean).subscribe((doctors:Doctor[]) =>{
      this.doctors = doctors;
     })
    }

    deleteDoctor(id: string) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to rever this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.value) {
          this.doctorService.deleteDoctor(id).subscribe((doctor) => {
            Swal.fire('Deleted', 'Your Doctor has been deleted.', 'success');
          });
          this.getDoctors();
        }
      });
      return;
    }

    openModal(doctor:Doctor){
      const image = getImg(doctor.img!,'doctors');
      this.modalImageService.openModal(image,'doctors',doctor._id!);
    }
}
