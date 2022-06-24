import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {StudentModel} from '../shared/model/student-management/student-model';
import {FacultyMemberModel} from '../shared/model/facultyMember-management/facultyMember-model';
import {UserModel} from '../shared/model/security/user-model';
import {Constants} from '../shared/constants';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  loggedInUser: StudentModel | FacultyMemberModel | UserModel;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.loggedInUser = JSON.parse(localStorage.getItem(Constants.loggedInUser));
  }

}
