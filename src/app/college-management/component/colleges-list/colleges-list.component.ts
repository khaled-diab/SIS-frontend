import {Component, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {CollegeManagementService} from '../../service/college-management.service';
import {CollegePage} from '../../model/college-page';

@Component({
  selector: 'app-colleges-list',
  templateUrl: './colleges-list.component.html',
  styleUrls: ['./colleges-list.component.css']
})
export class CollegesListComponent implements OnInit {
  tableData: CollegePage;
  displayedColumns = ['ID', 'EnglishName', 'ArabicName', 'Status', 'Code', 'Actions'];

  constructor(private collegeManagementService: CollegeManagementService) {
  }

  ngOnInit(): void {
    this.collegeManagementService.getCollegePage(0, 5).subscribe(value => {
      console.log(value);
      this.tableData = value;
    });
  }


  pageChangeEvent(event: PageEvent): void {
    console.log('page event', event);
    this.collegeManagementService.getCollegePage(event.pageIndex, event.pageSize).subscribe(value => {
      this.tableData = value;
    });
  }


  iconClicked(row: any): void {
    console.log(row);
  }

}
