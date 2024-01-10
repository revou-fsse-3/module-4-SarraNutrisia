import { Input, Text, Button, Card } from '../../components';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';


const HomeContainer = () => {

    const navigate = useNavigate();

    interface DataProps {
        name: string;
        email: string;
        password: string;
      }


    const formMik = useFormik<DataProps>({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        onSubmit: async (values) => {
            await fetch('https://mock-api.arikmpt.com/api/user/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            });
            console.log('success');
            // this for navigate to login page
            navigate('/login');
          },

          validationSchema: yup.object({
          name: yup.string().required('Nama tidak boleh kosong'),
          email: yup.string().email('Email tidak valid').required('Email tidak boleh kosong'),
          password: yup.string().min(8, 'Password minimal terdiri dari 8 karakter').required('Password tidak boleh kosong'),
    }),
  });

    return (
        <div style={{display:'flex'}} className='justify-center align-center mt-44'>
        <Card border={false} className={'flex flex-col gap-2.5'}>
            <Card border style={{ 
            width: "300px", 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center" 
        }}>
            <form onSubmit={formMik.handleSubmit}>
                <div>
                    <Text>{'Name'}</Text>
                    <Input className="block border-neutral-400 border"
                         name={'name'}
                         value={formMik.values.name}
                         onChange={formMik.handleChange('name')}
                         />
                         {
                            formMik.errors.name && (
                                <Text>{formMik.errors.name}</Text>
                            )
                         }
                </div>
                <div>
                    <Text>{'Email'}</Text>
                    <Input className="block border-neutral-400 border"
                         name={'email'}
                         value={formMik.values.email}
                         onChange={formMik.handleChange('email')}
                         />
                         {
                            formMik.errors.email && (
                                <Text>{formMik.errors.email}</Text>
                            )
                         }
                </div>
                <div className='my-4'>
                    <Text>{'Password'}</Text>
                    <Input className="block border-neutral-400 border"
                         name={'password'}
                         type={'password'}
                         value={formMik.values.password}
                         onChange={formMik.handleChange('password')}
                         />
                         {
                            formMik.errors.password && (
                                <Text>{formMik.errors.password}</Text>
                            )
                         }
                </div>
                <Button label={'Submit'} type={'submit'} className={'bg-green-500'}/>
            </form>   
        </Card>
    </Card>
</div>  
    )
}

export default HomeContainer