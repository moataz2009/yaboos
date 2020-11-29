
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MainURL } from '../../service/globals/global-config';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  readonly rootUrl = MainURL;
  constructor(private http: HttpClient) { }

  myFavourites(){

    return this.http.get(this.rootUrl+'/api/favourites?limit=1000', 
    {headers: new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})});

  }

  addToFavorite(SongId: String){
    
    var data = `{
      "songId": ${SongId}
    }`;

    return this.http.post(this.rootUrl+'/api/favourites', 
      data,
      {headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':'Bearer '+localStorage.getItem('userToken')
      })
    });

  }

  deleteFromFavorite(SongId: String){
    
    return this.http.delete(this.rootUrl+`/api/favourites/${SongId}`, 
      {headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':'Bearer '+localStorage.getItem('userToken')
      })
    });

  }

}
