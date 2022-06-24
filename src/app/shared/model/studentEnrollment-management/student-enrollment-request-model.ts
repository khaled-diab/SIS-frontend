import {Constants} from '../../constants';

export class StudentEnrollmentRequestModel {
  searchValue: string;
  filterCollege: number;
  filterDepartment: number;
  filterAcademicYear: number;
  filterAcademicTerm: number;
  filterCourse: number;
  filterStudent: number;
  filterStudyType: number;
  filterSection: number;
  filterMajor: number;
  sortDirection: string | null = Constants.ASC;
  sortBy = 'college';
}
