import {BaseModel} from '../base-model';
import {StudentModel} from '../student-management/student-model';
import {LectureModel} from './lecture-model';
import {SectionModel} from '../section-model';
import {CourseModel} from "../course-management/course-model";


export class AttendanceDetailsModel extends BaseModel {

  studentDTO: StudentModel;
  lectureDTO: LectureModel;
  attendanceStatus: string;
  attendanceDate: string;
  lectureStartTime: string;
  lectureEndTime: string;
  courseDTO: CourseModel;
  sectionDTO: SectionModel;

}
