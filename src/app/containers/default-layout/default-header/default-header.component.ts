import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { timeout } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
declare var Telemetry: any;

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private classToggler: ClassToggleService,private authService:AuthService) {
    super();
  }
  logout(){
    this.end();
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


}
