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

export const getStoryById = async (id:string) => {
  try {
    const res = await api.get(`api/story/${id}`);
    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    return null;
  }
};
