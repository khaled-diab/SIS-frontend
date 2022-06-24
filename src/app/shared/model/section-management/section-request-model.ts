import {Constants} from '../../constants';

export class SectionRequestModel {
  searchValue: string;
  filterCollege: number;
  filterDepartment: number;
  filterAcademicYear: number;
  filterAcademicTerm: number;
  filterCourse: number;
  filterStudyType: number;
  filterMajor: number;
  sortDirection: string | null = Constants.ASC;
  sortBy = 'college';
}
