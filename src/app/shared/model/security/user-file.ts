export class UserFile {
  directories: string;
  fileName: string | null;
  type: string;
  id: number | null;


  constructor(directories: string, fileName: string | null, type: string, id: number | null) {
    this.directories = directories;
    this.fileName = fileName;
    this.type = type;
    this.id = id;
  }
}
