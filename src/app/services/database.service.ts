import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json"}),
}
const CATEGORY_URL_BACKEND = "/api/v1/category/32905165"
const EVENT_URL_BACKEND = "/andy/api/v1/event"

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }

  // handle category operations
  getCategory(){
    let url = CATEGORY_URL_BACKEND + "/list-categories";
    return this.http.get(url);
  }

  addCategory(aCategory: any){
    let url = CATEGORY_URL_BACKEND + "/createCategory";
    return this.http.post(url, aCategory, httpOptions);
  }

  updateCategory(aCategory: any) {
    let url = CATEGORY_URL_BACKEND + "/update-category";
    return this.http.put(url, aCategory, httpOptions);
  }

  deleteCategory(id: string) {
    let url = CATEGORY_URL_BACKEND + "/delete-category-by-id";
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

  // handle event operations
  // getEvents() {
  //   let url = EVENT_URL_BACKEND + "/list-events";
  //   return this.http.get(url);
  // }

  // createEvent(data: object) {
  //   let url = EVENT_URL_BACKEND + "/create-event";
  //   return this.http.post(url, data, httpOptions);
  // }

  // deleteEvent(id: string) {
  //   let url = EVENT_URL_BACKEND + "/delete-events";
  //   const body = { id: id };
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     }),
  //     body: JSON.stringify(body) // Send the id to the request body
  //   };
  //   return this.http.delete(url, httpOptions);
  // }

  // getEvent(id: string){
  //   let url = "/event/" + id;
  //   return this.http.get(url, httpOptions)
  // }

  // updateEvent(data: object){
  //   let url = EVENT_URL_BACKEND + "/update-events";
  //   return this.http.put(url, data, httpOptions)
  // }

  // getOperations(){
  //   let url = '/event-category/32905165/operation';
  //   return this.http.get(url);
  // }
  getEvents() {
    return this.http.get("/event/");
  }
  
  createEvent(data: object) {
    return this.http.post("/event", data, httpOptions);
  }

  deleteEvent(id: string) {
    let url = "/event/" + id;
    return this.http.delete(url, httpOptions);
  }

  getEvent(id: string){
    let url = "/event/" + id;
    return this.http.get(url, httpOptions)
  }

  updateEvent(data: object){
    return this.http.put("/event", data, httpOptions)
  }

  getOperations(){
    return this.http.get("/operations");
  }
}
