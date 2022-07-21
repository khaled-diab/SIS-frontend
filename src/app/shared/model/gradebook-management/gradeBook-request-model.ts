import {Constants} from '../../constants';

export class GradeBookRequestModel {
   filterAcademicTerm: number;
   filterSection: number;
   filterStudent: number;
   sortDirection: string | null = Constants.ASC;
   sortBy = 'student';
}
