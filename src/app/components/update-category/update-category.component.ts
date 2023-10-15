import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent {
  categories: any[] = [];
  category: any = {
    id: "",
    name: "",
    description: "",
    image: "",
  }

  constructor(private dbService:  DatabaseService, private router: Router, private zone: NgZone) {
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

  updateCategory() {
    this.dbService.updateCategory(this.category).subscribe({
      // next: (result) => {this.router.navigate(['event-category/32905165/update-category'])},
      next: (result) => { this.zone.run(() => { this.getCategories(); });},
      error: (error) => { this.router.navigate(['/invalid-data'])}
    })
  }
}
