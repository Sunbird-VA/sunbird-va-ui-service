import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { error } from '@angular/compiler/src/util';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { timeout } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
declare var Telemetry: any;

@Component({
  selector: 'app-default-shared-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.scss'],
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
  public isHomePage = false;

  constructor(private classToggler: ClassToggleService,private authService:AuthService, private router: Router) {
    super();
  }
  logout(){
    try{
      this.end();
    }
    catch(error){}
    this.authService.logout();
    //this.end();
  }
  
  end(){
    var endData = {
      contentId: "abc",
      type: "ECML",
      duration: "2:34",
      pageId: "",
    };
    Telemetry.end(endData);
    setTimeout(() => {
      this.authService.logout()
    }, 1000);
   }

   ngOnInit(): void {
     console.log("app-default-shared-header", );

     const routerUrl = this.router.routerState.snapshot.url;
     if (routerUrl.includes('home')) {
        this.isHomePage = true;
        console.log("this.router.routerState.snapshot.url", this.isHomePage);
        
     }
      // this.router
   }

   goToBot() {
      this.router.navigateByUrl('/bot')
   }

}
