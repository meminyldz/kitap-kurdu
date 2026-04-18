import axiosInstance from "./axiosInstance";

export const searchBook = async (title, author) => {
  const query = `intitle:${title}+inauthor:${author}`;

  const response = await axiosInstance.get(`/volumes?q=${query}`);

  return response.data.items;
};