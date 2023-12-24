import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private theme = document.querySelector("#theme");

  constructor() {
    this.setTheme();
  }
  setTheme(){
    let href="./assets/css/colors/purple-dark.css";
    if(localStorage.getItem('theme') && localStorage.getItem('theme')!==(null || '') ){
      href = localStorage.getItem('theme')!;
    }
    this.theme?.setAttribute('href',href);
  }
  changeTheme(theme: string){
    const url = `./assets/css/colors/${theme}.css`;
    this.theme!.setAttribute('href',url);
    localStorage.setItem('theme',url);
    this.checkCurrentTheme();
  }
  checkCurrentTheme(){
   const links = document.querySelectorAll('.selector');

    // working
    links.forEach(el=>{
      el.classList.remove('working')
      const btnTheme = el.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.theme?.getAttribute('href');
      if(btnThemeUrl===currentTheme){
        el.classList.add('working');
      }
    })
  }
}
