import { getToken, getUserId, getUserName } from "../helpers/jwtHelper";
import { ICreateStoryInfo, ICreateStoryInput, IUpdateStoryInput } from "../interfaces/story";
import api from "./initAPI";

export const getAllStories = async () => {
  try {
    const res = await api.get(`api/story/`);
    return res.data.data;
  } catch (error) {
    return null;
  }
};

export const getStoryById = async (id: string) => {
  try {
    const res = await api.get(`api/story/${id}`);
    return res.data.data;
  } catch (error) {
    return null;
  }
};

export const createStory = async (createStoryInput: ICreateStoryInput) => {
  const AuthorId: string | null = getUserId();
  const AuthorUserName: string | null = getUserName();

  if (!AuthorId || !AuthorUserName) {
    return;
  }

  const createStoryInfo: ICreateStoryInfo = {
    ...createStoryInput,
    AuthorUserName,
    AuthorId,
  };
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

export const updateStory = async (updateStoryInput:IUpdateStoryInput, storyId:string) => {
  try {
    const token = "Bearer " + getToken();
    await api.patch(`api/story/${storyId}`, updateStoryInput, {
      headers: { Authorization: token },
    });
  } catch (error) {
    return null;
  }
};

export const deleteStory = async (storyId:string) => {
  try {
    const token = "Bearer " + getToken();
    await api.delete(`api/story/${storyId}`, {
      headers: { Authorization: token },
    });
  } catch (error) {
    return null;
  }
};
