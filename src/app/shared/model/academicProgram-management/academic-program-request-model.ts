import { Constants } from "../../constants";
import {BaseModel} from '../base-model';

export class AcademicProgramRequestModel {
    searchValue: string;
    filterValue:undefined;
    filterCollege: number;
    filterDepartment: number;
    sortDirection: string | null = Constants.ASC;
    sortBy = 'name_en';
}
