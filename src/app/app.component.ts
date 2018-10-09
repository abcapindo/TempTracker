import { Component, ViewChild, OnInit } from '@angular/core';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { AppService } from './app.component.service';
import { Temp } from './shared/temp';
import { MessagingService } from './shared/messaging.service';
import { MatIconRegistry } from '@angular/material';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService, MatIconRegistry]
})
export class AppComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  constructor(private appService: AppService, private messagingService: MessagingService, public matIconRegistry: MatIconRegistry ) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
  tempD: Temp = {c : 1, f : 0};
  intervalTime = 5000;
  message;
  title = 'smokerTempApp';
  faFire = faFire;
  faEllipsisV = faEllipsisV;
  temp: Temp = {c : 2, f : 2};

  ngOnInit() {
    setInterval(() => {
      this.appService.getTemperature()
        .subscribe((temp: Temp) => {
          this.temp = temp;
        });
    }, this.intervalTime);

    const userId = uuid();
    this.messagingService.requestPermission(userId);
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
  }
}
