import {Injectable} from '@angular/core';
import {environment} from "../../config/environments/environment";
import {Observable} from 'rxjs/Observable';
import * as io from 'socket.io-client';


@Injectable()
export class SocketService {

  private url = environment.socket.baseUrl;
  private urlOpts = environment.socket.opts;
  private socket;

  constructor() {
    this.socket = io(this.url, this.urlOpts);
  }

  sendMessage(message) {
    this.socket.emit('add-message', message);
  }

  getMessages() {
    const observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  getWhiteBoardState() {
    const observable = new Observable( observer => {
      this.socket.on('current-drawing', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  getUpdateBoard() {
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
