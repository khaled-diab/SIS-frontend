import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Constants} from '../../shared/constants';
import {MessageResponse} from '../../shared/model/message-response';
import {UserFile} from '../../shared/model/security/user-file';

@Injectable({
   providedIn: 'root'
})
export class ProfileService {

   public updateProfilePictureEvent: Subject<string> = new Subject<string>();

   constructor(private http: HttpClient) {
   }

   public uploadProfilePicture(event: any, email: string): Observable<MessageResponse> {
      const file: File = event.files.pop();
      const formData = new FormData();
      formData.append('file', file, file.name.replaceAll('-', ''));
      formData.append('email', email);
      return this.http.post<MessageResponse>(Constants.uploadProfilePicture, formData);
   }

   getAdminFilesLinks(uploadedFiles: UserFile[]): UserFile[] | null {
      uploadedFiles = uploadedFiles.filter(value => value.type !== Constants.FILE_TYPE_PROFILE_PICTURE);
      if (uploadedFiles.length === 0) {
         return null;
      }
      return uploadedFiles.map(value => new UserFile(null, value.fileName, value.type, Constants.downloadFileURL + value.directories, value.id));
   }
}

