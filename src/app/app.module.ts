import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { XivapiClientModule, XivapiService } from '@xivapi/angular-client';
import { FormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { NgChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FcViewerComponent } from './fc-viewer/fc-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    FcViewerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    XivapiClientModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatProgressBarModule,
    NgChartsModule
  ],
  providers: [XivapiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
