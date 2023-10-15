import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from './services/database.service';
import { UpperCasePipe } from './pipes/upper-case.pipe';

import { AppComponent } from './app.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { ListCategoryComponent } from './components/list-category/list-category.component';
import { DeleteCategoryComponent } from './components/delete-category/delete-category.component';
import { UpdateCategoryComponent } from './components/update-category/update-category.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { InvalidDataComponent } from './components/invalid-data/invalid-data.component';
import { DisplayCategoryComponent } from './components/display-category/display-category.component';
import { TextToSpeechComponent } from './components/text-to-speech/text-to-speech.component';
import { StatisticsG1Component } from './components/statistics-g1/statistics-g1.component';
import { ServiceWorkerModule } from '@angular/service-worker';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: ListCategoryComponent},
  { path: 'event-category/32905165/add-category', component: AddCategoryComponent},
  { path: 'event-category/32905165/list-categories', component: ListCategoryComponent},
  { path: 'event-category/32905165/delete-category-byId', component: DeleteCategoryComponent},
  { path: 'event-category/32905165/show-category/:id', component: DisplayCategoryComponent},
  { path: 'event-category/32905165/update-category', component: UpdateCategoryComponent},
  { path: 'event-category/32905165/text-to-speech', component: TextToSpeechComponent},
  { path: 'event-category/32905165/stats', component: StatisticsG1Component},
  { path: 'invalid-data', component: InvalidDataComponent},
  { path: '**', component: PageNotFoundComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    AddCategoryComponent,
    ListCategoryComponent,
    DeleteCategoryComponent,
    UpdateCategoryComponent,
    PageNotFoundComponent,
    InvalidDataComponent,
    DisplayCategoryComponent,
    UpperCasePipe,
    TextToSpeechComponent,
    StatisticsG1Component
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {useHash:true}),
    HttpClientModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
