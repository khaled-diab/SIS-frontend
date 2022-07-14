import { Time } from "@angular/common";

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
