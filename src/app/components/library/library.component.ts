
import { Component, OnInit , ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/shared/player.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  [x: string]: any;
  headerMessage : string;
  searchTxt:string = '';
  constructor(
      private router: Router, 
      private playerUrl : PlayerService 
    ) { }


  HomeSearch(searchTxt)
  {
    localStorage.setItem('searchTxt',searchTxt);
    this.playerUrl.ActionPlayTextSearch(searchTxt);
    this.router.navigate([`/Libaray/songs`]);
  }

  fillHeader(message , url)
  {
    this.IsMobileHeader = true;
    this.headerMessage =message;
    this.mobileAppUrl =url;
  }
  getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor;
      // Windows Phone must come first because its UA also contains "Android"
      if (/android/i.test(userAgent)) {
        this.mobileAppUrl="https://play.google.com/";
        this.fillHeader("Get Yaboos  Mobile App" ,  this.mobileAppUrl);
          return "Android";

      }
  
      // iOS detection from: http://stackoverflow.com/a/9039885/177710
     else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
     this.mobileAppUrl="https://www.apple.com/lae/ios/app-store/";
      this.fillHeader("Get Yaboos  Mobile App" ,  this.mobileAppUrl);
          return "iOS";
      }
      else{
        // this.mobileAppUrl="https://play.anghami.com/";
        // this.fillHeader("Get Yaboos ios Mobile App" ,  this.mobileAppUrl);
        return "PC";
      }
  
     
  }




    ngOnInit(): void {

      this.getMobileOperatingSystem();

      if(localStorage.getItem('searchTxt') != null){
        this.searchTxt = localStorage.getItem('searchTxt');
      }else {
        this.searchTxt = '';
      }
    
    }


    clenStoragSearch(){

      localStorage.removeItem('searchTxt');
      this.router.navigate(['/Home']);

    }
    input_search_value() {
      
    //  if($("#inputsearch").val() == ''){
    //   $(".clear").hide();
    //  }
    //  else {
    //   $(".clear").show();
    //  }
    }

clearsearch(){
 
 this.HomeSearch('');
 $("#inputsearch").val('');

}

}
