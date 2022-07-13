import {BaseModel} from '../base-model';

export class UserFile extends BaseModel {
   directories: string | null;
   fileName: string | null;
   type: string | null;
   fileLink: string | null;
   uploadDate: Date | null;


   constructor(directories: string | null, fileName: string | null, type: string | null, link: string | null, id: number | null, uploadDate: Date | null = null) {
      super();
      this.directories = directories;
      this.fileName = fileName;
      this.type = type;
      this.fileLink = link;
      // @ts-ignore
      this.id = id;
      this.uploadDate = uploadDate;
   }
}
