import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges, SimpleChange} from '@angular/core';
import { FireMinuteChartService } from './fire-minute-chart.service';
import { Temp } from '../shared/temp';
import { Temps } from '../shared/temps';

@Component({
  selector: 'app-five-minute-chart',
  templateUrl: './five-minute-chart.component.html',
  styleUrls: ['./five-minute-chart.component.css']
})
export class FiveMinuteChartComponent implements OnInit, OnDestroy, OnChanges {

  @Input() updatedTemp: number;

  private settingCelcius = false;

  private lineChartData = [{data: [], label: 'Temperature'}];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true
  };

  public lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartLegend = true;
  public lineChartType = 'line';

  constructor(private fiveMinuteService: FireMinuteChartService) { }

  ngOnInit() {
    // Pull Last five minutes
    this.fiveMinuteService.getTemp5Min()
      .subscribe((temps: Temps) => {
          console.log(this.settingCelcius);
          if (this.settingCelcius) {
            this.lineChartData[0].data.push(temps.c);
          } else {
            console.log("5");
            this.lineChartData[0].data.push(temps.f);
          }

          for (let i = 0; i < temps.c.length; i++) {
            this.lineChartLabels.push('');
          }
          const newData: Array<number> = this.lineChartData[0].data;
          this.lineChartData = [{data: newData, label : 'Temperature'}];
    });
  }

  ngOnDestroy() {
    // Unsubsribe from api
  }

  ngOnChanges(changes: SimpleChanges) {
    // const temp: SimpleChange = changes.updatedTemp;
    // const updatedTemp: Temp = temp.currentValue;

    // this.lineChartData[0].data.push(updatedTemp.c);
    // this.lineChartLabels.push('');
    // if (this.lineChartData[0].data.length > (1500000 / 5000)) {
    //   this.lineChartData[0].data.shift();
    //   this.lineChartLabels.shift();
    // }
    // const newData: Array<number> = this.lineChartData[0].data;
    // this.lineChartData = [{data: newData, label : 'Temperature'}];
  }
}


