import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { navItems } from 'src/app/containers/default-layout/_nav';
import { DiscussionDetailsService } from 'src/app/services/discussion-details/discussion-details.service';
import { ScriptService } from 'src/app/services/scripts/script.service';
import { MatSnackBar } from '@angular/material/snack-bar';

declare var Telemetry: any;
declare var AuthTokenGenerate: any;
declare var firebase: any;
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  
  public navItems = navItems;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };


  public totalHits: any;
  public questionAsked: any;
  public totalQuestions: any;

  subscribedEMail = new FormControl('');

  constructor(private router: Router, private script: ScriptService, private discussionDetails: DiscussionDetailsService, public snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getQuestionsCount();
  }

  getQuestionsCount() {
    this.discussionDetails.getQuestionsCount().subscribe((data: any) => {
        this.totalQuestions = data?.results?.count;
    }, err => {
      console.log("Error while fetching wehHitsCount", err);
      
    });
  }

  handleLogin () {
    this.router.navigateByUrl('bot')
  }

  handleTermsNavigation () {
    this.router.navigate(['tnc']);
  }

  handleSubscription() {
   if (this.subscribedEMail.value) { 
    var key = "gyte5565fdbgbngfnhgmnhmjgm,jm,";
    var secret = "gnjhgjugkk";
    var config = {
      pdata: {
        id: "SmartStudyPlatform",
        ver: "v0.1",
        pid: "sense"
      },
      channel: "ncfsaarathi.sunbird.org",
      uid: 'Anonymous',
      did: '',
      authtoken: "",
      host: "/observability-service"
    }

    let startEdata = {};
    let options = {};
    let token = AuthTokenGenerate.generate(key, secret);
    config.authtoken = token;
    var target = {
      "id": "default",
      "ver": "v 0.1",
      "type": "SUBSCRIBE",
      "user": {
        "email": this.subscribedEMail.value,
      }
    };
    var itemResponsedata = { qid: "65441", type: "SUBSCRIBE", target: target };
    Telemetry.start(config, "content_id", "contetn_ver", startEdata, options);
    Telemetry.response(itemResponsedata);
    Telemetry.end({});    
    this.snackBar.open('Subscribed', 'x', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['snackbar-class']
    });}
  }
}
