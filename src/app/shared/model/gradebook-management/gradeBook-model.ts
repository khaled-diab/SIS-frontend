import {AcademicTermModel} from '../academicTerm-management/academic-term-model';
import {CourseModel} from '../course-management/course-model';
import {BaseModel} from '../base-model';
import {StudentModel} from '../student-management/student-model';

export class GradeBookModel extends BaseModel {

   academicTermDTO: AcademicTermModel;
   studentDTO: StudentModel;
   courseDTO: CourseModel;
   finalExamGrade: number;
   practicalGrade: number;
   oralGrade: number;
   midGrade: number;
}
