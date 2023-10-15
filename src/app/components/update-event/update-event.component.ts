import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent {
  eventsDB: any[] = [];
  theEvent: any = null;
  name: string = "";
  capacity: number | null = null;

  constructor(private dbService: DatabaseService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.theEvent = params['id']
    })
  }

  onGetEvent(item: any) {
    this.dbService.getEvent(item._id).subscribe(result => {
      this.router.navigate(["event-category/andy/display-event",item]);
    });
  }

  onUpdateEvent(item: any) {
    item.name2 = this.name;
    item.capacity2 = this.capacity;
    this.dbService.updateEvent(item).subscribe(result => {
      this.router.navigate(["event-category/andy/list-events"]);
    });
  }

  
  ngOnInit(): void {
    console.log("Hi From ListEvents ngIOnit");

    this.dbService.getEvents().subscribe((data: any) => {
      this.eventsDB = data;
    });
  }

}
