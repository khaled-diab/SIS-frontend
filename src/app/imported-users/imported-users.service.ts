import {Injectable} from '@angular/core';
import {GeneralSearchRequest} from '../shared/model/general-search-request';
import {Observable} from 'rxjs';
import {PageRequest} from '../shared/model/page-request';
import {Constants} from '../shared/constants';
import {HttpClient} from '@angular/common/http';
import {UserFile} from '../shared/model/security/user-file';

@Injectable({
   providedIn: 'root'
})
export class ImportedUsersService {

   constructor(private httpClient: HttpClient) {
   }

   public getUsersFilesPage(pageNumber: number, pageSize: number, collegeFilterModel: GeneralSearchRequest): Observable<PageRequest<UserFile>> {
      return this.httpClient.post<PageRequest<UserFile>>(Constants.usersFilesPageUrl + pageNumber + '/' + pageSize, collegeFilterModel);
   }

   public getAdminFilesLinks(uploadedFiles: UserFile[]): UserFile[] {
      return uploadedFiles.map(value => {
         if (value.type === Constants.FILE_TYPE_STUDENT_UPLOAD) {
            value.type = 'Student Upload';
         } else {
            value.type = 'Staff Upload';
         }
         return new UserFile(null, value.fileName, value.type, Constants.downloadFileURL + value.directories, value.id, value.uploadDate);
      });
   }
}
