import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  id: string = "";
  name: string = "";
  description: string = ""; 
  image: string = "";
  createdAt: Date | null = null

  constructor(private dbService: DatabaseService, private router: Router) {}

  saveCategory() {
    // create a Category object 
    let categoryObj = {
      id: this.id,
      name: this.name,
      description: this.description,
      // if the image path is not given, use default image
      image: this.image.trim() === '' ? '/default_category.png' : this.image,
      createdAt: this.createdAt
    }
    this.dbService.addCategory(categoryObj).subscribe({
      next: (result) => {this.router.navigate(['/event-category/32905165/list-categories'])},
      // redirect to "invalid data" compoent if server responds with status 400
      error: (error) => {this.router.navigate(['/invalid-data'])} 
    })
  }
}

