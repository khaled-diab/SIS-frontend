import {RoleScreenModel} from './role-screen-model';
import {BaseModel} from "../base-model";

export class RoleModel extends BaseModel{
  roleName: string;
  description: string;
  roleScreens: RoleScreenModel[];
}
