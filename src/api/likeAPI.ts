import { getToken } from "../helpers/jwtHelper";
import api from "./initAPI";

export const likeStory = async (storyId: string) => {
  const token = "Bearer " + getToken();
  await api.post(`api/like/${storyId}`, null, {
    headers: { Authorization: token },
  });
};

export const getLikesByStoryId = async (storyId: string) => {
  const res = await api.get(`api/like/${storyId}`);
  return res.data.data;
};

export const unlikeStory = async (storyId: string) => {
  const token = "Bearer " + getToken();
  await api.delete(`api/like/${storyId}`, {
    headers: { Authorization: token },
  });
};
