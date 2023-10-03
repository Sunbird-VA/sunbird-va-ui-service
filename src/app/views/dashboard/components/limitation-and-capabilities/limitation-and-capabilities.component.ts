import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'limitation-and-capabilities',
  templateUrl: './limitation-and-capabilities.component.html',
  styleUrls: ['./limitation-and-capabilities.component.scss']
})
export class LimitationAndCapabilitiesComponent implements OnInit {

  @Output() sendQuery: any = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  sendRequestedQuery (msg: any) {
    this.sendQuery.emit(msg)
  }

}
