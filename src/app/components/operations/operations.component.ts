import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent {
  operations: any = {}; 

  constructor(private dbService: DatabaseService) {}

  ngOnInit(): void {

    this.dbService.getOperations().subscribe((data: any) => {
      this.operations = data; 
    });
  }
}
