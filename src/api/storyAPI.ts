import { getToken } from "../helpers/jwtHelper";
import { ICreateStoryInfo, IUpdateStoryInput } from "../interfaces/story";
import api from "./initAPI";

export const getAllStories = async (search: string | undefined, page = 1) => {
  search = search ? `&search=${search}` : "";
  const res = await api.get(`api/story/?page=${page}${search}`);
  return res.data.data;
};

export const getStoryById = async (id: string) => {
  const res = await api.get(`api/story/${id}`);
  return res.data.data;
};

export const getStoryByUserId = async (
  id: string,
  search: string | undefined,
  page = 1
) => {
  search = search ? `&search=${search}` : "";
  const res = await api.get(`api/story?AuthorId=${id}&page=${page}${search}`);
  return res.data.data;
};

export const createStory = async (createStoryInfo: ICreateStoryInfo) => {
  try {
    const token = "Bearer " + getToken();
    const res = await api.post(`api/story`, createStoryInfo, {
      headers: { Authorization: token },
    });
    return res.data.data;
  } catch (error) {
    return null;
  }
};

export const updateStory = async (
  updateStoryInput: IUpdateStoryInput,
  storyId: string
) => {
  const token = "Bearer " + getToken();
  await api.patch(`api/story/${storyId}`, updateStoryInput, {
    headers: { Authorization: token },
  });
};

export const deleteStory = async (storyId: string) => {
  const token = "Bearer " + getToken();
  await api.delete(`api/story/${storyId}`, {
    headers: { Authorization: token },
  });
};
