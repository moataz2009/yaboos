import { Injectable } from '@angular/core';
import { END_POINTS } from './globals/global-config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataWithRanking } from '../models/data-with-ranking.model';
import { program, programsApiData } from '../models/program.model';


const API_URL = END_POINTS.programs;

@Injectable({
  providedIn: 'root'
})
export class programsService {

  constructor(private http: HttpClient) { }

 
     // get Album search
     getAll(offset: string , limit: string  ): Observable<DataWithRanking<program>> {
     
      let params = new HttpParams();
      params = params.append('offset' , offset);
      params = params.append('limit' , limit);
      return this.http.get<DataWithRanking<program>>(API_URL  ,{params:params}  ) }
    

     get(id: number): Observable<program> {
     return this.http.get<program>(API_URL + `/${id}`);
     }

    update( id: number ,model: program): Observable<program> {
    return this.http.put<program>(API_URL +`/${id}`, model);
    }
    
    delete(id): Observable<program>{
    return this.http.delete<program>(API_URL + `/${id}`);
    }
}
