import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import * as io from 'socket.io-client';


@Injectable()
export class SocketService {

  private url = 'http://192.168.1.10:3000';
  private socket;

  constructor() {
    this.socket = io(this.url);
  }

  sendMessage(message) {
    this.socket.emit('add-message', message);
  }

  getMessages() {
    const observable = new Observable(observer => {
      // this.socket = io(this.url);
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  getWhiteBoard() {
    const observable = new Observable(observer => {
      this.socket.on('drawing', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  getWhiteBoardClear() {
    const observable = new Observable(observer => {
      this.socket.on('clear-drawing', () => {
        observer.next();
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  emit(message, data) {
    this.socket.emit(message, data);
  }

}
