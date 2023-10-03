import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService implements HttpInterceptor {

  private suggestionUrl = '';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest = req.clone({
      headers: req.headers.set('Content-Type', 'application/json')

    });

    return next.handle(clonedRequest);
  }

  constructor(private _http: HttpClient) { }

  startConversations(): Observable<any> {
    var url = "/ncert/start"
    return this._http.get(url, {responseType: 'text'});
  }

  sendUserQuery(msg: any, session : any, selectedModel: any, source: any[]): Observable<any> {
    const headers = new HttpHeaders()
      .append('content-type', 'application/json');
    var query = msg + "? ->\n1.";
    const requestOptions = { headers: headers };
    const url = '/ncf-chat/answer?model=gpt-'+encodeURI(selectedModel)+'&session_id='+session+'&q='+encodeURI(msg) + '&sources='+source.join(';');
    return this._http
      .get(url, {observe: 'events',reportProgress: true, responseType: 'text'});
  }
  

  getSuggestions (session: any, selectedModel: any, source: any[]) {
    const url = this.suggestionUrl + '/ncf-chat/suggest' + '?model=gpt-'+encodeURI(selectedModel)+'&session_id='+session + '&sources='+source.join(';');
    return this._http.get(url);
  }


}
