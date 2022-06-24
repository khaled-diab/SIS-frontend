import {CollegeModel} from '../college-management/college-model';
import {DepartmentModel} from '../department-management/department-model';
import {AcademicYear} from '../academicYear-Management/academic-year';
import {AcademicTermModel} from '../academicTerm-management/academic-term-model';
import {CourseModel} from '../course-management/course-model';
import {SectionModel} from '../section-management/section-model';
import {BaseModel} from '../base-model';
import {StudentModel} from '../student-management/student-model';
import {MajorModel} from '../major-model';
import {StudyTypeModel} from '../studyType-model';

export class StudentEnrollmentModel extends BaseModel {

  collegeDTO: CollegeModel;
  departmentDTO: DepartmentModel;
  academicYearDTO: AcademicYear;
  academicTermDTO: AcademicTermModel;
  studentDTO: StudentModel;
  courseDTO: CourseModel;
  sectionDTO: SectionModel;
  majorDTO: MajorModel;
  studyTypeDTO: StudyTypeModel;
}
