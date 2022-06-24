import {Constants} from '../../constants';

export class TimetableRequestModel {
  filterCollege: number;
  filterDepartment: number;
  filterAcademicYear: number;
  filterAcademicTerm: number;
  filterFacultyMember: number;
  filterCourse: number;
  filterSection: number;
  filterDay: string;
  sortDirection: string | null = Constants.ASC;
  sortBy = 'startTime';
}
