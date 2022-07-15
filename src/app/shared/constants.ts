import {environment} from '../../environments/environment';

export class Constants {
   // College Url
   public static readonly collegePageUrl = environment.baseURL + '/colleges/findAll/';
   public static readonly deleteCollegeUrl = environment.baseURL + '/colleges/deleteCollege/';
   public static readonly saveCollegeUrl = environment.baseURL + '/colleges/add';
   public static readonly checkCollegeCode = environment.baseURL + '/colleges/checkCollegeCode';
   // Building Url
   public static readonly buildingPageUrl = environment.baseURL + '/building/all/';
   public static readonly deleteBuildingUrl = environment.baseURL + '/building/delete/';
   public static readonly saveBuildingUrl = environment.baseURL + '/building/addOrUpdate';
   // Classroom Url
   public static readonly classroomPageUrl = environment.baseURL + '/classroom/all/';
   public static readonly deleteClassroomUrl = environment.baseURL + '/classroom/delete/';
   public static readonly saveClassroomUrl = environment.baseURL + '/classroom/addOrUpdate';
   // Course Url
   public static readonly getCourses = environment.baseURL + '/courses/all';
   public static readonly coursePageUrl = environment.baseURL + '/courses/search/';
   public static readonly saveCourseUrl = environment.baseURL + '/courses/save';
   public static readonly deleteCourseUrl = environment.baseURL + '/courses/delete/';
   public static readonly allCoursesUrl = environment.baseURL + '/courses/all/';
   // Faculty Member Url
   public static readonly facultyMemberPageUrl = environment.baseURL + '/facultyMembers/datapage';
   public static readonly searchFacultyMemberUrl = environment.baseURL + '/facultyMembers/search/';
   public static readonly filterFacultyMemberUrl = environment.baseURL + '/facultyMembers/filter/';
   public static readonly saveFacultyMemberUrl = environment.baseURL + '/facultyMembers/saveFacultyMember';
   public static readonly deleteFacultyMemberUrl = environment.baseURL + '/facultyMembers/delete/';
   public static readonly facultyMemberByIdUrl = environment.baseURL + '/facultyMembers/';
   public static readonly uploadFacultyMemberImgUrl = environment.baseURL + '/facultyMembers/upload/';
   public static readonly FacultyMemberImgUrl = environment.baseURL + '/facultyMembers/download/';
   public static readonly allFacultyMembersUrl = environment.baseURL + '/facultyMembers/all';
   public static readonly FacultyMemberDegrees = environment.baseURL + '/degrees/all';
   public static readonly facultyMemberByUserIdUrl = environment.baseURL + '/facultyMembers/facultyMemberByUserId/';

   /* Student Url */
   public static readonly deleteStudentUrl = environment.baseURL + '/students/deleteStudent/';
   public static readonly addStudentUrl = environment.baseURL + '/students/addStudent/';
   public static readonly updateStudentUrl = environment.baseURL + '/students/updateStudent/';
   public static readonly filterStudentUrl = environment.baseURL + '/students/searchStudent/';
   public static readonly uploadStudentImgUrl = environment.baseURL + '/students/upload/';
   public static readonly StudentImgUrl = environment.baseURL + '/students/download/';
   public static readonly defaultStudentImgUrl = 'defaultStudentImage.png';
   public static readonly getStudentUrl = environment.baseURL + '/students/';
   public static readonly filterStudentRecordUrl = environment.baseURL + '/students/searchRecords/';

   // Section URLs
   public static readonly getSections = environment.baseURL + '/sections/all';
   public static readonly getSection = environment.baseURL + '/sections';
   public static readonly sectionPageUrl = environment.baseURL + '/sections/datapage';
   public static readonly searchSectionUrl = environment.baseURL + '/sections/search/';
   public static readonly filterSectionUrl = environment.baseURL + '/sections/filter/';
   public static readonly saveSectionUrl = environment.baseURL + '/sections/save';
   public static readonly updateSectionUrl = environment.baseURL + '/sections/update';
   public static readonly deleteSectionUrl = environment.baseURL + '/sections/delete/';
   public static readonly SectionByIdUrl = environment.baseURL + '/sections/';
   public static readonly allSectionsUrl = environment.baseURL + '/sections/all/';

   // Timetable URLs
   public static readonly timetablePageUrl = environment.baseURL + '/timetables/datapage';
   public static readonly searchTimetableUrl = environment.baseURL + '/timetables/search/';
   public static readonly filterTimetableUrl = environment.baseURL + '/timetables/filter/';
   public static readonly saveTimetableUrl = environment.baseURL + '/timetables/saveAll';
   public static readonly updateTimetableUrl = environment.baseURL + '/timetables/update';
   public static readonly deleteTimetableUrl = environment.baseURL + '/timetables/delete/';
   public static readonly timetableByIdUrl = environment.baseURL + '/timetables/';
   public static readonly allLectureTypesUrl = environment.baseURL + '/lectureTypes/all';
   public static readonly studentTimetablesUrl = environment.baseURL + '/timetables/getStudentTimetables/';

   // StudentEnrollment URLs
   public static readonly studentEnrollmentPageUrl = environment.baseURL + '/studentEnrollments/datapage';
   public static readonly searchStudentEnrollmentUrl = environment.baseURL + '/studentEnrollments/search/';
   public static readonly saveStudentEnrollmentUrl = environment.baseURL + '/studentEnrollments/save';
   public static readonly updateStudentEnrollmentUrl = environment.baseURL + '/studentEnrollments/update';
   public static readonly deleteStudentEnrollmentUrl = environment.baseURL + '/studentEnrollments/delete/';
   public static readonly allMajorsUrl = environment.baseURL + '/majors/all';
   public static readonly allStudyTypesUrl = environment.baseURL + '/studyTypes/all';
   /* Student Attendance Url */
   public static readonly getFacultyMemberSectionsUrl = environment.baseURL + '/sections/getFacultyMemberSections/';
   public static readonly getSectionTimeTablesUrl = environment.baseURL + '/timetables/getSectionTimeTables/';
   public static readonly addLectureUrl = environment.baseURL + '/lectures/addLecture/';
   public static readonly addManualAttendanceUrl = environment.baseURL + '/attendanceDetails/addManualAttendance/';
   public static readonly disableLectureUrl = environment.baseURL + '/lectures/update/';
   public static readonly getAttendancesByLectureUrl = environment.baseURL + '/attendanceDetails/getAttendancesByLecture/';

   // Academic Program URLS
   public static readonly getAcademicPrograms = environment.baseURL + '/academicPrograms/all';
   public static readonly deleteAcademicPrograms = environment.baseURL + '/academicPrograms/delete';
   public static readonly addAcademicPrograms = environment.baseURL + '/academicPrograms/add';
   // Department URLS
   public static readonly getDepartments = environment.baseURL + '/departments/all';
   public static readonly addDepartments = environment.baseURL + '/departments/add';
   public static readonly getDepartmentsByCollege = environment.baseURL + '/departments/getDeptsByCollege/';

   public static readonly deleteDepartments = environment.baseURL + '/departments/delete';
   // Academic Years URLS
   public static readonly getAcademicYears = environment.baseURL + '/academicYears/all';
   public static readonly addAcademicYears = environment.baseURL + '/academicYears/add';
   public static readonly deleteAcademicYears = environment.baseURL + '/academicYears/delete';
   // Academic Terms URLS
   public static readonly getAcademicTerms = environment.baseURL + '/academicTerms/all';
   public static readonly addAcademicTerms = environment.baseURL + '/academicTerms/add';
   public static readonly deleteAcademicTerms = environment.baseURL + '/academicTerms/delete';
   // Attendane Details By Lectures
   public static readonly studentAttendanceReport = environment.baseURL + '/attendanceDetails/getAttendancesByLectureId';
   public static readonly lecturesReport = environment.baseURL + '/lectures/getFacultyMemberLecturesToReport';
   public static readonly attendanceDetails = environment.baseURL + '/attendanceDetails/update';
   // Attendane Details By Student
   public static readonly studentReport = environment.baseURL + '/attendanceDetails/getAttendancesBySectionId';

   // Sort
   public static readonly ASC = 'ASC';
   public static readonly DESC = 'DESC';
   public static readonly sortASCIcon = 'arrow_upward';
   public static readonly sortDESCIcon = 'arrow_downward';
   public static readonly sortASCHint = 'Sort Ascending';
   public static readonly sortDescHint = 'Sort Descending';

   /* Validation Regex */
   public static readonly ENGLISH_CHARACTERS = '^[a-zA-Z ]+$';
   public static readonly ARABIC_CHARACTERS = '^[\\u0621-\\u064A ]+$';
   public static readonly DIGITS_ONLY_14 = '^[0-9]{14}$';
   public static readonly DIGITS_ONLY_11 = '^[01][0-9]{10}$';
   public static readonly FLOAT_NUMBERS = '^([0-9]*[.])?[0-9]+$';
   public static readonly DIGITS_ONLY = '^\\d+$';
   public static readonly ENGLISH_CHARACTERS_AND_DIGITS = '^[a-zA-Z0-9 ]+$';
   public static readonly ENGLISH_CHARACTERS_AND_DIGITS_AND_DASH = '^[a-zA-Z0-9- ]*$';
   public static readonly loginUrl = environment.baseURL + '/security/sign-in';
   public static readonly authHeader = 'Authorization';
   public static readonly loggedInUser = 'loggedInUser';
   public static readonly screens = 'screens';
   public static readonly registerStudentUrl = environment.baseURL + '/security/register-student';
   public static readonly registerStaffUrl = environment.baseURL + '/security/register-faculty-member';
   public static readonly ROLE_ADMIN = 'ADMIN';
   public static readonly ROLE_FACULTY_MEMBER = 'FACULTY_MEMBER';
   public static readonly ROLE_STUDENT = 'STUDENT';
   public static readonly FILE_TYPE_PROFILE_PICTURE = 'PROFILE_PICTURE';
   public static readonly FILE_TYPE_STUDENT_UPLOAD = 'STUDENT_UPLOAD';
   public static readonly FILE_TYPE_STAFF_UPLOAD = 'STAFF_UPLOAD';
   public static readonly downloadFileURL = environment.driveURL + 'download/';
   public static readonly uploadFileURL = environment.driveURL + 'upload/';
   public static readonly uploadProfilePicture = environment.baseURL + '/security/upload-profile-picture';
   public static readonly UPLOAD_BULK_STUDENTS = environment.baseURL + '/security/register-bulk-students';
   public static readonly FORM_DATA_VALUE = 'multipart/form-data';
   public static readonly APP_JSON = 'application/json';
   public static readonly STUDENT_TYPE = 'STUDENT';
   public static readonly STAFF_TYPE = 'STAFF';
   public static readonly ADMIN_TYPE = 'ADMIN';
   public static readonly FILE_UPLOAD_TOPIC_NAME = '/topic/uploadedUsers';
   public static readonly usersFilesPageUrl = environment.baseURL + '/security/findAll/';

   public  static  readonly  LEVELS = ['1', '2', '3', '4', '5', '6', '7', '8'];
   public  static  readonly  COLLEGES_LIST = 'colleges';
   public  static  readonly  DEPARTMENTS_LIST = 'departments';
   public  static  readonly  TERMS_LIST = 'terms';
   public  static  readonly  YEARS_LIST = 'years';


}
