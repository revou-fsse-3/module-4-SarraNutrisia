import React, { useEffect, useState } from 'react';
import { deleteCategory, getCategories } from '../../api/categoryApi';
import { CategoryData } from '../../interfaces/Category';
import { UpdateForm } from '../../components';

const ListContainer: React.FC = () => {
  const token = localStorage.getItem('token') ?? '';
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{
    id: string;
    name: string;
    is_active: boolean;
  } | null>(null);
  

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories(token);
        setCategories(response.data.data);

        console.log('Success');
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, [token, showUpdateForm]);

  const handleEdit = (
    category: CategoryData
  ) => {
    console.log(category);
    setShowUpdateForm(true);
    setSelectedCategory(category);
  };

  const handleUpdateSuccess = () => {
    setShowUpdateForm(false);
    setSelectedCategory(null);
  };

  const handleCancel = () => {
    setShowUpdateForm(false);
    setSelectedCategory(null);
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
      {showUpdateForm ? (
      <UpdateForm
        onUpdateSuccess={handleUpdateSuccess}
        onCancel={handleCancel}
        category={selectedCategory!}
      />
      ) : (
      <>
        <h2 className="text-xl font-bold text-center mt-8 mb-8">Category List</h2>
        <table className="table-auto w-full" style={{ border: "1px solid #ccc" }}>
          <thead>
            <tr>
              <th className="px-4 py-2" style={{ borderTop: "1px solid #000", borderBottom: "1px solid #000", borderRight: "1px solid #000" }}>ID</th>
              <th className="px-4 py-2" style={{ borderTop: "1px solid #000",borderBottom: "1px solid #000", borderRight: "1px solid #000" }}>Name</th>
              <th className="px-4 py-2" style={{ borderTop: "1px solid #000",borderBottom: "1px solid #000", borderRight: "1px solid #000" }}>Status</th>
              <th className="px-4 py-2" style={{ borderTop: "1px solid #000",borderBottom: "1px solid #000" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="border px-4 py-2" style={{ borderTop: "1px solid #000", borderBottom: "1px solid #000", borderRight: "1px solid #000" }}>{category.id}</td>
                <td className="border px-4 py-2 text-center" style={{ borderTop: "1px solid #000", borderBottom: "1px solid #000", borderRight: "1px solid #000" }}>{category.name}</td>
                <td className="border px-4 py-2 text-center font-semibold" style={{ borderTop: "1px solid #000", borderBottom: "1px solid #000", borderRight: "1px solid #000" }}>
                  {category.is_active ? 'Active' : 'Inactive'}
                </td>
                <td className="border px-4 py-2" style={{ borderTop: "1px solid #000", borderBottom: "1px solid #000", borderRight: "1px solid #000" }}>
                  <div style={{display:'flex'}} className='justify-center align-center'>
                  <button
                    onClick={() => handleEdit(category)}
                    className="bg-indigo-900 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="ml-2 bg-red-900 hover:bg-red-300 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                  </div>
                
                </td>
              </tr>
            ))}
            <td></td>
          </tbody>
        </table>
      </>
      )}
    </div>
  );
};

export default ListContainer;