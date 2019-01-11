import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from './search.pipe';

import { HighlightPipe } from './highlight.pipe';



@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    SearchPipe,
    HighlightPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DataViewModule,
   
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
