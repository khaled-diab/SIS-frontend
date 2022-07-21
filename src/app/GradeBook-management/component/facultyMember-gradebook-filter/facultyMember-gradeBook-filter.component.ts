import {Component, OnInit, ViewChild} from '@angular/core';
import {Constants} from '../../../shared/constants';
import {FacultyMemberModel} from '../../../shared/model/facultyMember-management/facultyMember-model';
// @ts-ignore
import {GradeBookManagementService} from '../../service/gradeBook-management.service';
import {GradeBookRequestModel} from '../../../shared/model/gradebook-management/gradeBook-request-model';
import {MatSelect} from '@angular/material/select';
import {AcademicTermModel} from '../../../shared/model/academicTerm-management/academic-term-model';
import {AcademicTermService} from '../../../academic-term-management/service/academic-term.service';
import {SectionModel} from '../../../shared/model/section-model';

@Component({
   selector: 'app-facultyMember-gradeBook-filter',
   templateUrl: './facultyMember-gradeBook-filter.component.html',
   styleUrls: ['./facultyMember-gradeBook-filter.component.css']
})
export class FacultyMemberGradeBookFilterComponent implements OnInit {

   @ViewChild('academicTermSelect', {static: true}) academicTermSelect: MatSelect;
   @ViewChild('sectionSelect', {static: true}) sectionSelect: MatSelect;

   facultyMember = new FacultyMemberModel();
   gradeBookRequestModel: GradeBookRequestModel = new GradeBookRequestModel();
   academicTerms: AcademicTermModel[];
   sections: SectionModel[];

   constructor(private gradeBookManagementService: GradeBookManagementService) {
   }

   ngOnInit(): void {
      // @ts-ignore
      this.facultyMember = JSON.parse(localStorage.getItem(Constants.loggedInUser));
      this.academicTerms = AcademicTermService.academicTermsList;
      this.academicTermSelect.value = AcademicTermService.currentTerm.id;
      this.gradeBookManagementService.getSectionsByFacultyMemberId(this.academicTermSelect.value, this.facultyMember.id).subscribe(sections => {
         this.sections = sections;
      });
   }

   ngAfterViewInit(): void {
      this.academicTermSelect.valueChange.subscribe(value => {
         this.gradeBookManagementService.getSectionsByFacultyMemberId(this.academicTermSelect.value, this.facultyMember.id).subscribe(sections => {
            this.sections = sections;
         });
      });
      this.sectionSelect.valueChange.subscribe(value => {
         this.gradeBookManagementService.gradeBookFilterCourseIdEvent.next([this.academicTermSelect.value, value]);
         this.gradeBookRequestModel.filterAcademicTerm = this.academicTermSelect.value;
         this.gradeBookRequestModel.filterSection = value.id;
         this.gradeBookManagementService.gradeBookFilterEvent.next(this.gradeBookRequestModel);
      });
   }

   applyFilter(): void {
      this.gradeBookManagementService.gradeBookFilterEvent.next(this.gradeBookRequestModel);
   }
}
