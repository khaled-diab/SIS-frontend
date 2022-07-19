import {Constants} from '../../constants';

export class GradeBookRequestModel {
   filterAcademicTerm: number;
   filterCourse: number;
   filterStudent: number;
   filterFacultyMember: number;
   sortDirection: string | null = Constants.ASC;
   sortBy = 'student';
}
