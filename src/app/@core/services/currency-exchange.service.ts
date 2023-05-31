import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyExchangeService {

  apiUrlPrefix = environment.baseUrl;
  access_key:any = environment.fastforex_key as Object;
  // params: HttpParams = new HttpParams();
  // params: any = new HttpParams();


  constructor(private _globalService: GlobalService) {}

  getLatest(): Observable<any> {
    let params = new HttpParams();
    params = params.appendAll({ access_key: this.access_key });
    let dateyear = new Date();
    let x =dateyear.toISOString().split('T')[0];
    ;
    return this._globalService.get(`${this.apiUrlPrefix}latest`,params);
  }


  getAllCurrencies(): Observable<any> {
    let params = new HttpParams();
    params = params.appendAll({ api_key: this.access_key });
    
    return this._globalService.get(`currencies`,params);
  }

  fetchAll(from?:any): Observable<any> {
    let params = new HttpParams();
    params = params.appendAll({ api_key: this.access_key,...{from} });
    debugger
    return this._globalService.get(`fetch-all`,params);
  }
  
  fetchOne(val:any): Observable<any> {
    let params = new HttpParams();
    params = params.appendAll({ api_key: this.access_key,...val });
    console.log(params);
    
    return this._globalService.get(`fetch-one`,params);
  }

  convert(val:any): Observable<any> {
    let params = new HttpParams();
    params = params.appendAll({ api_key: this.access_key,...val });
    console.log(params);
    
    return this._globalService.get(`convert`,params);
  }
}
