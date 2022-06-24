import {RoleModel} from './role-model';
import {UserFile} from './user-file';

export class UserModel {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  type: string;
  token: string;
  role: RoleModel;
  id: number;
  userFileList: UserFile[];
}
