import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILink } from './link';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  
  private _url: string = "/tripwire_ui/assets/data/csvjson.json";

  constructor(private http: HttpClient) { }

  getJson():Observable<any>{
    return this.http.get(this._url);
  }
  
}
