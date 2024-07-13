import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket!: Socket;

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  onEvent(event: string, action: (...args: any[]) => void): void {
    this.socket.on(event, action);
  }

  emitEvent(event: string, payload: any): void {
    this.socket.emit(event, payload);
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
