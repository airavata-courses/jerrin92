import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ChartModule } from 'angular2-highcharts';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';


@Injectable()
export class InterruptService {

  constructor(private http: Http) { }

  getData(){
 
                return this.http.get('http://localhost:5000/interrupt');
                //return this.http.get('http://localhost:3001');
        }

}
