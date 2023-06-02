import { Injectable, Injector } from '@angular/core';
import { ConnectionService } from './connection.service';
import { catchError, map, throwError } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private _connectionService!: ConnectionService;

  constructor(private injector: Injector) {}

  public get connectionService(): ConnectionService {
    if (!this._connectionService) {      
      this._connectionService = this.injector.get(ConnectionService);
    }
    return this._connectionService;
  }

  async handleErrors(res: any) {
    if (
      res.status == 400 ||
      res.status == 402 ||
      res.status == 500 ||
      res.status == 0
    ) {
      this.displayToast(
        'try another time or check notwork connection',
        'dismiss'
      );
    }
  }

  async displayToast(messge: any, action: any) {
    // this._snackBar.open(messge, action);
  }

  // SECTION Connection Service
  post(url: string, body?: any, params?: HttpParams) {
    const request = params
      ? this.connectionService.post(url, body, params)
      : this.connectionService.post(url, body);
    return request.pipe(
      map((res: any) => res),
      catchError((res: any) => {
        this.handleErrors(res);
        return throwError(res);
      })
    );
  }

  get(url: string, params?: HttpParams) {
    const request = params
      ? this.connectionService.get(url, params)
      : this.connectionService.get(url);
    return request.pipe(
      map((res: any) => res),
      catchError((res: any) => {
        this.handleErrors(res);
        return throwError(res);
      })
    );
  }

}
