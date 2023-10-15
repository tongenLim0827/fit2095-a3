import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-display-event',
  templateUrl: './display-event.component.html',
  styleUrls: ['./display-event.component.css']
})
export class DisplayEventComponent {
  eventsDB: any[] = [];
  theEvent: any = null;

  constructor(private dbService: DatabaseService, private router: Router, private route: ActivatedRoute) { 
    this.route.params.subscribe(params => {
      this.theEvent = params
    })
  }
  
  onGetEvents() {
    return this.dbService.getEvents().subscribe((data: any) => {
      this.eventsDB = data;
    });
  }

  onGetEvent(item: any) {
    this.dbService.getEvent(item._id).subscribe(result => {
      this.theEvent = item
    });
  }


  // This callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.theEvent = params
    })
  }
}
