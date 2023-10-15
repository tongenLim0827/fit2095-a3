import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent {
  categories: any[] = []
  category: any = {
    id: "",
    name: "",
    description: "",
    image: "",
    createdAt: new Date()
  }
  records: any[] = []
  events: any[] = [];
  formmatedDateString: string = "";
  createdAt =  new Date();

  constructor(private dbService: DatabaseService) {
    this.formmatedDateString = this.category.createdAt.toLocaleString();
    this.getCategories();
  }

  getCategories() {
    this.dbService.getCategory().subscribe({
      next: (data:any) => {
        this.categories = data;
      },
      error: (error) => console.log(error)
    })
  }

}
