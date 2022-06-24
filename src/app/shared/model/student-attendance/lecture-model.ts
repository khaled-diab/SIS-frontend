import {BaseModel} from '../base-model';
import {FacultyMemberModel} from '../facultyMember-management/facultyMember-model';
import {CourseModel} from '../course-management/course-model';
import {AcademicTermModel} from '../academicTerm-management/academic-term-model';
import {SectionModel} from '../section-model';
import {AcademicYear} from '../academicYear-Management/academic-year';

export class LectureModel extends BaseModel {

  lectureDay: string;
  attendanceType: string;
  lectureDate: string;
  lectureStartTime: string;
  lectureEndTime: string;
  attendanceCode: number;
  attendanceStatus: boolean;
  facultyMemberDTO: FacultyMemberModel;
  courseDTO: CourseModel;
  academicTermDTO: AcademicTermModel;
  academicYearDTO: AcademicYear;
  sectionDTO: SectionModel;
  rate:number;

}
