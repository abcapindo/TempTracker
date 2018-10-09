import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule, MatButtonModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { Ng2WeatherIconsModule } from 'ng2-weather-icons';
import { MatIconModule } from '@angular/material/icon';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { MessagingService } from './shared/messaging.service';
import { AsyncPipe } from '../../node_modules/@angular/common';
import { FiveMinuteChartComponent } from './five-minute-chart/five-minute-chart.component';
import { FullChartComponent } from './full-chart/full-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    FiveMinuteChartComponent,
    FullChartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatMenuModule,
    MatToolbarModule,
    FontAwesomeModule,
    ChartsModule,
    HttpClientModule,
    Ng2WeatherIconsModule,
    MatIconModule,
    MatButtonModule,
    AngularFireMessagingModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [MessagingService, AsyncPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
