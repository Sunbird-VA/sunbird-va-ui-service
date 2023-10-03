import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {FormBuilder, FormControl} from '@angular/forms';

// import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'ncf-table',
  templateUrl: './ncf-table.component.html',
  styleUrls: ['./ncf-table.component.scss'],
})
export class NcfTableComponent implements OnInit, AfterViewInit, OnChanges {
  displayedColumns: string[] = [];
  @Input() dataSource: any[] = [];
  sortedData: any[] = [];
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25, 50];

  pageEvent: PageEvent;
  tableData: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Output() emitPageIndex = new EventEmitter<{pageSize: number, pageIndex:number}>(); 
  @Input() totalPages = 0;
  @Input() pageSize = 5;

  totalPagesCount = 0;

  selectedPage = new FormControl('');


  constructor() {}


  ngOnInit(): void {
    this.selectedPage.setValue(this.pageSizeOptions[1])
  }


  ngAfterViewInit(): void {
    if (this.dataSource?.length > 0) {
      this.sortedData = this.dataSource.slice();
      this.displayedColumns = Object.keys(this.sortedData[0])
      this.tableData = new MatTableDataSource(this.dataSource);
      this.tableData.sort = this.sort;
      this.totalPagesCount = Math.floor(this.totalPages/this.selectedPage.value) + 1;

    }

  }

  applyFilter(event: any) {
    const filterValue = event?.target?.value;
    this.tableData.filter = filterValue.trim().toLowerCase();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSource'].currentValue?.length > 0) {
      this.sortedData = this.dataSource.slice();
      this.totalPagesCount = Math.floor(this.totalPages/this.selectedPage.value) + 1;

      console.log("totalPagesCount", this.totalPagesCount, this.totalPages, this.pageSize);
      
      this.displayedColumns = Object.keys(this.sortedData[0]);
      this.tableData = new MatTableDataSource(this.dataSource);
      this.tableData.sort = this.sort;
    }
  }

  sortData(sort: Sort) {
    const data = this.dataSource.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a: any, b: any) => {
      const isAsc = sort.direction === 'asc';

      if (sort.active) {
        const sortData = compare(a[sort.active], b[sort.active], isAsc);
        return sortData;
      } else {
        return 0;
      }
    });
  }

  handleOnChange() {
    this.emitPageIndex.emit({pageSize: this.selectedPage.value, pageIndex: this.pageIndex});
  }

  getTitle(title: string) {
    return title[0].toUpperCase() + title?.slice(1);
  }

  goToFirstPage() {
    this.pageIndex = 1;
    this.emitPageIndex.emit({pageSize: this.selectedPage.value, pageIndex: this.pageIndex});

  }

  goToPreviousPage() {
    if (this.pageIndex > 1) {
      this.pageIndex = this.pageIndex - 1;
      this.emitPageIndex.emit({pageSize: this.selectedPage.value, pageIndex: this.pageIndex});

    }
  }
  goToNextPage() {
    if (this.pageIndex >= 1 && this.pageIndex < this.totalPagesCount) {
      this.pageIndex = this.pageIndex + 1;
      this.emitPageIndex.emit({pageSize: this.selectedPage.value, pageIndex: this.pageIndex});
    }
  }

  goToLastPage() {
    this.pageIndex = this.totalPagesCount;
    this.emitPageIndex.emit({pageSize: this.selectedPage.value, pageIndex: this.pageIndex});

  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
