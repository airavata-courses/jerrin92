import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ChartModule } from 'angular2-highcharts';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class LoadService {

  constructor(private http: Http) { }

  getData(){
 
		//return this.http.get('http://localhost:3000/result');
		return this.http.get('http://localhost:3000');
	}
}
