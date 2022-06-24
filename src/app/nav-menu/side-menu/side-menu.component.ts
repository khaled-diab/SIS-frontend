import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatExpansionPanel} from '@angular/material/expansion';
import {StudentModel} from '../../shared/model/student-management/student-model';
import {FacultyMemberModel} from '../../shared/model/facultyMember-management/facultyMember-model';
import {Constants} from '../../shared/constants';
import {AdminModel} from '../../shared/model/security/admin-model';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit, AfterViewInit {


  @ViewChild('systemExpansion') systemExpansion: MatExpansionPanel;
  @ViewChild('userExpansion') userExpansion: MatExpansionPanel;
  @ViewChild('academicDataExpansion') academicDataExpansion: MatExpansionPanel;
  @ViewChild('attendanceReportExpansion') attendanceReportExpansion: MatExpansionPanel;


  expansionList: MatExpansionPanel[] = [];
  loggedInUser: StudentModel | FacultyMemberModel | AdminModel;

  constructor() {

  }

  ngOnInit(): void {
    // @ts-ignore
    this.loggedInUser = JSON.parse(localStorage.getItem(Constants.loggedInUser));
  }

  ngAfterViewInit(): void {
    this.expansionList.push(
      this.systemExpansion,
      this.userExpansion,
      this.academicDataExpansion,
      this.attendanceReportExpansion
    );
  }

  closeOtherExpansions(expansion: MatExpansionPanel): void {
    this.expansionList
      .filter(value => value !== undefined)
      .filter(value => value !== expansion)
      .forEach(value => value.close());
  }

}
