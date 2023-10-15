import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-statistics-g1',
  templateUrl: './statistics-g1.component.html',
  styleUrls: ['./statistics-g1.component.css']
})
export class StatisticsG1Component {
  eventCount: number = 0;
  categoryCount: number = 0;
  constructor(private dbService: DatabaseService) {
    this.getOperationCount();
  }

  getOperationCount(){
    this.dbService.getOperationCount().subscribe({
      next: (data:any) => {
        this.eventCount = data.events;
        this.categoryCount = data.categories;
      },
      error: (error) => console.log(error)
    })
  }
}

