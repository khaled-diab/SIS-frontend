import { Time } from "@angular/common";
import { CourseModel } from "../course-management/course-model";
import { SectionModel } from "../section-model";
import { LectureModel } from "../student-attendance/lecture-model";
import { StudentModel } from "../student-management/student-model";

export class AttendanceReportByLectureManagementModel {

    lectureDTO  : LectureModel;
    sectionDTO :SectionModel;
    studentDTO : StudentModel;
    courseDTO : CourseModel;
    attendanceDate: Date;
    attendanceStatus:string;
    lectureStartTime: Time;
    attendancenumber:number;
    absentNumber:number;
    excuse:number;
    lectureEndTime: Time;

}
