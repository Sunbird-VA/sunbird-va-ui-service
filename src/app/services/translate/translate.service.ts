import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';

declare var Telemetry: any;
declare var AuthTokenGenerate: any;
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  translateUrl:string = '/ncf-util' 
  started:boolean = false;
  totalTranscript: any;
  userDetailsObj?: any;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.userDetailsObj = authService.getLoggedUser();
   }


   translateToSourceLanguage(sourceLang: string, targetLang: string, query: any, source: any[], sessionId: any) {
    const headers = new HttpHeaders({
      // 'Content-Type': 'multipart/form-data'
     });

     let body:FormData = new FormData();
      body.append('session_id', 'sadas');
 
     if (sourceLang && sourceLang !=='en') {
      //  body.append('lang_code', sourceLang);
       body.append('model', 'ai4bharat')
     } else {
      //  body.append('lang_code', 'en');
       body.append('model', 'whisper')
     }

     body.append('text', query);
     body.append('source_lang', sourceLang);
     body.append('target_lang', targetLang);
     
     
    return this.http.post(`${this.translateUrl}/translate?session_id=${sessionId}`, body, {
      headers: headers,
      responseType: 'text'
    });
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

}
