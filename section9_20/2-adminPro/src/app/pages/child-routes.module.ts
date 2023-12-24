import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintain/users/users.component';
import { HospitalsComponent } from './maintain/hospitals/hospitals.component';
import { DoctorsComponent } from './maintain/doctors/doctors.component';
import { DoctorComponent } from './maintain/doctors/doctor/doctor.component';
import { SearchsComponent } from './searchs/searchs.component';
import { adminGuard } from '../guards/admin.guard';
import { RouterModule, Routes } from '@angular/router';

const childRoutes :Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {title:'Dashboard'}
  },
  {
    path: 'progress',
    component: ProgressComponent,
    data: {title:'Progress'}
  },
  {
    path: 'search/:mean',
    component: SearchsComponent,
    data: {title:'Searchs'}
  },
  {
    path: 'grafica1',
    component: Grafica1Component,
    data: {title:'Grafica 1'}
  },
  {
    path: 'account-settings',
    component: AccountSettingsComponent,
    data: {title:'Account settings'}
  },
  {
    path: 'promises',
    component: PromisesComponent,
    data: {title:'Promises'}
  },
  {
    path: 'rxjs',
    component: RxjsComponent,
    data: {title:'Rxjs'}
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: {title: 'Profile'}
  },
  // maintain
  {
    path: 'hospitals',
    component: HospitalsComponent,
    data: {title: 'Application hospitals'}
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [adminGuard],
    data: {title: 'Application user'}
  },
  {
    path: 'doctors',
    component: DoctorsComponent,
    data: {title: 'Application doctors'}
  },
  {
    path: 'doctor/:id',
    component: DoctorComponent,
    data: {title: 'Application doctors'}
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
]


@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
