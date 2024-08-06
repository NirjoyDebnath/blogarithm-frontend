import { IComment } from "./comment";
import { ILike } from "./like";

export interface IHATEOASLink {
  href: string;
  rel: string;
  type: string;
}

export interface IStory {
  Id: string;
  AuthorId: string;
  Title: string;
  Description: string;
  AuthorUserName: string;
  userLiked:boolean;
  commentCount:number;
  comments?:IComment[];
  likes:ILike[]
  _links : IHATEOASLink[];
  CreatedAt: Date;
}

export interface IStories {
  stories:IStory[],
  pageCount:number;
}

export interface ICreateStoryInput{
  Title: string;
  Description: string;
}
export interface ICreateStoryInfo{
  Title: string;
  Description: string;
}
export interface IUpdateStoryInput extends ICreateStoryInput{}
export interface IUpdateStoryInfo extends ICreateStoryInput{}