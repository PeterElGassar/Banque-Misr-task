import { Injectable, Injector } from '@angular/core';
import { ConnectionService } from './connection.service';
import { catchError, map, throwError } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private connectionService!: ConnectionService;
  constructor(
    private injector: Injector,
  ) {}

  public get connectionServiceOBJ(): ConnectionService {
    if (!this.connectionService) {
      this.connectionService = this.injector.get(ConnectionService);
    }
    return this.connectionService;
  }

  async handleErrors(res:any) {
    if (
      res.status === 400 ||
      res.status === 402 ||
      res.status === 500 ||
      res.status === 0
    ) {
      // this.displayToast('Server Error', res.error.message);
    }
  }



    // SECTION Connection Service
    post(url: string, body?: any) {
      return this.connectionServiceOBJ.post(url, body).pipe(
        map((res: any) => res),
        catchError((res: any) => {
          this.handleErrors(res);
          return throwError(res);
        })
      );
    }
    get(url: string, params?: HttpParams) {
      const request = params
        ? this.connectionServiceOBJ.get(url, params)
        : this.connectionServiceOBJ.get(url);
      return request.pipe(
        map((res: any) => res),
        catchError((res: any) => {
          this.handleErrors(res);
          return throwError(res);
        })
      );
    }
    put(url: string, body?: any) {
      return this.connectionServiceOBJ.put(url, body).pipe(
        map((res: any) => res),
        catchError((res: any) => {
          this.handleErrors(res);
          return throwError(res);
        })
      );
    }
    
    patch(url: string, body?: any) {
      return this.connectionServiceOBJ.patch(url, body).pipe(
        map((res: any) => res),
        catchError((res: any) => {
          this.handleErrors(res);
          return throwError(res);
        })
      );
    }
    delete(url: string) {
      return this.connectionServiceOBJ.delete(url).pipe(
        map((res: any) => res),
        catchError((res: any) => {
          this.handleErrors(res);
          return throwError(res);
        })
      );
    }
}
