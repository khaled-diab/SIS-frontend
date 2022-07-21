import {AcademicTermModel} from '../academicTerm-management/academic-term-model';
import {BaseModel} from '../base-model';
import {StudentModel} from '../student-management/student-model';
import {SectionModel} from '../section-model';

export class GradeBookModel extends BaseModel {

   academicTermDTO: AcademicTermModel;
   studentDTO: StudentModel;
   sectionDTO: SectionModel;
   finalExamGrade: number;
   practicalGrade: number;
   oralGrade: number;
   midGrade: number;
}
