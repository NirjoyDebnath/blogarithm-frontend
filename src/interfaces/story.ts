export interface IStory {
  Id: string;
  AuthorId: string;
  Title: string;
  Description: string;
  AuthorUserName: string;
  links : object;
}

export interface ICreateStoryInput{
  Title: string;
  Description: string;
}
export interface ICreateStoryInfo{
  AuthorId: string;
  Title: string;
  Description: string;
  AuthorUserName: string;
}