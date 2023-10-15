import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.css']
})
export class DeleteEventComponent {
  eventsDB: any[] = [];

  constructor(private dbService: DatabaseService, private router: Router) { }
  //Get all Actors
  onGetEvents() {
    return this.dbService.getEvents().subscribe((data: any) => {
      this.eventsDB = data;
    });
  }

  //Delete Actor
  onDeleteEvent(item: any) {
    this.dbService.deleteEvent(item._id).subscribe(result => {
      this.onGetEvents();
      this.router.navigate(["event-category/andy/delete-events-byId"]);
    });
  }

  // This callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetEvents();
  }
}
