import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private minUrlSource = new BehaviorSubject<string>("message defult");
  currentUrl = this.minUrlSource.asObservable();
  constructor() { }

  changeUrlPlayer(UrlPlayer: any){
    this.minUrlSource.next(UrlPlayer);
  }

}
