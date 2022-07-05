import {BaseModel} from '../base-model';



export class AttendanceDetailsModel extends BaseModel {

    studentId: number;
    universityId: number;
    nameAr: string;
    nameEn: string;
   lectureId: number;
   attendanceStatus: string;
   sectionId: number;

}
