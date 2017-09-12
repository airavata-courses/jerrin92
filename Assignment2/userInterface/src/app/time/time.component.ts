import { Component, OnInit } from '@angular/core';
import { TimeService } from './time.service';
import polling from 'rx-polling';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {


  time;

  constructor(private service: TimeService) {}

  ngOnInit() {
  }

  onButtonClick() {
	  this.time = this.service.getTime();
    //console.log(this.time);
 }
}
