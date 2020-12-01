import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerOptionsService {

  private minVolume = new BehaviorSubject<String>(undefined);
  PlayerVolume = this.minVolume.asObservable();

  constructor(private playerSer: PlayerService) { }

  changeVolumePlayer(VolumePlayer: any){
    this.minVolume.next(VolumePlayer);
    localStorage.setItem('playerVolume', VolumePlayer);

    if(VolumePlayer === "lowest"){
      localStorage.setItem('playerVolumeValue', "0.25");
      this.playerSer.PlayerVolumeValue(0.25);
    }

    if(VolumePlayer === "low"){
      localStorage.setItem('playerVolumeValue', "0.50");
      this.playerSer.PlayerVolumeValue(0.50);

    }

    if(VolumePlayer === "meduim"){
      localStorage.setItem('playerVolumeValue', "0.75");
      this.playerSer.PlayerVolumeValue(0.75);
    }

    if(VolumePlayer === "Highest"){
      localStorage.setItem('playerVolumeValue', "1");
      this.playerSer.PlayerVolumeValue(1);
    }

  }
}
