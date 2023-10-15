import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.css']
})
export class ListEventComponent {
  eventsDB: any[] = [];
  theEvent: any = null;

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

  
  ngOnInit(): void {
    console.log("Hi From ListEvents ngIOnit");

    this.dbService.getEvents().subscribe((data: any) => {
      this.eventsDB = data;
    });
  }
}
