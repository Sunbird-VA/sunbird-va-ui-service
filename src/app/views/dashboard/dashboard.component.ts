import { AfterViewInit, Component, ElementRef, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, merge, Observable, Subject, tap, of, catchError, interval, take, switchMap, concatMap, throwError } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { SpeechRecognizerService } from 'src/app/services/speech-recognizer.service';
import { ActionContext } from 'src/app/services/actions/action-context';
import * as Showdown from 'showdown';

import { defaultLanguage, languages } from 'src/app/model/languages';

import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import { SpeechNotification } from 'src/app/model/speech-notification';
import { SpeechEvent } from 'src/app/model/speech-event';
import { SpeechError } from 'src/app/model/speech-error';
import { AuthService } from 'src/app/auth/service/auth.service';
import { v4 as uuid } from 'uuid';
import {
  bounceAnimation,
  flashAnimation,
  pulseAnimation,
  rubberBandAnimation,
  shakeAnimation,
  swingAnimation,
  tadaAnimation,
  wobbleAnimation,
  jelloAnimation,
  heartBeatAnimation,
  headShakeAnimation,
  bounceInAnimation,
  bounceInDownAnimation,
  bounceInLeftAnimation,
  bounceInRightAnimation,
  bounceInUpAnimation,
  bounceOutAnimation,
  bounceOutDownAnimation,
  bounceOutLeftAnimation,
  bounceOutRightAnimation,
  bounceOutUpAnimation,
  fadeInAnimation,
  fadeInDownAnimation,
  fadeInDownBigAnimation,
  fadeInLeftAnimation,
  fadeInLeftBigAnimation,
  fadeInRightAnimation,
  fadeInRightBigAnimation,
  fadeInUpAnimation,
  fadeInUpBigAnimation,
  fadeOutAnimation,
  fadeOutDownAnimation,
  fadeOutDownBigAnimation,
  fadeOutLeftAnimation,
  fadeOutLeftBigAnimation,
  fadeOutRightAnimation,
  fadeOutRightBigAnimation,
  fadeOutUpAnimation,
  fadeOutUpBigAnimation,
  flipAnimation,
  flipInXAnimation,
  flipInYAnimation,
  flipOutXAnimation,
  flipOutYAnimation,
  lightSpeedInAnimation,
  lightSpeedOutAnimation,
  rotateInAnimation,
  rotateInDownLeftAnimation,
  rotateInDownRightAnimation,
  rotateInUpLeftAnimation,
  rotateInUpRightAnimation,
  rotateOutAnimation,
  rotateOutDownLeftAnimation,
  rotateOutDownRightAnimation,
  rotateOutUpLeftAnimation,
  rotateOutUpRightAnimation,
  slideInDownAnimation,
  slideInLeftAnimation,
  slideInRightAnimation,
  slideInUpAnimation,
  slideOutDownAnimation,
  slideOutLeftAnimation,
  slideOutRightAnimation,
  slideOutUpAnimation,
  zoomInAnimation,
  zoomInDownAnimation,
  zoomInLeftAnimation,
  zoomInRightAnimation,
  zoomInUpAnimation,
  zoomOutAnimation,
  zoomOutDownAnimation,
  zoomOutLeftAnimation,
  zoomOutRightAnimation,
  zoomOutUpAnimation,
  hingeAnimation,
  jackInTheBoxAnimation,
  rollInAnimation,
  rollOutAnimation,
  // other
  collapseAnimation,
  collapseHorizontallyAnimation,
  rotateAnimation,
  bounceInUpOnEnterAnimation,
  hueRotateAnimation
} from 'angular-animations';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import * as RecordRTC from 'recordrtc';
import { ScriptService } from 'src/app/services/scripts/script.service';
import {Languages} from './language.data';
import { TncModalComponent } from 'src/app/components/tnc-modal/tnc-modal.component';
import {ClipboardService} from 'src/app/services/clipboard/clipboard.service';
import {TranslateService} from 'src/app/services/translate/translate.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';


declare var firebase: any;
declare var Telemetry: any;
declare var AuthTokenGenerate: any;
declare var $: any;

// interface IUser {
//   name: string;
//   state: string;
//   registered: string;
//   country: string;
//   usage: number;
//   period: string;
//   payment: string;
//   activity: string;
//   avatar: string;
//   status: string;
//   color: string;
// }


@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  animations: [
    bounceInUpOnEnterAnimation({ anchor: 'enter1' }),
    bounceInUpOnEnterAnimation({ anchor: 'enter2', delay: 100 }),
    bounceInUpOnEnterAnimation({ anchor: 'enter3', delay: 200 }),
    bounceAnimation(),
    flashAnimation(),
    pulseAnimation({ anchor: 'pulse' }),
    rubberBandAnimation(),
    shakeAnimation(),
    swingAnimation(),
    tadaAnimation(),
    wobbleAnimation(),
    jelloAnimation(),
    heartBeatAnimation(),
    headShakeAnimation(),
    bounceInAnimation(),
    bounceInDownAnimation(),
    bounceInLeftAnimation(),
    bounceInRightAnimation(),
    bounceInUpAnimation(),
    bounceOutAnimation(),
    bounceOutDownAnimation(),
    bounceOutLeftAnimation(),
    bounceOutRightAnimation(),
    bounceOutUpAnimation(),
    fadeInAnimation(),
    fadeInDownAnimation(),
    fadeInDownBigAnimation(),
    fadeInLeftAnimation(),
    fadeInLeftBigAnimation(),
    fadeInRightAnimation(),
    fadeInRightBigAnimation(),
    fadeInUpAnimation(),
    fadeInUpBigAnimation(),
    fadeOutAnimation(),
    fadeOutDownAnimation(),
    fadeOutDownBigAnimation(),
    fadeOutLeftAnimation(),
    fadeOutLeftBigAnimation(),
    fadeOutRightAnimation(),
    fadeOutRightBigAnimation(),
    fadeOutUpAnimation(),
    fadeOutUpBigAnimation(),
    flipAnimation(),
    flipInXAnimation(),
    flipInYAnimation(),
    flipOutXAnimation(),
    flipOutYAnimation(),
    lightSpeedInAnimation(),
    lightSpeedOutAnimation(),
    rotateInAnimation(),
    rotateInDownLeftAnimation(),
    rotateInDownRightAnimation(),
    rotateInUpLeftAnimation(),
    rotateInUpRightAnimation(),
    rotateOutAnimation(),
    rotateOutDownLeftAnimation(),
    rotateOutDownRightAnimation(),
    rotateOutUpLeftAnimation(),
    rotateOutUpRightAnimation(),
    slideInDownAnimation(),
    slideInLeftAnimation(),
    slideInRightAnimation(),
    slideInUpAnimation(),
    slideOutDownAnimation(),
    slideOutLeftAnimation(),
    slideOutRightAnimation(),
    slideOutUpAnimation(),
    zoomInAnimation(),
    zoomInDownAnimation(),
    zoomInLeftAnimation(),
    zoomInRightAnimation(),
    zoomInUpAnimation(),
    zoomOutAnimation(),
    zoomOutDownAnimation(),
    zoomOutLeftAnimation(),
    zoomOutRightAnimation(),
    zoomOutUpAnimation(),
    hingeAnimation(),
    jackInTheBoxAnimation(),
    rollInAnimation(),
    rollOutAnimation(),
    // other
    collapseAnimation(),
    collapseHorizontallyAnimation(),
    rotateAnimation(),
    rotateAnimation({ anchor: 'rotate90', degrees: 90 }),
    hueRotateAnimation(),
    hueRotateAnimation({ anchor: 'hueButton', duration: 20000 }),
  ],
})

export class DashboardComponent implements OnInit, AfterViewInit {
  interactionArray: any = [];
  languages: string[] = languages;
  currentLanguage: string = defaultLanguage;
  totalTranscript?: string;

 

  transcript$?: Observable<string>;
  listening$?: Observable<boolean>;
  errorMessage$?: Observable<string>;
  defaultError$ = new Subject<string | undefined>();
  @ViewChild('chatTextArea', { static: false })
  chatTextArea!: ElementRef;
  questionText: string = "";
  answerText: string = "";
  responseId: string = "";
  showInterationDiv: boolean = false;
  suggestQues: string = "";
  checkSuggestedQues: boolean = true;
  angleUp: boolean = true;
  selectQues: boolean = false;
  hideSuggestionBox: boolean = false;
  enableSuggestedQuesBox: boolean = false
  networkQuestions:any=[];
  animationState:boolean=false
  recording: boolean=false;
  started: boolean=false;
  record: any;
  error: string= "";
  whisperUrl: string = "/";

  sessionId?: string;
  userDetailsObj?: any;

  transcriptLanguages = Languages
  selectedLanguage: string= Languages[0].id;
  showLimitationAndCapabilities = true;
  showClipboard: any[] = [];
  changeMsgColor = false;
  isAdmin = false;
  suggestedQuestions: any[] = [];
  disableInputBox = false;
  sources = [{id: 'NCF_SE', key: 'NCF SE', label: 'NCF School Education'}, {id: 'NCF_FS', key: 'NCF FS', label: 'NCF Foundational Solutions'}, {id: 'NEP', key: 'NEP', label: 'NEP (National Educational Policy)'}];
  selectedSources: any[] =  [];
  allSelected = true;
  @ViewChild('selectedOptions') selectedOptions: MatSelect;

  constructor(private http: HttpClient, private script: ScriptService, private authService: AuthService, private chartsData: DashboardChartsData, private chatService: ChatService, private speechRecognizer: SpeechRecognizerService,
    private actionContext: ActionContext, public clipboardService: ClipboardService, public dialog: MatDialog, public snackBar: MatSnackBar, private router: Router, private translateService: TranslateService) {
  }
  hideReactions = ""

  selectedModel = '4';
	onSelected(value:string): void {
		this.selectedModel = value;
	}
  // @ViewChild('welcomeModal', { static: false }) welcomeModal: any

  public mainChart: IChartProps = {};
  public chart: Array<IChartProps> = [];
  public trafficRadioGroup = new FormGroup({
    trafficRadio: new FormControl('Month')
  });

  describeSmartStudy = false;
  animatedAboutSmartStudyState = false;
  startQuestions = true;

  
  ngOnInit(): void {

    this.userDetailsObj = this.authService.getLoggedUser();          
    this.isAdmin = this.authService.isAdmin(); 
    // this.interactionArray.push({ msg: "Hello", status: "receiveMsg", type: "text" }, { msg: "How are you", status: "sendMsg", type: "text" })
    this.initCharts();
    const webSpeechReady = this.speechRecognizer.initialize(this.currentLanguage);
    if (webSpeechReady) {
      this.initRecognition();
    } else {
      this.errorMessage$ = of('Your Browser is not supported. Please try Google Chrome.');
    }
    this.startTelemetry();
    //this.chatService.startConversations().subscribe();
    this.sessionId = Date.now().toString();
    //this.getNetworkQuestion();
    //this.shiftQuestions();
    var data = ""; 
    const acceptedTermsAndConditionsModal = localStorage.getItem('acceptedTermsAndConditions');    
    console.log("dialogRefdialogRef", acceptedTermsAndConditionsModal);
    this.getSuggestedQuestions();
    if (!acceptedTermsAndConditionsModal) {
      //this.openDialog();
    }


  }

  ngAfterViewInit(): void {
    this.toggleAllSelection();
  }

  onInputChange(message: any): void {
    this.changeMsgColor = message ? true : false;
  }

  openDialog(): void {

    const dialogRef = this.dialog.open(TncModalComponent, {data: {isModal: true}});    
    dialogRef.afterClosed().subscribe(
        data => {
          console.log("Dialog output:", data);
          if (data) {
            localStorage.setItem('acceptedTermsAndConditions', 'accepted');
          }
        }
    );  
}

  initiateRecording() {
    if(this.started && this.recording)
    {
      this.stopRecording1();
    }
    this.recording = true;
    let mediaConstraints = {
    video: false,
    audio: true
  }
  
  navigator.mediaDevices.getUserMedia(mediaConstraints).then(this.successCallback.bind(this), this.errorCallback.bind(this));
}

/**
* Will be called automatically.
*/
successCallback(stream: MediaStream) {
  
  //Start Actuall Recording
  var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
  this.record = new StereoAudioRecorder(stream, {
    mimeType: "audio/wav",
    numberOfAudioChannels: 1,
    bitrate: 16000
  }
    );
  this.record.record();
  }
  /**
  * Stop recording.
  */
  stopRecording1() {
  this.recording = false;
  //this.transcriptLoader = true;
  this.record.stop(this.processRecording.bind(this));
  //this.record.stop(this.processRecording.bind(this));
  }

  /**
  * processRecording Do what ever you want with blob
  * @param  {any} blob Blog
  */
  processRecording(blob: Blob) {
    this.started = true;
    const headers = new HttpHeaders({
     // 'Content-Type': 'multipart/form-data'
    });
    //let body = new URLSearchParams();
    let body:FormData = new FormData();
    body.append('session_id', 'sadas');

    if (this.selectedLanguage && this.selectedLanguage !=='en') {
      body.append('lang_code', this.selectedLanguage);
      body.append('model', 'ai4bharat')
    } else {
      body.append('lang_code', 'en');
      body.append('model', 'whisper')
    }
    //const blob = new Blob(chunks, { type: 'audio/webm' });
    //const file = new File(blob, 'audio.wav');
    body.append('audio', blob, 'audio.wav'); 
    this.http.post(`${this.whisperUrl}/ncf-util/transcribe`, body, {
      headers: headers,
      responseType: 'text'
    })
      .pipe((take(1))).subscribe((res: any) => {
        this.started = false;
        this.totalTranscript = res;
        this.changeMsgColor = true;
        var target = {
          "id": "default",
          "ver": "v 0.1",
          "type": "RECORD",
          "parent": {
            "id": "p1",
            "type": "default"
          },
          "record": {
            "question":res
          }
        };
        var itemResponsedata = { qid: "65441", type: "ecml", target: target };
        Telemetry.response(itemResponsedata);
        // var itemResponsedata = { qid: "65441", type: "RECORD", target: target };
        this.startTelemetry();
        Telemetry.response(itemResponsedata);
        // Telemetry.end({});
      }, (error) => {
        this.started = false;
        // this.selectedLanguage = Languages[0].id;
        console.error("failed to get recommend", error);
        throw error;
      });
  }
  /**
  * Process Error.
  */
  errorCallback(_error: any) {
  this.error = 'Can not play audio in your browser';
  }



  shiftQuestions(){
    setInterval(() => {
      this.animate();
      this.networkQuestions.push(this.networkQuestions[0]);
      this.networkQuestions.shift();
    }, 7000);
  }
  animate() {
    this.networkQuestions[0].status=false;
    setTimeout(() => {
      this.networkQuestions[0].status=true;
      this.animationState=false;
    }, 100);
  }
  animDone(_event:any){
    setTimeout(() => {
      this.animationState=true;
    }, 100);
     }
  // animateSlideIn(){
  //   this.networkQuestions.forEach((element:any) => {
  //     element.slideIn=false;
  //     setTimeout(() => {
  //       element.slideIn=true;
  //     }, 1);
  //   });
  // }
  getNetworkQuestion(): void { // add return type void
  }
  startTelemetry() {
    let userDetails: any = "DEFAULT-USER";
    var key = "gyte5565fdbgbngfnhgmnhmjgm,jm,";
    var secret = "gnjhgjugkk";
    var config = {
      pdata: {
        id: "SmartStudyPlatform",
        ver: "v0.1",
        pid: "sense"
      },
      channel: "ncfsaarathi.sunbird.org",
      //uid: '21b80b48-9203-48cd-9de4-90c69b8c365e',
      uid: this.userDetailsObj['preferred_username'],
      did: this.userDetailsObj['email'],
      // sid: this.userDetailsObj['name'],
      authtoken: "",
      host: "/observability-service"
    }

    // var endEvent = {"createdTime":1509712234974,"name":"OE_ASSESS","event":
    // {"ver":"2.1","uid":"9g8h4ndAnonymouscg56ngd","sid":"","did":"","edata":{"eks":{"qid":"hs1_set_1_334","maxscore":4,"params":[]}},
    // "eid":"OE_ASSESS","gdata":{"id":"org.ekstep.quiz.app","ver":"BUILD_NUMBER"},"cdata"
    // :[{"id":"e6bcae9f32fa4423a6d085bcc2bd4513","type":"ContentSession"}],"ets":1509712234974},"_isStarted":true,"startTime":1509712234975}
    let startEdata = {};
    let options = {};
    let token = AuthTokenGenerate.generate(key, secret);
    config.authtoken = token;
    Telemetry.start(config, "content_id", "contetn_ver", startEdata, options);
  }


  initCharts(): void {
    this.mainChart = this.chartsData.mainChart;
  }
  end() {

  }

  response(questionText: any, anserText: any,source: any) {
    var target = {
      "id": "default",
      "ver": "v 0.1",
      "type": "default",
      "parent": {
        "id": "p1",
        "type": "default"
      },
      "questionsDetails": {
        "questionText": questionText, "anserText": anserText ,"responseId":this.responseId,"source": source
      }
    };
    var itemResponsedata = { qid: "65441", type: "CHOOSE", target: target, values: [{ "questionText": questionText, "anserText": anserText }] };
    Telemetry.response(itemResponsedata);
    var endData = {
      contentId: "abc",
      type: "ECML",
      duration: "2:34",
      pageId: "",
    };
    Telemetry.end(endData);
    this.questionText = "";
    this.answerText = "";
  }

  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.chartsData.initMainChart(value);
    this.initCharts();
  }
  send(query: any, source: any) {
    //this.chatTextArea.nativeElement.focus();
    if (!this.disableInputBox) {
      this.stop();
      this.disableInputBox = true;
      this.changeMsgColor = false;
      this.startQuestions = false;
      // this.selectedLanguage = Languages[0].id;  
      this.checkSuggestedQues = false;
      if (this.enableSuggestedQuesBox == true) {
        this.hideSuggestionBox = true;
        this.enableSuggestedQuesBox = false;
      }
      if (query == "" || query == undefined || query == null) {
      } else {
  
        query = query.replaceAll("?", "");
        query = query.substr(0, 1).toUpperCase() + query.substr(1, query.length - 1);
  
        this.interactionArray.push({ msg: query, status: "sendMsg", type: "text", id: uuid() });
        $(".msg_container_base").stop().animate({ scrollTop: $(".msg_container_base")[0].scrollHeight }, 1000);
        this.interactionArray.push({ msg: "Crafting...", status: "receiveMsg", type: "text", id: uuid() });
  
        if (this.interactionArray.length > 0) {
          this.showLimitationAndCapabilities = false;
        }
        //if (!this.handeCommonPhrases(query)){
          this.questionText = query;
          if (this.selectedLanguage !=='en') {
            this.getTranslatedResponse(query);
          } else {
            this.getResponse(query,source);
          }
        //}
       
        //document.getElementById('chatTextArea')?.scrollIntoView();   
        window.scroll({ 
          top: 0, 
          left: 0, 
          behavior: 'smooth' 
   });  
      }
  
    }
  }

  handeCommonPhrases(query: string) {
    let data = [
      { "phrases": "you do", "response": "" },
      { "phrases": "your name", "response": "" },
      { "phrases": "are you", "response": "" }
    ];

    let data2 = [
      { "phrases": "Hi", "response": "Hi" },
      { "phrases": "Hello", "response": "Hello" }
    ];
    let isCommonPhrases = false;
    var BreakException = {};
    try {
      data.forEach(element => {
        if (query.toLocaleLowerCase().trim().includes(element.phrases.toLocaleLowerCase().trim())) {
          this.interactionArray.pop();
          this.interactionArray.push({ msg: element.response, status: "receiveMsg", type: "text", id: uuid() });
          $(".msg_container_base").stop().animate({ scrollTop: $(".msg_container_base")[0].scrollHeight }, 1000);
          isCommonPhrases = true;
          throw BreakException;
        }
      });
      data2.forEach(element => {
        if (query.toLocaleLowerCase().trim().startsWith(element.phrases.toLocaleLowerCase().trim())) {
          this.interactionArray.pop();
          this.interactionArray.push({ msg: element.response, status: "receiveMsg", type: "text", id: uuid() });
          $(".msg_container_base").stop().animate({ scrollTop: $(".msg_container_base")[0].scrollHeight }, 1000);
          isCommonPhrases = true;
          throw BreakException;
        }
      });
    }
    
    catch (e) {
      if (e !== BreakException) throw e;
    }
    if (isCommonPhrases) {
      return true;
    }
    else {
      return false;
    }
  }

  textToSpeech(msg: any) {
    // new SpeechSynthesisUtterance object
    let synth = window.speechSynthesis;
    let utter = new SpeechSynthesisUtterance();
    utter.lang = 'en-US';
    utter.text = msg;
    utter.volume = 2.5;
    utter.rate = 1.0;
    let voices = synth.getVoices();
    utter.voice = voices[0]
    // event after text has been spoken
    utter.onend = function () {
      // alert('Speech has finished');
    }

    // speak
    window.speechSynthesis.speak(utter);
  }

  getTranslatedResponse(msg?: any) {
    const translatedRes = this.translateService.translateToSourceLanguage(this.selectedLanguage, 'en', msg, this.getSelectedSourceList(), this.sessionId).pipe(
     catchError(err => {
        return of (msg)
     }),
      concatMap(translatedQue => {
          return this.chatService.sendUserQuery(translatedQue, this.sessionId, this.selectedModel, this.getSelectedSourceList()).pipe(
            map(answer => answer),
            catchError(err => {
              return of ({message: "I'll get back to you on this shortly"})
            })
          );
      }),
      concatMap((answer) => {        
        const text =  answer?.partialText || answer?.body || answer?.message;        
        if (text && !text.includes('Internal Server Error')) {
          if (answer?.body) {
            var target = {
              "id": "default",
              "ver": "v 0.1",
              "type": "QuestionFeedback",
              "parent": {
                "id": "p1",
                "type": "default"
              },
              "questionsDetails": {
                "questionText": msg, "anserText": answer?.body,
              }
            };
            var itemResponsedata = { qid: "65441", type: "CHOOSE", target: target };
            this.startTelemetry();
            Telemetry.response(itemResponsedata);
            Telemetry.end({});
            const db = firebase.database().ref();
            this.script.setQuestioncounterHits(db);
          }
          return of(text)
        }
        return of('');
      })
    );

    translatedRes.subscribe({
      next: (translatedRes) => {
            let text = translatedRes;
            if (translatedRes) {
              text = text.indexOf('\nQ2:') != -1 ? text.substring(0, text.indexOf('\nQ2:')) : text;
              this.interactionArray.pop();
              this.answerText = text;
              this.interactionArray.push({ msg: text , status: "receiveMsg", type: "text", id: uuid(), responseId: this.responseId });
          } else {
            //this.interactionArray.push({ msg: "Sorry..", status: "receiveMsg", type: "text", id: uuid() });
          }
      },
      complete: () => {
        this.getSuggestedQuestions();
        let ids: any[] = [];
        let textToTranslate: any;
        this.showClipboard= ids;
        this.disableInputBox = false;
        this.interactionArray.map ( (intMsg: any) => intMsg?.status === 'receiveMsg' ? (ids.push(intMsg?.id), textToTranslate=intMsg) : null); 
        this.translateService.translateToSourceLanguage('en', this.selectedLanguage, textToTranslate?.msg, this.getSelectedSourceList(), this.sessionId).subscribe(data => {
          const updatedArray = this.interactionArray.map ( (intMsg: any) => {
            if (intMsg?.status === 'receiveMsg' && intMsg?.id === textToTranslate?.id) {
              intMsg.msg = intMsg.msg + '\n\n' + data;
            }
            return intMsg;
          }); 
          this.interactionArray = updatedArray;
        })
      }
    })
  }


  getResponse(msg?: any,source?:any) {
    let text = "Hello";
   /* this.chatService.sendUserQuery(msg).subscribe(event => {
      console.log(JSON.stringify(event.partialText));
      if(event.partialText)
      {
        msg.
      }
      if (event.type === HttpEventType.DownloadProgress) {
          console.log("download progress");
      }
      if (event.type === HttpEventType.Response) {
          console.log("donwload completed");
      }
}); */
    console.log("ada");

    var target = {
      "id": "default",
      "ver": "v 0.1",
      "type": "CHAT",
      "parent": {
        "id": "p1",
        "type": "default"
      },
      "chat": {
        "question":msg,
      }
    };
    // 

    this.chatService.sendUserQuery(msg, this.sessionId,this.selectedModel, this.getSelectedSourceList()).subscribe(res => {
      //console.log(res)
      if (res.partialText || res.body) {
        if(res.partialText)
        {
          text = res.partialText;
        }
        if(res.body)
        {
          var target = {
            "id": "default",
            "ver": "v 0.1",
            "type": "QuestionFeedback",
            "parent": {
              "id": "p1",
              "type": "default"
            },
            "questionsDetails": {
              "questionText": msg, "anserText": res.body,
            }
          };
          var itemResponsedata = { qid: "65441", type: "CHOOSE", target: target };
          this.startTelemetry();
          Telemetry.response(itemResponsedata);
          text = res.body;
          Telemetry.end({});
          const db = firebase.database().ref();
          this.script.setQuestioncounterHits(db);


        }
       // text = text.replace(/(\r\n|\r\r|\n\n)/g, '<hr><br>');
        //text = text.replace(/(\r\n|\r|\n)/g, '<br>');
        //text = text.replace(/&/g, 'and');
        //this.chatService.getsuggestedQuestion(msg).subscribe(questions => {
          //if (questions.choices.length) {
            //this.suggestQues = questions.choices[0].text;
            //this.suggestQues =  this.suggestQues.replace(/(\r\n|\r|\n)/g, '');
          //}
          // this.suggestQues = text.slice(text.indexOf('\nQ2:'),text.indexOf('?\n'));
          // this.suggestQues= this.suggestQues.replace('\nQ2:', '');

          // this.suggestQues= this.suggestQues+" ?"    
          text = text.indexOf('\nQ2:') != -1 ? text.substring(0, text.indexOf('\nQ2:')) : text;
          //text = text.replace(/(\r\n|\r|\n)/g, '<br><br>');

          this.interactionArray.pop();
          /*if (questions.id) {
          this.responseId = questions.id;
          } */
          this.answerText = text;

          //this.response(this.questionText, this.answerText, source);
         /* if (this.suggestQues !== "") {
            this.interactionArray.push({ msg: text, status: "receiveMsg", type: "text", id: uuid(), suggestQues: this.suggestQues, responseId: this.responseId});
            this.hideSuggestionBox = false;
            this.checkSuggestedQues = true;
          } else {*/
            this.interactionArray.push({ msg: text , status: "receiveMsg", type: "text", id: uuid(), responseId: this.responseId });
          //}
          //$(".msg_container_base").stop().animate({ scrollTop: $(".msg_container_base")[0].scrollHeight }, 1000);


        //})
      } else {
        //this.interactionArray.push({ msg: "Sorry..", status: "receiveMsg", type: "text", id: uuid() });
      }
    }, _err => {
      text = "I'll get back to you on this shortly"
    }, () => {
      this.getSuggestedQuestions();
      let ids: any[] = [];
      this.interactionArray.map ( (intMsg: any) => intMsg?.status === 'receiveMsg' ? ids.push(intMsg?.id) : null);      
      this.showClipboard= ids;
      this.disableInputBox = false;
    })
    
  }


  getSuggestedQuestions () {
    this.chatService.getSuggestions(this.sessionId, this.selectedModel, this.getSelectedSourceList()).subscribe((data: any) => {
        this.suggestedQuestions = data.slice(0) || [];
    }, err => {
      this.suggestedQuestions = [];
      console.log("getSuggestions err",err );    })
  }

  start(): void {
    if (this.speechRecognizer.isListening) {
      this.stop();
      return;
    }

    // this.defaultError$.next(undefined);
    this.speechRecognizer.start();
  }

  stop(): void {
    this.speechRecognizer.stop();
  }

  selectLanguage(_language: string): void {
    // if (this.speechRecognizer.isListening) {
    //   this.stop();
    // }
    // this.currentLanguage = language;
    // this.speechRecognizer.setLanguage(this.currentLanguage);
  }

  private initRecognition(): void {

    // this.transcript$ = this.speechRecognizer.onResult().pipe(
    //   tap((notification) => {
    //     this.processNotification(notification);
    //   }),
    //   map((notification) => notification.content || '')
    // );
    this.speechRecognizer.onResult().subscribe(notification => {
      this.processNotification(notification);
    })

    this.listening$ = merge(
      this.speechRecognizer.onStart(),
      this.speechRecognizer.onEnd()
    ).pipe(map((notification) => notification.event === SpeechEvent.Start));

    // merge(
    //   this.speechRecognizer.onStart(),
    //   this.speechRecognizer.onEnd()
    // ).subscribe(notification=>{
    //   if(notification.event === SpeechEvent.Start){
    //     console.log(notification);

    //   }
    // })
    this.errorMessage$ = merge(
      this.speechRecognizer.onError(),
      this.defaultError$
    ).pipe(
      map((data) => {
        if (data === undefined) {
          return '';
        }
        if (typeof data === 'string') {
          return data;
        }
        let message;
        switch (data.error) {
          case SpeechError.NotAllowed:
            message = `Cannot run the demo.
            Your browser is not authorized to access your microphone.
            Verify that your browser has access to your microphone and try again.`;
            break;
          case SpeechError.NoSpeech:
            message = `No speech has been detected. Please try again.`;
            break;
          case SpeechError.AudioCapture:
            message = `Microphone is not available. Plese verify the connection of your microphone and try again.`;
            break;
          default:
            message = '';
            break;
        }
        return message;
      })
    );
  }

  private processNotification(notification: SpeechNotification<string>): void {
    if (notification.event === SpeechEvent.FinalContent) {
      const message = notification.content?.trim() || '';
      this.actionContext.processMessage(message, this.currentLanguage);
      // this.actionContext.runAction(message, this.currentLanguage);
      this.totalTranscript = this.totalTranscript
        ? `${message}`
        : notification.content;
    }
  }
  @HostListener('window:beforeunload')
  async ngOnDestroy() {

    var inFormOrLink: any;
    $(window).on("beforeunload", function () {
      return inFormOrLink ? "Do you really want to close?" : null;
    })
    var endData = {
      contentId: "abc",
      type: "ECML",
      duration: "2:34",
      pageId: "",
    };
    Telemetry.end(endData);
  }
  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(_event: Event) {
    var endData = {
      contentId: "abc",
      type: "ECML",
      duration: "2:34",
      pageId: "",
    };
    Telemetry.end(endData);
  }
  // getReaction(id: any) {
  //   const element = document.getElementById(id);
  //   if (element?.classList.value == "chatReactionOuterDiv") {
  //     this.hideReaction(id)
  //   } else {
  //     element?.classList.remove('hideReactionBox')
  //     element?.classList.add('chatReactionOuterDiv');
  //   }
  // }
  // hideReaction(id: any) {
  //   const element = document.getElementById(id);
  //   element?.classList.remove('chatReactionOuterDiv')
  //   element?.classList.add('hideReactionBox');
  // }


  callCopyReactionEvent(id: any, react: any, response: any) {    
    if (react === 'copy') {
      this.clipboardService.copyText(response?.msg);
      this.openSnackBar();
    }
  }

  callReactionEvent(id: any, react: any, responseId: any) {

    //this.hideReactions = 'hide-reaction'

    // const element = document.getElementById(id);
    // console.log('element --- ', element)
    // console.log('classs List : ', element?.classList)
    // if (element?.classList.contains("chatReactionOuterDiv")) {
    //   console.log('entered in ')
    //   element?.classList.add("no-hover");
    // } 
    // console.log('classs List : ', element?.classList)
    
    var target = {
      "id": "default",
      "ver": "v 0.1",
      "type": "QuestionFeedback",
      "parent": {
        "id": "p1",
        "type": "default"
      },
      "questionsDetails": {
        "questionText": this.questionText, "anserText": this.answerText,"responseId" : responseId,
        "reaction": react
      }
    };
    var itemResponsedata = { qid: "65441", type: "ecml", target: target, values: [{ questionText: this.questionText, anserText: this.answerText }] };
    this.startTelemetry();
    Telemetry.response(itemResponsedata);
    var endData = {
      contentId: "abc",
      type: "ECML",
      duration: "2:34",
      pageId: "",
    };
    Telemetry.end(endData);
    //this.hideReaction(id);
    const index = this.interactionArray.findIndex((res: any) => res.id == id)
    this.interactionArray[index]['reaction'] = react;
    $(".msg_container_base").stop().animate({ scrollTop: $(".msg_container_base")[0].scrollHeight }, 1000);
    
    // if (element?.classList.contains("no-hover")) {
    //   element?.classList.remove('no-hover');
    // }    

  }
  // removeClass(id:any){
  //   const element = document.getElementById(id);
  //   console.log('removeClass element --- ', element)
  //   console.log('removeClass classs List : ', element?.classList)
  //   if (element?.classList.contains("no-hover")) {
  //     element?.classList.remove("no-hover");
  //   } 
  // }
  // @HostListener("click")
  // clicked() {

  //   // this.hideReaction()
  // }

  openSnackBar() {
    this.snackBar.open('Copied', 'X', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  readMore(status?: any) {
    var dots: any = document.getElementById("dots");
    var moreText: any = document.getElementById("more");
    var btnText: any = document.getElementById("myBtn");
    this.angleUp = status;

    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Show More";
      moreText.style.display = "none";

    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Show Less";
      moreText.style.display = "inline";
    }
  }
  checkSuggestedQuestion(status: boolean) {
    this.checkSuggestedQues = status;
    this.checkSuggestedQues == false ? this.enableSuggestedQuesBox = true : this.enableSuggestedQuesBox = status;
    this.enableSuggestedQuesBox == true ? this.hideSuggestionBox = true : this.hideSuggestionBox = false;
    $(".msg_container_base").stop().animate({ scrollTop: $(".msg_container_base")[0].scrollHeight }, 1000);

  }
  closeSuggestedBox(status: boolean) {
    this.enableSuggestedQuesBox = status;
    this.checkSuggestedQues = true;
    this.hideSuggestionBox = false
  }
  setSuggestedQuesInbox(ques: any) {
    this.totalTranscript = ques;
    this.selectQues = true;
    // const element = document.getElementById("suggestedQues");
    const elem = document.getElementById("btn-input");
    elem?.focus();
    // element?.innerHTML
    // element?.classList.remove("suggestedBoxQuestion");
    // element?.classList.add('suggestedBoxQuestionBackground');
  }
  sendQuestionNetwork(ques: any) {
    this.totalTranscript = ques;
    const elem = document.getElementById("btn-input");
    elem?.focus();
  }

  describeAboutSmartStudy(_isRequired : boolean){
   
    $(".msg_container_base").stop().animate({ scrollTop: $(".msg_container_base")[0].scrollHeight }, 1000);
    this.animateAboutSmartStudy()
  }

  animateAboutSmartStudy() {
    this.animatedAboutSmartStudyState = false;
    setTimeout(() => {
      this.animatedAboutSmartStudyState = true;  
       this.describeSmartStudy = true;   
    }, 1);
  }

  closeDescribeSmartStudy(close : boolean){
    this.describeSmartStudy = !close
  }
 

  // showGuildlines(){
  //   this.open({ width: '100vw', hasBackdrop: true })
  // }

  // open(config?: MatDialogConfig) {
  //   console.log('opening')
  //   return this.dialog.open(this.welcomeModal, config)
  // }

  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }

  sendQuery(msg: any) {
    this.totalTranscript = msg;
    this.changeMsgColor = true;
  }

  logout(){
    try{
      //this.end();
      this.authService.logout();
    }
    catch(error){}
    //this.authService.logout();
    //this.end();
  }

  listResponses () {
    this.router.navigateByUrl('bot/list')
  }

  toggleAllSelection() {    
    if (this.selectedOptions) {
      if (this.allSelected) {
        this.selectedOptions.options.forEach((item: MatOption) => item.select());
      } else {
        this.selectedOptions.options.forEach((item: MatOption) => item.deselect());
      }
    }
  }

   optionClick() {
    let newStatus = true;
    this.selectedOptions.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected = newStatus;
  }
  getSelectedSourceList() {    
    return  this.selectedSources.map((source: any) => source.id)
  }

  getSelectedList () {
    const list = this.selectedSources.map((source: any) => source.key);
    return this.selectedSources?.length === 3 ? ['ALL'].join(', ') :  list.join(', ')
  }

  handleSelection(selected: any) {
    if (selected?.length > 0) {
      this.selectedSources = selected;
    }
  }

}
