import { Component, Input, OnInit } from '@angular/core';
 
@Component({
  selector: 'app-amount-time-table',
  templateUrl: './amount-time-table.component.html',
  styleUrls: ['./amount-time-table.component.scss']
})
export class AmountTimeTableComponent implements OnInit {

  @Input("tracking") tracking: Array<any>;

  displayedColumns: string[] = ['position', 'start', 'end', 'period'];

  constructor() {
   }

  ngOnInit(): void {
  }
}



