import { getToken, getUserId, getUserName } from "../helpers/jwtHelper";
import { ICreateStoryInfo, ICreateStoryInput } from "../interfaces/story";
import api from "./initAPI";

export const getAllStories = async () => {
  try {
    const res = await api.get(`api/story/`);
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    return null;
  }
};

export const getStoryById = async (id: string) => {
  try {
    const res = await api.get(`api/story/${id}`);
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    return null;
  }
};

export const createStory = async (createStoryInput: ICreateStoryInput) => {
  const AuthorId: string | null = getUserId();
  const AuthorUserName: string | null = getUserName();

  if (!AuthorId || !AuthorUserName) {
    console.log("Story Create unsuccessful");
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
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.log(error)
    return null;
  }
};
