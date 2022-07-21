import {BaseModel} from '../base-model';

export class GradeBookStudentRecordsModel extends BaseModel {
   studentNameAr: string;
   studentNameEn: string;
   studentUniversityId: string;
   courseNameAr: string;
   courseNameEn: string;
   finalExamGrade: number;
   courseFinalExamGrade: number;
   practicalGrade: number;
   coursePracticalGrade: number;
   oralGrade: number;
   courseOralGrade: number;
   midGrade: number;
   courseMidGrade: number;
   courseTotalGrade: number;
}
