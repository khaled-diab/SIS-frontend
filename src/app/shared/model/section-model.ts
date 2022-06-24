

import {AcademicYear} from './academicYear-Management/academic-year';
import {DepartmentModel} from './department-management/department-model';
import {CollegeModel} from './college-management/college-model';
import {MajorModel} from './major-model';
import {StudyTypeModel} from './studyType-model';
import {BaseModel} from './base-model';
import {CourseModel} from './course-management/course-model';
import {AcademicTermModel} from './academicTerm-management/academic-term-model';

export class SectionModel extends BaseModel {

  sectionNumber: string;
  theoreticalLectures: number;
  practicalLectures: number;
  exercisesLectures: number;
  majorDTO: MajorModel;
  studyTypeDTO: StudyTypeModel ;
  collegeDTO: CollegeModel;
  departmentDTO: DepartmentModel;
  academicYearDTO: AcademicYear;
  academicTermDTO: AcademicTermModel;
  courseDTO: CourseModel;


}
