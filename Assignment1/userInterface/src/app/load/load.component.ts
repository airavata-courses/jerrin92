import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Chart, ChartObject } from 'highcharts';
import { LoadService} from './load.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import polling from 'rx-polling';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.css']
})
export class LoadComponent implements OnInit {

data;


load_chart: Object;
charts: Map<string, ChartObject> = new Map<string, ChartObject>();

constructor(service: LoadService) {
        polling(service.getData(),{interval:10000})
        .subscribe(
                (response: Response) => {
                        this.data = response.json();
			//console.log(this.data);
                        //console.log(this.data.result[0]);
                        //get clusters data and convert to chart  mayhave to this.data.results later              
                        this.load_chart = this.loadchart(this.data);
                        },
                (error) => console.log(error)
                );
  }

loadchart(responseData: any){      
  //console.log(responseData.result[0].value);
  //console.log(responseData.result.length); 
  var loads = new Array();
  for(let i=0;i<responseData.result.length;i++){ loads.push(Number(responseData.result[i].value));} 
  console.log(loads);


   return {
      chart: {
        type: 'column'
      },
      title: '',
          xAxis: {
      categories: []
    },
      yAxis: [{
        min: 0,
      }, {
        title: {
          text: 'Load'
        },
        opposite: true
      }],
          legend: {
      shadow: false
    },
      tooltip: {
        shared: true
      },
      plotOptions: {
        column: {
          grouping: false,
              shadow: false,
              borderWidth: 0
        }
      },
      series: [{
        name: 'Loads',
        color: 'rgba(190,35,7,.9)',
        data: loads,
        tooltip: {
                //valuePrefix: '$',
                //valueSuffix: ' M'
        },
        pointPadding: 0.4,
        yAxis: 1
      }]
    };	
}

  saveInstance(chartInstance, id) {
        this.charts[id] = chartInstance;
    }
 
 ngOnInit() {
  }

}
