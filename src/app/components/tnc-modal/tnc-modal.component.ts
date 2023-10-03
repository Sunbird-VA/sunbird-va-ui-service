import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tnc-modal',
  templateUrl: './tnc-modal.component.html',
  styleUrls: ['./tnc-modal.component.scss']
})
export class TncModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getDate () {
    return new Date().toLocaleDateString()
  }
}
