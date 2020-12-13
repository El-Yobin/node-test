import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client/dist/socket.io';

export const FIELD_SIZE = 3500;

@Injectable({
  providedIn: 'root',
})
export class GameSocketService {
  public socket: any;
  readonly url: string = 'http://localhost:3000';

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
