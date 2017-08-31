import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Chart, ChartObject } from 'highcharts';
import { InterruptService} from './interrupt.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import polling from 'rx-polling';

@Component({
  selector: 'app-interrupt',
  templateUrl: './interrupt.component.html',
  styleUrls: ['./interrupt.component.css']
})
export class InterruptComponent implements OnInit {

data;


interrupt_chart: Object;
charts: Map<string, ChartObject> = new Map<string, ChartObject>();

constructor(service: InterruptService) {
        polling(service.getData(),{interval:10000})
        .subscribe(
                (response: Response) => {
                        this.data = response.json();
			//console.log(this.data);
                        //console.log(this.data.result[0]);
                        //get clusters data and convert to chart  mayhave to this.data.results later              
                        this.interrupt_chart = this.interruptchart(this.data);
                        },
                (error) => console.log(error)
                );
  }

interruptchart(responseData: any){      
  //console.log(responseData.result[0].value);
  //console.log(responseData.result.length); 
  var interrupts = new Array();
  for(let i=0;i<responseData.result.length;i++){ interrupts.push(Number(responseData.result[i].value));} 
  console.log(interrupts);


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
        name: 'Interrupts',
        color: 'rgba(250,25,190,.9)',
        data: interrupts,
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
