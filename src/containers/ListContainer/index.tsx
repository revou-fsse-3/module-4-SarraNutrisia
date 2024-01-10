import React, { useEffect, useState } from 'react';
import { deleteCategory, getCategories } from '../../api/categoryApi';
import { CategoryData } from '../../interfaces/Category';

const ListContainer: React.FC = () => {
  const token = localStorage.getItem('token') ?? '';
  const [categories, setCategories] = useState<CategoryData[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories(token);
        setCategories(response.data.data);

        console.log('Dapet bang !');
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, [token]);

  const handleEdit = (
    categoryId: string,
    categoryName: string,
    categoryStatus: boolean
  ) => {
    console.log(`edit category with ID: ${categoryId}`);
    console.log(categoryName);
    console.log(categoryStatus);
  };

  const handleDelete = async (categoryId: string) => {
    try {
      await deleteCategory(categoryId, token);
      const updatedCategories = categories.filter(
        (category) => category.id !== categoryId
      );
      setCategories(updatedCategories);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-center">Category List</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td className="border px-4 py-2">{category.id}</td>
              <td className="border px-4 py-2">{category.name}</td>
              <td className="border px-4 py-2">
                {category.is_active ? 'Active' : 'Deactive'}
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() =>
                    handleEdit(category.id, category.name, category.is_active)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          <td></td>
        </tbody>
      </table>
    </div>
  );
};

export default ListContainer;