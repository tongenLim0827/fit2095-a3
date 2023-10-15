import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from './services/database.service';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { InvalidDataComponent } from './components/invalid-data/invalid-data.component';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AddCategoryComponent } from './components/add-category/add-category.component';
import { ListCategoryComponent } from './components/list-category/list-category.component';
import { DeleteCategoryComponent } from './components/delete-category/delete-category.component';
import { UpdateCategoryComponent } from './components/update-category/update-category.component';
import { DisplayCategoryComponent } from './components/display-category/display-category.component';

import { UpperCasePipe } from './pipes/upper-case.pipe';
import { TextToSpeechComponent } from './components/text-to-speech/text-to-speech.component';
import { StatisticsG1Component } from './components/statistics-g1/statistics-g1.component';

import { AddEventComponent } from './components/add-event/add-event.component';
import { ListEventComponent } from './components/list-event/list-event.component';
import { DisplayEventComponent } from './components/display-event/display-event.component';
import { UpdateEventComponent } from './components/update-event/update-event.component';
import { DeleteEventComponent } from './components/delete-event/delete-event.component';

import { TranslationServiceComponent } from './components/translation-service/translation-service.component';
import { FormatTimePipe } from './pipes/format-time.pipe';
import { OperationsComponent } from './components/operations/operations.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: ListCategoryComponent},
  { path: 'event-category/32905165/add-category', component: AddCategoryComponent},
  { path: 'event-category/32905165/list-categories', component: ListCategoryComponent},
  { path: 'event-category/32905165/delete-category-byId', component: DeleteCategoryComponent},
  { path: 'event-category/32905165/show-category/:id', component: DisplayCategoryComponent},
  { path: 'event-category/32905165/update-category', component: UpdateCategoryComponent},
  { path: 'event-category/32905165/text-to-speech', component: TextToSpeechComponent},
  { path: 'event-category/32905165/stats', component: StatisticsG1Component},
  { path: 'event-category/andy/add-event', component: AddEventComponent},
  { path: 'event-category/andy/list-events', component: ListEventComponent},
  { path: 'event-category/andy/display-event', component: DisplayEventComponent},
  { path: 'event-category/andy/update-event', component: UpdateEventComponent},
  { path: 'event-category/andy/delete-events-byId', component: DeleteEventComponent},
  { path: 'event-category/andy/translation-service', component: TranslationServiceComponent},
  { path: 'event-category/andy/operations', component: OperationsComponent},
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
    StatisticsG1Component,
    AddEventComponent,
    ListEventComponent,
    DisplayEventComponent,
    UpdateEventComponent,
    DeleteEventComponent,
    TranslationServiceComponent,
    FormatTimePipe,
    OperationsComponent
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
