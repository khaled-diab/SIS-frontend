import { Time } from "@angular/common";
import { CourseModel } from "../course-management/course-model";
import { SectionModel } from "../section-model";
import { LectureModel } from "../student-attendance/lecture-model";
import { StudentModel } from "../student-management/student-model";

export class AttendanceReportByLectureManagementModel {

    id:number;
    lectureDay : string;
    lectureDate: Date;
    lectureStartTime: Time;
    presentStudent:number;
    absentStudent:number;
    lectureEndTime: Time;
    rate:number;

}
