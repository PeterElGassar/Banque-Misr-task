import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GlobalService } from './global.service';
import { FetchAll } from '../data/modal/fetch-all';
import { Convert } from '../data/modal/convert';
import { FetchOne } from '../data/modal/fetch-one';

@Injectable({
  providedIn: 'root'
})
export class CurrencyExchangeService {

  access_key:any = environment.fastforex_key as Object;
  params = new HttpParams().appendAll({ api_key: this.access_key });

  constructor(private _globalService: GlobalService) {}

  getAllCurrencies(): Observable<any> {
    return this._globalService.get(`currencies`,this.params);
  }

  fetchAll(from?:any): Observable<FetchAll> {
    this.params = this.params.appendAll({...{from} });
    
    return this._globalService.get(`fetch-all`,this.params);
  }
  
  fetchOne(val:any): Observable<FetchOne> {
    this.params = this.params.appendAll({...val });
    return this._globalService.get(`fetch-one`,this.params);
  }

  convert(val:any): Observable<Convert> {
    this.params = this.params.appendAll({...val });
    
    return this._globalService.get(`convert`,this.params);
  }
}
