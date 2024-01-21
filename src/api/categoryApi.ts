import axios from "axios";
import { CategoryData } from "../interfaces/Category";

const baseURL = 'https://mock-api.arikmpt.com/api/category';

export const createCategory = async (data: CategoryData, token: string) => {
  return await axios.post(`${baseURL}/create`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateCategory = async (id: string, name: string, is_active: boolean, token: string
) => {
  const response = await axios.put(
    `${baseURL}/update`,
    { id, name, is_active },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const getCategories = async (token: string) => {
  return await axios.get(`${baseURL}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteCategory = async (categoryId: string, token: string) => {
  return await axios.delete(`${baseURL}/${categoryId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};


