/**
 * This interface indicates the relevant information required to run a scrape, i.e. login credentials and which courses to retrieve information for
 */
export interface ScrapeBody {
  username?: string;
  password?: string;
  courses?: string;
}

/**
 * This interface indicates the information for each module
 */
export interface ScrapeResponse {
  courseUrl: string;
  type: ModuleType;
  name: string;
  dueDate: string | null;
  sectionTitle: string;
  resourceUrl: string;
  completed: boolean;
  comments: string | null;
}

/**
 * The ModuleType enum identifies what kind of resource is being referred to
 */
export enum ModuleType {
  ASSIGNMENT = "assign",
  TURNITIN = "turnitintooltwo",
  CHOICE = "choice",
  CHOICEGROUP = "choicegroup",
  QUIZ = "quiz",
  RESOURCE = "resource",
  URL = "url",
  PAGE = "page",
  FOLDER = "folder",

  UNKNOWN = "UNKNOWN TYPE",
  //IGNORE
  LABEL = "label",
  FORUM = "forum",
}

export interface ScraperErrorType {
  name: string;
  status: number;
  message: string;
}
