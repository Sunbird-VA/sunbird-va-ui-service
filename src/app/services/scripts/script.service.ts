import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Renderer2 } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
// import { DOCUMENT } from '@angular/common';

var ScriptStore = [
  {
    name: 'firebase-app',
    src: 'https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js',
  },
  {
    name: 'firebase-database',
    src: 'https://www.gstatic.com/firebasejs/8.2.1/firebase-database.js',
  },
];

declare var firebase: any;

@Injectable({
  providedIn: 'root',
})
export class ScriptService {
  private scripts: any = {};
  constructor(private http: HttpClient) // private _renderer2: Renderer2, @Inject(DOCUMENT) private _document: Document
  {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src,
      };
    });
  }

  load(...scripts: string[]) {
    var promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      //resolve if already loaded
      if (this.scripts[name].loaded) {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      } else {
        //load script
        let script: any = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        if (script.readyState) {
          //IE
          script.onreadystatechange = () => {
            if (
              script.readyState === 'loaded' ||
              script.readyState === 'complete'
            ) {
              script.onreadystatechange = null;
              this.scripts[name].loaded = true;
              resolve({ script: name, loaded: true, status: 'Loaded' });
            }
          };
        } else {
          //Others
          script.onload = () => {
            this.scripts[name].loaded = true;
            resolve({ script: name, loaded: true, status: 'Loaded' });
          };
        }
        script.onerror = (error: any) =>
          resolve({ script: name, loaded: false, status: 'Loaded' });
        document.getElementsByTagName('head')[0].appendChild(script);
      }
    });
  }

  async setDbHits(db: any) {

    let hits = 0;
    let unquieKey = Date.now();
    let setCall = this.getIpDetails().subscribe(
      (response: any) => {
        console.log(response);
        db.child("unique_page_views/" + response.IPv4.replaceAll(".", "-")).set(response);
        db.child("page_views/" + response.IPv4.replaceAll(".", "-") + "-" + unquieKey).set(response);
      },
      (error: any) => {
        throwError; error;
      })
  }
  async setQuestioncounterHits(db: any) {

    let hits = 0;
    let unquieKey = Date.now();
    let setCall = this.getIpDetails().subscribe(
      (response: any) => {
        console.log(response);
        db.child("questions_asked/" + response.IPv4.replaceAll(".", "-") + "-" + unquieKey).set(response);
      },
      (error: any) => {
        throwError; error;
      })
  }

  getIpDetails(): Observable<any> {
    const url = 'https://geolocation-db.com/json/'; // Replace with your API endpoint
    return this.http.get(url);
  }



 checkUserCookie(db: any, userCookieName: any): void {
  const regEx = new RegExp(userCookieName, "g");
  const cookieExists = document.cookie.match(regEx);
  if (cookieExists != null) {
    // hitCounter.style.display = "block";
  } else {
    this.createUserCookie(userCookieName);
    db.transaction(
      (totalHits: any) => totalHits + 1,
      (error: any) => {
        if (error) {
          console.log(error);
        } else {
          // hitCounter.style.display = "inline-block";
        }
      }
    );
  }
}

 createUserCookie(userCookieName: any) {
  const userCookieValue = "Yes";
  const userCookieDays = 7;
  let expiryDate: any= new Date();
  expiryDate.setDate(expiryDate.getDate() + userCookieDays);
  document.cookie =
    userCookieName +
    "=" +
    userCookieValue +
    "; expires=" +
    expiryDate.toGMTString() +
    "path=/";
}
}

