import { Component } from '@angular/core';
import { io } from 'socket.io-client';


@Component({
  selector: 'app-translation-service',
  templateUrl: './translation-service.component.html',
  styleUrls: ['./translation-service.component.css']
})
export class TranslationServiceComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  text: string='';
  targ: string='';
  messages: Array<any> = [];
  socket: any;
  constructor() {
    this.socket = io();
  }
  ngOnInit() {
    this.messages = new Array();
    this.listen2Events();
  }
  listen2Events() {
    this.socket.on("msg", (data:string) => {
      this.messages.push(data);
    });
  }

  sendMessage() {
    let message={
      text:this.text,
      targ:this.targ
    }
    this.socket.emit("newMsg", message);
  }
}
