import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateCategory } from '../../api/categoryApi';
import { Card } from '../../components';

interface UpdateCategoryFormProps {
  onUpdateSuccess: () => void;
  onCancel: () => void;
  category: {
    id: string;
    name: string;
    is_active: boolean;
  };
}

const UpdateForm: React.FC<UpdateCategoryFormProps> = ({
  onUpdateSuccess,
  onCancel,
  category,
}) => {

  const formik = useFormik({
    initialValues: {
      id: category.id,
      name: category.name,
      is_active: category.is_active,
    }, 
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      is_active: Yup.boolean().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
          const token = localStorage.getItem('token');
          if (token) {
            await updateCategory(
              values.id,
              values.name,
              values.is_active,
              token
            );
            onUpdateSuccess();
          }
      } catch (error) {
        console.error('Updating failed', error);
      }
    },
  });

  return (
    <Card border className="shadow-xl rounded-lg p-8">
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-1 font-bold">Category Name</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          className="w-full px-2 py-1 border rounded"
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-red-500 text-xs mt-1">{formik.errors.name}</div>
        ) : null}
      </div>

      <div className="flex items-center space-x-2">
        <label htmlFor="is_active" className="font-bold">Is Active</label>
        <input
          type="checkbox"
          id="is_active"
          name="is_active"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          checked={formik.values.is_active}
        />
        {formik.touched.is_active && formik.errors.is_active ? (
          <div className="text-red-500 text-xs mt-1">{formik.errors.is_active}</div>
        ) : null}
      </div>

      <div className="flex justify-between items-center">

      <button type="button" onClick={onCancel} className="px-4 py-2 text-white bg-blue-500 rounded">
        Cancel
      </button>
      <button type="submit" className="px-4 py-2 text-white bg-green-500 rounded">Update Category</button>
    </div>
</form>
</Card>
  );
};

export default UpdateForm