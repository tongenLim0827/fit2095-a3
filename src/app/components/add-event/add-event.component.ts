import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {
  id: string = "";
  name: string = "";
  description: string = "";
  durationInMinutes: number = 0;
  image: string = "/assets/images/default_event.png";
  startDateTime: Date | String | undefined;
  endDateTime: Date | String | undefined;
  status: boolean = false;
  capacity: number = 1000;
  tickets: number = this.capacity;
  categoryList: any[] = []; 

  constructor(private dbService: DatabaseService, private router: Router) { }

  genRandId(){
    /**
     * This is a function to generate a random id for category
     * where the id will be in the following form:
     * EXX-1234 where it starts with a E, followed by two random characters, 
     * hypenated and end with 4 random digit number
     */
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let result = '';
    const charactersLength = 2;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
  return `E${result}-${Math.floor(Math.random()*(9999-1000+1))}`
  }

  onSaveEvent() {
    let obj = { 
      name: this.name, 
      description: this.description,
      startDateTime: this.startDateTime ,
      durationInMinutes: this.durationInMinutes,
      status: this.status,
      capacity: this.capacity,
      tickets: this.tickets,
      categoryList: this.categoryList,
      image: this.image,
      id: this.genRandId()
    };
    
    this.dbService.createEvent(obj).subscribe(result => {
      this.router.navigate(["/event-category/andy/list-events"]);
    });
  }
}

