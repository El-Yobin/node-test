import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client/dist/socket.io';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: any;
  readonly url: string = 'http://192.168.1.236:3000';

  constructor() {
    this.socket = io(this.url);
  }

  public listen(eventName: string): Observable<any> {
    return new Observable((subscriber => {
      this.socket.on(eventName, data => {
        subscriber.next(data);
      });
    }));
  }

  public emit(eventName: string, data: any): void {
    this.socket.emit(eventName, data);
  }
}
