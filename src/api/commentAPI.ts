import { getToken } from "../helpers/jwtHelper";
import { ICommentInfo } from "../interfaces/comment";
import api from "./initAPI";

export const commentStory = async (
  commentInfo: ICommentInfo,
  storyId: string
) => {
  try {
    const token = "Bearer " + getToken();
    const res = await api.post(`api/comment/${storyId}`, commentInfo, {
      headers: { Authorization: token },
    });
    return res.data.data;
  } catch (error) {
    return null;
  }
};

export const getCommentsByStoryId = async (storyId: string) => {
  try {
    const res = await api.get(`api/comment/${storyId}`);
    return res.data.data;
  } catch (error) {
    return null;
  }
};
