import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor, Hospital } from 'src/app/models';
import { DoctorsService, HospitalService, ModalImageService, UploadsService } from 'src/app/services';
import Swal from 'sweetalert2';
import { getImg } from '../../../../utils/img';
import { delay } from 'rxjs';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [
  ]
})
export class DoctorComponent implements OnInit {

  public doctorForm!: FormGroup;
  public fileAvatar!:File;
  public hospitals!: Hospital[];
  public hospitalSelected!:Hospital;
  private imageNotFound = 'http://localhost:3000/api/uploads/users/no-image';
  doctorSelected!:Doctor;
  loadingDoctor = true;
  constructor(
    private uploadService:UploadsService,
    private fb: FormBuilder,
    private hospitalService:HospitalService,
    private doctorService:DoctorsService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private modalImageService:ModalImageService){}

  ngOnInit(): void {
    console.log('modal : ',this.modalImageService.hideModal);

   this.activatedRoute.params.subscribe(({id})=>{
      this.getDoctorById(id);
    })
  }
  getDoctorById(id:string){
    if(id!=='new'){
      this.doctorService.getDoctorById(id)
      // .pipe(delay(1000))
      .subscribe(doctor=>{
        this.doctorSelected = doctor.doctor;
        this.doctorFormInit();
        this.loadingDoctor =false;
        this.loadHospitals();
      })
    }else{
      this.doctorFormInit();
      this.loadingDoctor =false;
      this.loadHospitals();
    }
  }
  loadHospitals(){
    this.hospitalService.getHospitals().subscribe(hospitals=>{
      this.hospitals = hospitals;
      if(this.doctorSelected){
        console.log(this.doctorSelected);
        this.hospitalSelected = this.hospitals.find(h=>h._id===this.doctorSelected.hospital?._id)!;
        console.log(this.hospitalSelected);
      }
    });
  }
  doctorFormInit() {
    const doctorFound = this.doctorSelected ? true : false;

    const  urlImg = doctorFound ? getImg(this.doctorSelected.img!,'doctors') : this.imageNotFound;
    const  name = doctorFound ? this.doctorSelected.name : '';
    const  hospital = doctorFound ? this.doctorSelected.hospital?._id : '';
    this.doctorForm = this.fb.group({
      img: [urlImg],
      name:[name,[Validators.required]],
      hospital:[hospital,[Validators.required]]
    });
    this.doctorForm.get('hospital')?.valueChanges
    .subscribe(hospitalId=>{
     this.hospitalSelected = this.hospitals.find(hospital=>hospital._id===hospitalId)!;
    })
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
      this.doctorForm.get('img')?.setValue(dataUrl);
    };
    reader.readAsDataURL(file);
  }
  updateAvatar(id:string){
    this.uploadService.updateAvatar(this.fileAvatar,'doctors', id)
    .then(img=>{
      this.router.navigateByUrl(`/dashboard/doctor/${id}`);

      // Swal.fire('Success','Updated image','success');
    })
    .catch(err=>{
      // Swal.fire('Error','Updated image','error');
    });
  }
  saveDoctor(){
    const {name,hospital } = this.doctorForm.value;
    if(this.doctorSelected){
      this.doctorService.updateDoctor(this.doctorSelected._id,{name,hospital } ).subscribe(doctor=>{
        if(this.doctorForm.get('img')!.value!==this.doctorSelected.img && this.doctorForm.get('img')!.value.length>0){
          const doctorId = this.doctorSelected._id;
          this.updateAvatar(doctorId);
          Swal.fire('Success','Doctor updated','success');
        }
      })
    }
    else{

      this.doctorService.createDoctor({name,hospital }).subscribe((doctor:any)=>{
        Swal.fire('Success','Doctor created','success');
        if(this.doctorForm.get('img')!.value!==this.imageNotFound && this.doctorForm.get('img')!.value.length>0){
          const doctorId = doctor.doctor._id;
          this.updateAvatar(doctorId);
        }
      })

    }
  }
}
