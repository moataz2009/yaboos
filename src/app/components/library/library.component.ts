
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  
  searchTxt:string = '';
  constructor(private router: Router ) { }

    ngOnInit(): void {
      if(localStorage.getItem('searchTxt') != null){
        this.searchTxt = localStorage.getItem('searchTxt');
      }else {
        this.searchTxt = '';
      }
    }


    clenStoragSearch(){

      localStorage.removeItem('searchTxt');
      location.reload();

    }


}


