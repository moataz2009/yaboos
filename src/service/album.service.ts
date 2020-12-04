import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { END_POINTS } from './globals/global-config';
import { Album } from 'src/models/abum.model';
import {  DataWithRanking } from 'src/models/data-with-ranking.model';
import {  Artist } from 'src/models/artist.model';
import { Observable } from 'rxjs';


const API_URL = END_POINTS.albums;
const APIURL = END_POINTS.allAlbums;
const GetArtistAlbum = END_POINTS.GetAlbumsOfArtist;

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http: HttpClient) { }

  create(model: Album): Observable<Album[]> {
    return this.http.post<Album[]>(API_URL, model);
  }
    // get Album search
  getAll(offset: string , limit: string  ): Observable<DataWithRanking<Album>> {
    let params = new HttpParams();
    params = params.append('offset' , offset);
    params = params.append('limit' , limit);
    return this.http.get<DataWithRanking<Album>>(API_URL  ,{params:params}  )
    }

  get(id: number): Observable<Album> {
  return this.http.get<Album>(API_URL + `/${id}`);
  }

   update( id: number ,model: Album): Observable<DataWithRanking<Album>> {
    return this.http.put<DataWithRanking<Album>>(API_URL +`/${id}`, model);
  }
  
  delete(id): Observable<Album>{
    return this.http.delete<Album>(API_URL + `/${id}`);
  }


  Search(offset: string , limit: string , Term:string, ArId?: any):  Observable<DataWithRanking<Album>>{
    if(ArId === null){

      let params = new HttpParams();
      params = params.append('offset' , offset);
      params = params.append('limit' , limit);
      params = params.append('filter' , Term);
     //console.log(params);
     //console.log("End Params");
      return this.http.get<DataWithRanking<Album>>(APIURL , {params:params} );


    }else{

      let params = new HttpParams();
      params = params.append('offset' , offset);
      params = params.append('limit' , limit);
      params = params.append('artist' , ArId);
      return this.http.get<DataWithRanking<Album>>(GetArtistAlbum , {params:params} );

    }
    
    
  }

  GetAlbumsOfArtist(offset: string , limit: string ,id:number):Observable<DataWithRanking<Album>> {
    
    let params = new HttpParams();

    params = params.append('offset' , offset);
    params = params.append('limit' , limit);
    params = params.append( 'artist' ,id.toString());

    return this.http.get<DataWithRanking<Album>>("http://188.225.184.108:9091/api/albums/GetAlbumsOfArtist" ,{params:params}  );
  }


 

}
