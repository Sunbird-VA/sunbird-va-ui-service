import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiscussionDetailsService {
  // private discussionUrl='http://localhost:4000/'
  private discussionUrl='/'

  constructor(private http: HttpClient) { }

  getDiscussions (page:number, pageSize:number) {
      const url = this.discussionUrl + `api/v1.0/discussion/list?page=${page}&size=${pageSize}`;
      return this.http.get(url);
  }

  getQuestionsCount() {
    const url = this.discussionUrl + `api/v1.0/discussion/count`;
    return this.http.get(url);
}

}
 