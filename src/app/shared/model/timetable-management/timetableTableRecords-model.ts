import {BaseModel} from '../base-model';

export class TimetableTableRecordsModel extends BaseModel {

   day: string;
   startTime: string;
   endTime: string;
   lectureTypeName: string;
   facultyMemberName: string;
   courseName: string;
   sectionName: string;
   buildingName: string;
   classroomName: string;
}
