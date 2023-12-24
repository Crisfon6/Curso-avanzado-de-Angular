import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  // menu: any[] = [
  //   {
  //     title: 'Dashboard',
  //     icon: 'mdi mdi-gauge',
  //     submenu: [
  //       { title: 'Main', url: '/' },
  //       { title: 'ProgressBar', url: 'progress' },
  //       { title: 'Charts', url: 'grafica1' },
  //       { title: 'Promises', url: 'promises' },
  //       { title: 'Rxjs', url: 'rxjs' },
  //     ],
  //   },
  //   {
  //     title: 'Mantains',
  //     icon: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { title: 'User', url: 'users' },
  //       { title: 'Hospitals', url: 'hospitals' },
  //       { title: 'Doctors', url: 'doctors' },
  //       // { title: 'Promises', url: 'promises' },
  //       // // { title: 'Rxjs', url: 'rxjs' },
  //     ],
  //   },
  // ];
  menu: any[]=[];

  loadMenu(){
    this.menu = JSON.parse(localStorage.getItem('menu')!)|| []
  }
  // constructor() {}
}
