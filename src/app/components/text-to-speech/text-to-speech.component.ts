import { Component, NgZone } from '@angular/core';
import { io } from '../../../../node_modules/socket.io-client';
import { text } from 'express';
import { Router } from '@angular/router';


@Component({
  selector: 'app-text-to-speech',
  templateUrl: './text-to-speech.component.html',
  styleUrls: ['./text-to-speech.component.css']
})
export class TextToSpeechComponent {
  textToConvert: string = "";
  socket: any;
  texts: any[] = [];
  convertSuccess: boolean = false;
  

  constructor(private zone: NgZone, private router: Router){ 
    this.socket = io("http://localhost:8080");
  }

  ngOnInit(){
    this.listen2Task();
  }

  listen2Task() {
    this.socket.on("speech-output", (data:any) => {
      this.convertSuccess = true;
    })
  }
  

  convertText(){
    if (this.textToConvert != "") {
      this.socket.emit('convertTextToSpeechTask', this.textToConvert);
    }
  }
}


