import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnChanges {
  value = 0;
  @Input() isDataLoaded: any[] = []
  loading = true;
  

  ngOnInit(): void {
    
  }

  constructor() {
    this.loadContent();
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isDataLoaded'].currentValue?.length > 0) {
      this.loading = false;
    }  
  }


  loadContent() {
    this.loading = true;
    interval(300).subscribe(res => {
      this.value = this.value + 10;
      if(this.value === 120) {
        this.value = 0;
      }
    });
  }

}
