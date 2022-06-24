import {BaseModel} from '../base-model';
import {MajorModel} from '../major-model';
import {StudyTypeModel} from '../studyType-model';
import {CollegeModel} from '../college-management/college-model';
import {DepartmentModel} from '../department-management/department-model';
import {AcademicYear} from '../academicYear-Management/academic-year';
import {AcademicTermModel} from '../academicTerm-management/academic-term-model';
import {CourseModel} from '../course-management/course-model';

export class SectionModel extends BaseModel {

  sectionNumber: string;
  theoreticalLectures: number;
  practicalLectures: number;
  exercisesLectures: number;
  numberOfStudents: number;
  majorDTO: MajorModel;
  studyTypeDTO: StudyTypeModel;
  collegeDTO: CollegeModel;
  departmentDTO: DepartmentModel;
  academicYearDTO: AcademicYear;
  academicTermDTO: AcademicTermModel;
  courseDTO: CourseModel;

}
