import { Component } from '@angular/core';

import { navItems } from './_nav';
import { ScriptService } from 'src/app/services/scripts/script.service';

declare var firebase: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent {

  
  public navItems = navItems;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  public totalHits: any;
  public questionAsked: any;

  constructor(private script: ScriptService) {
    
  }

}
