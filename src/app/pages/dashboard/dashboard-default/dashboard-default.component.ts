import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import '../../../../assets/charts/amchart/amcharts.js';
import '../../../../assets/charts/amchart/gauge.js';
import '../../../../assets/charts/amchart/pie.js';
import '../../../../assets/charts/amchart/serial.js';
import '../../../../assets/charts/amchart/light.js';
import '../../../../assets/charts/amchart/ammap.js';
import '../../../../assets/charts/amchart/worldLow.js';

import '../../../../../node_modules/peity/jquery.peity.min.js';

import { Event,Reward,Progress} from '../../../models';
import { EventService,UserService, AuthenticationService,RewardService} from '../../../services';

declare const AmCharts: any;
declare const $: any;

@Component({
  selector: 'app-dashboard-default',
  templateUrl: './dashboard-default.component.html',
  styleUrls: [
    './dashboard-default.component.css',
    '../../../../assets/icon/svg-animated/svg-weather.css',
    '../../../../assets/charts/radial/radial.css',
    '../../../../assets/icon/svg-animated/svg-weather.css'
  ]
})
export class DashboardDefaultComponent implements OnInit {

  events: Event[] = [];
  isAdmin:string;
  attendedEvents:Event[] = [];
  progresses: Progress[] = [];

  constructor(
    private userService: UserService,
    private eventService:EventService,
    private rewardService:RewardService,
  ) {

  }

  private loadAttendedEvents() {
    this.eventService.getAttendedEvents().subscribe(events => {
        this.events = events;
    });
  }

  private loadAllProgresses() {
    this.userService.getProgresses().subscribe(progresses => {
        this.progresses = progresses;
        console.log(progresses)
    });
  }

  private getAllAttendedEvents() {
    this.eventService.getAttendedEvents().subscribe(events => {
      this.attendedEvents = events;
  });
  }


  ngOnInit() {
    this.isAdmin = localStorage.getItem("isAdmin");
    if (this.isAdmin) {
      this.loadAttendedEvents();
      this.getAllAttendedEvents();
      this.loadAllProgresses();
    }

  }


}
