import { Component, OnDestroy, OnInit } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from 'src/app/models/hospital.model';
import Swal from 'sweetalert2';
import { Subscription, delay } from 'rxjs';
import { ModalImageComponent } from 'src/app/components/modal-image/modal-image.component';
import { ModalImageService, SearchService } from 'src/app/services';
import { getImg } from 'src/app/utils';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [],
})
export class HospitalsComponent implements OnInit, OnDestroy {

  loading = true;
  hospitals: Hospital[] = [];
  subs!:Subscription;

  constructor(private hospitalService: HospitalService,private modalImageService:ModalImageService,private searchService:SearchService) {}

  ngOnInit(): void {
    this.getHospitals();
    this.subs = this.modalImageService.newImage.subscribe(img=>{
      this.getHospitals();
    });
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
}
  getHospitals() {
    this.loading = true;
    this.hospitalService.getHospitals().subscribe((hospitals) => {
      this.loading = false;
      this.hospitals = hospitals;
    });
  }

  search(mean: string) {
    if(mean.trim().length<1) {
      this.getHospitals();
      return;
    };
   this.searchService.search('hospitals',mean).subscribe((hospitals:Hospital[]) =>{
    this.hospitals = hospitals;
   })
  }

  deleteHospital(id: string) {
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
        this.hospitalService.deleteHopital(id).subscribe((hospital) => {
          Swal.fire('Deleted', 'Your Hospital has been deleted.', 'success');
        });
        this.getHospitals();
      }
    });
    return;
  }
  async openModalCreateHospital() {
    const {value = ''} = await Swal.fire<string>({
      title: 'Create hospital',
      input: 'text',
      inputPlaceholder: 'Enter the hospital name',
      showCancelButton: true,
      inputAttributes: {
        // maxlength: '10',
        autocapitalize: 'true',
        autocorrect: 'off',
      },
    });
    if(value!.trim().length>0){
      this.hospitalService.createHopital(value!).subscribe(hospital=>{
        console.log(hospital);
        this.getHospitals();
      })
    }
    // if (password) {
    //   Swal.fire(`Entered password: ${password}`);
    // }
  }
  updateHospital(id: string, name: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to rever this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!',
    }).then((result) => {
      if (result.value) {
        this.hospitalService.updateHopital(id, name).subscribe((hospital) => {
          Swal.fire('Updated', 'Your Hospital has been updated.', 'success');
        });
      }
    });
    return;
  }
  createHospital() {}
  openModal(hospital:Hospital){
    const image = getImg(hospital.img!,'hospitals');
    this.modalImageService.openModal(image,'hospitals',hospital._id!);
  }
}
