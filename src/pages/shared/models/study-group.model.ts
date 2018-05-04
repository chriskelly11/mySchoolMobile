export interface StudyGroupsFilter {
  pageSize:        number;
  pageIndex:       number;
  meetingOn?:      Date | string;
  meetingAt?:      string;
  courseCode?:     string[];
  courseName?:     string[];
  professor?:      string;
  availableSpots?: number;
}
