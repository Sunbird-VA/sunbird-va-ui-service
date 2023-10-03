import { Component, OnInit } from '@angular/core';
import { DiscussionDetailsService } from 'src/app/services/discussion-details/discussion-details.service';
import { DatePipe } from '@angular/common'


const ELEMENT_DATA: any[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'response-list',
  templateUrl: './response-list.component.html',
  styleUrls: ['./response-list.component.scss']
})
export class ResponseListComponent implements OnInit {

  constructor(private discussionDetailsService: DiscussionDetailsService, public datepipe: DatePipe) { }

  tableData =  []
  loading = true;
  showLoader = true;
  totalPages= 0;
  pageIndex=1;
  pageSize=10;
  ngOnInit(): void {
    this.getDetails();
  }

  getDetails () {
    this.discussionDetailsService.getDiscussions(this.pageIndex, this.pageSize).subscribe((data: any) => {
      this.totalPages = data?.count;
      const result = data?.results || [];
      const updatedData = result.map((item: {id: string, answer_text: string, created_at: string, question_text: string, sid: string, uid: string, user_id: string}, index: number) => {
        const obj: any = {};
        obj['S.No'] = index + 1;
        obj['question'] = item.question_text;
        obj['response'] = item.answer_text;
        obj['id'] = item.id;
        // obj['user'] = item.sid || '';
        const date = item.created_at ? item.created_at : new Date();
        obj['created On'] = this.datepipe.transform(date, 'dd-MMM-YYYY h:mm:ss a	');
        return obj;
      });
      this.tableData = updatedData;
      this.loading = false;
      this.showLoader = false;
    }, err => {
      this.tableData = [];
      this.showLoader = false;
      console.log("Error while fetching discussion details", err);
      
    });
  }

  handlePageId(event: any) {
    console.log("handlePageIdhandlePageId", event);
    this.pageIndex = event?.pageIndex;
    this.pageSize=event?.pageSize;
    this.getDetails()
  }

}
