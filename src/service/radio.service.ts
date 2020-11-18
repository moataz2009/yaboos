import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { END_POINTS } from './globals/global-config';
import { DataWithRanking } from 'src/models/data-with-ranking.model';
import { Observable } from 'rxjs';
import { Radio } from 'src/models/radio.model';

const API_URL = END_POINTS.radio;

@Injectable({
  providedIn: 'root'
})
export class RadioService {

  constructor(private http: HttpClient) { }

  playHistory(date: string , hour : string ): Observable<Radio> {
    let params = new HttpParams();
    params = params.append('datetime' , date);
    params = params.append('hour' , hour);
    return this.http.get<Radio>(API_URL ,{params:params});
  }

}
