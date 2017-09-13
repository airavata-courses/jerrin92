import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';


@Injectable()
export class TimeService {

  constructor(private http: Http) { }

  data;

  getTime() {
  	//return this.http.get('http://127.0.0.1:5000')
	this.http.get('http://localhost:5000/load').subscribe(
		(response: Response) => {this.data = response.text();},
		(error) => console.log(error));
	return this.data;
  }
}
