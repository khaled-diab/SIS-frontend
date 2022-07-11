export class UserFile {
   directories: string | null;
   fileName: string | null;
   type: string | null;
   fileLink: string | null;
   id: number | null;


   constructor(directories: string | null, fileName: string | null, type: string | null, link: string | null, id: number | null) {
      this.directories = directories;
      this.fileName = fileName;
      this.type = type;
      this.fileLink = link;
      this.id = id;
   }
}
