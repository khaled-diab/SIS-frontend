import { Constants } from "../../constants";

export class AttendanceReportRequestModel {
    searchValue: string;
  filterCourse: number;
  filterSection: number;
  lectureId : number;
  sortDirection: string | null = Constants.ASC;
}
