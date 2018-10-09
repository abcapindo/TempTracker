import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { FullChartService } from './full-chart.service';
import { Temp } from '../shared/temp';

@Component({
  selector: 'app-full-chart',
  templateUrl: './full-chart.component.html',
  styleUrls: ['./full-chart.component.css']
})

export class FullChartComponent implements OnInit, OnChanges {

  @Input() updatedTemp: number;

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

  constructor(private fullChartService: FullChartService) { }

  ngOnInit() {
    this.fullChartService.getFullBurn()
      .subscribe((temps: Temp) => {
        // TODO This will need to be changed for proper arrays.
        this.lineChartData[0].data.push(temps.c);
        this.lineChartLabels.push('');
        const newData: Array<number> = this.lineChartData[0].data;
        this.lineChartData = [{data: newData, label : 'Temperature'}];
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    const temp: SimpleChange = changes.updatedTemp;
    const updatedTemp: Temp = temp.currentValue;

    this.lineChartData[0].data.push(updatedTemp.c);
    this.lineChartLabels.push('');
    const newData: Array<number> = this.lineChartData[0].data;
    this.lineChartData = [{data: newData, label : 'Temperature'}];
  }

}
