import { AcademicYear } from "../academicYear-Management/academic-year";
import { BaseModel } from "../base-model";

export class AcademicTermModel extends BaseModel {
    code ='';
    name ='';
    start_date ='';
    end_date ='';
    academicYearDTO : AcademicYear;
}

