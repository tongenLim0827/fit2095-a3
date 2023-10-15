import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';


@Component({
  selector: 'app-display-category',
  templateUrl: './display-category.component.html',
  styleUrls: ['./display-category.component.css']
})

export class DisplayCategoryComponent {
  categories: any[] = [];
  id: string = "";
  category: any = {
    id: "",
    name: "",
    description: "",
    image: "",
    createdAt: new Date()
  };
  events: any[] = [];
  formmatedDateString: string = "";
  createdAt =  new Date();

  constructor(private dbService: DatabaseService, private route: ActivatedRoute, private router: Router) {
    this.formmatedDateString = this.category.createdAt.toLocaleString();
    this.getCategoryDetails();
  }

  getCategoryDetails() {
    this.route.params.subscribe((params) => {
      const id = params['id']; // to access the 'id' route parameter
      this.dbService.getCategoryDetails(id).subscribe({
        next: (result: any) => {
              this.category = result.records;
              this.events = result.events;},
        error: (error) => {this.router.navigate(['/invalid-data'])}
    })
  })
  }
}

