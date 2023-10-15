import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent {
  categories: any[] = [];
  category: any = {
    id: "",
    name: "",
    description: "",
    image: "",
    createdAt: new Date()
  }
  formmatedDateString: string = "";
  createdAt =  new Date();

  constructor(private dbService:  DatabaseService, private router: Router, private zone: NgZone) {
    this.formmatedDateString = this.category.createdAt.toLocaleString();
    // this.getCategories();

  }

  ngOnInit() {
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

  deleteCategory(id: string) {
    this.dbService.deleteCategory(id).subscribe({
      // next: (result) => {this.router.navigate(['/event-category/32905165/delete-category-byId'])},
      next: (result) => { this.zone.run(() => { this.getCategories(); });},
      error: (error) => { this.router.navigate(['/invalid-data'])}
    })
  }
}
