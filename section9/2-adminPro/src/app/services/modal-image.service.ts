import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {
  private _hideModal : boolean = true;
  private _img !: string;
  private _type!: 'users' | 'hospitals' | 'doctors';
  private _id!: string;

  public newImage: EventEmitter<string> = new EventEmitter<string>();

  get hideModal(){
    return this._hideModal;
  }
  get type(){
    return this._type;
  }
  get id(){
    return this._id;
  }
  get img(){
    return this._img;
  }
  set img(image:string){
    this._img = image;
  }
  openModal(
    img:string,
    type: 'users' | 'hospitals' | 'doctors',
    id: string
    ){
    this._type = type;
    this._id = id;
    this._img = img;
    this._hideModal = false;
  }

  closeModal(){
    this._hideModal = true;
  }
}
