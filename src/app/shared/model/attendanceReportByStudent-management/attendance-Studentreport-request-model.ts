import { Constants } from "../../constants";

export class AttendanceStudentReportRequestModel {
    searchValue: string;
  filterCourse: number;
  filterSection: number;
  studentId : number;
  sortDirection: string | null = Constants.ASC;
}
