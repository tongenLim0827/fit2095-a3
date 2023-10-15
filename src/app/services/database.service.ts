import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json"}),
}
const URL_BACKEND = "/api/v1/category/32905165"

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

  getCategory(){
    let url = URL_BACKEND + "/list-categories";
    return this.http.get(url);
  }

  addCategory(aCategory: any){
    let url = URL_BACKEND + "/createCategory";
    return this.http.post(url, aCategory, httpOptions);
  }

  updateCategory(aCategory: any) {
    let url = URL_BACKEND + "/update-category";
    return this.http.put(url, aCategory, httpOptions);
  }

  // updateCategory(id: string, name: string, description:string) {
  //   let url = URL_BACKEND + "/update-category";
  //   const body = { id: id, name: name, description: description };
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     }),
  //     body: JSON.stringify(body) // Send the id to the request body
  //   };
  //   return this.http.put(url, httpOptions);
  // }

  deleteCategory(id: string) {
    let url = URL_BACKEND + "/delete-category-by-id";
    const body = { id: id };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(body) // Send the id to the request body
    };
    return this.http.delete(url, httpOptions);
  }

  getCategoryDetails(id: string){
    let url = `/event-category/32905165/show-category/${id}`;
    return this.http.get(url);
  }

  getOperationCount(){
    let url = '/event-category/32905165/stats';
    return this.http.get(url); 
  }
}
