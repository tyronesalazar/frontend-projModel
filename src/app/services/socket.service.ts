import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket;

  constructor() {
    this.socket = io('https://backend-projmodel.onrender.com/', {
      // this.socket = io('http://localhost:3000/', {
      auth: {
        token: localStorage.getItem('token') || '',
      },
    });
  }

  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }
  on(event: string, callback: Function) {
    this.socket.on(event, (data: any) => {
      callback(data);
    });
  }
  disconect() {
    this.socket.disconnect();
  }
}
