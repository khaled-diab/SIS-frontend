import {Component, OnInit} from '@angular/core';
import {StudentModel} from '../../../shared/model/student-management/student-model';
import {FacultyMemberModel} from '../../../shared/model/facultyMember-management/facultyMember-model';
import {AdminModel} from '../../../shared/model/security/admin-model';
import {Constants} from '../../../shared/constants';

@Component({
   selector: 'app-parent-dashboard',
   templateUrl: './parent-dashboard.component.html',
   styleUrls: ['./parent-dashboard.component.css']
})
export class ParentDashboardComponent implements OnInit {


   loggedInUser: StudentModel | FacultyMemberModel | AdminModel;
   adminType = Constants.ADMIN_TYPE;
   staffType = Constants.STAFF_TYPE;
   studentType = Constants.STUDENT_TYPE;

   constructor() {
   }

   ngOnInit(): void {
      // @ts-ignore
      this.loggedInUser = JSON.parse(localStorage.getItem(Constants.loggedInUser));
   }

}
