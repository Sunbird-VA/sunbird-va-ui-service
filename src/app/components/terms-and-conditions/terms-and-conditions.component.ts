import { Component,  Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss'],
})
export class TermsAndConditionsComponent implements OnInit {
  // #ebe8e840
  //
  // max-height: calc(100vh - 250px);
  // min-height: calc(100vh - 222px);
  @Input() isModal = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  handleNavigation = () => {
    this.router.navigateByUrl('/')
  }

  getDate () {

    
    return new Date().toLocaleDateString()
  }
}
