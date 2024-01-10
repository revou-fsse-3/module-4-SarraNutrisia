import React from 'react';
import { useFormik } from 'formik';
import { CreateCategoryData } from '../../interfaces/Category';
import { createCategory } from '../../api/categoryApi';
import * as ValidationSchemas from '../../validations/validationSchemas';
import { Button, Text, Card } from '../../components';


const CreateCategory: React.FC = () => {
  const { CreateCategorySchema } = ValidationSchemas;
  const token = localStorage.getItem('token') ?? '';

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: CreateCategorySchema,
    onSubmit: async (values: CreateCategoryData) => {
      try {
        await createCategory({ name: values.name }, token);
        console.log('Berhasil bikin category bang!');
      } catch (error) {
        console.error(error);
      }
    },
  });
  return (
    <>
      <Card border className={'flex flex-wrap flex-col items-center'}>
        <Card border={false}>
          <h2 className="w-full text-xl bg-sky-700/[.9] text-white flex justify-center rounded-md">
            Create Category
          </h2>

          <Card border>
            <form
              onSubmit={formik.handleSubmit}
              className=" h-[10rem] my-2 px-8 py-2 rounded-lg border-4 border-sky-200 border-y-sky-500 "
            >
              <div>
                <Text>{'Nama'}</Text>
                <input
                  className="border-solid border-2 border-sky-500"
                  type="text"
                  id="name"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div>{formik.errors.name}</div>
                ) : null}
              </div>
              <Button
                label={'Create Category'}
                type={'submit'}
                className="w-full py-1 text-sm bg-green-400 opacity-90 mt-3"
              />
            </form>
          </Card>
        </Card>
      </Card>
    </>
  );
};

export default CreateCategory;