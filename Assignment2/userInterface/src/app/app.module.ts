import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoadComponent } from './load/load.component';
import { LoadService } from './load/load.service';
import { HttpModule } from '@angular/http';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { InterruptComponent } from './interrupt/interrupt.component';
import { InterruptService } from './interrupt/interrupt.service';
import { TimeComponent } from './time/time.component';
import { TimeService } from './time/time.service';

//import { ChartmakerComponent } from './chartmaker/chartmaker.component';


declare var require: any;

export function highchartsFactory() {
  const hc = require('highcharts');
//  const dd = require('highcharts');
//  dd(hc);
  return hc;
}

@NgModule({
  declarations: [
    AppComponent,
    LoadComponent,
    InterruptComponent,
    TimeComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ChartModule
  ],
  providers: [
     LoadService,
     InterruptService,
     TimeService,
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }
	
],
  bootstrap: [AppComponent]
})
export class AppModule { }
