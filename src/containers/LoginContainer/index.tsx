import { Input, Text, Button, Card } from '../../components';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';


const LoginContainer = () => {

    const navigate = useNavigate();
    
    interface DataProps {
        email: string;
        password: string;
    }

    const formMik = useFormik<DataProps>({
        initialValues: {
            email: '',
            password: ''
        },

        onSubmit: async (values) => {
            try {
              const response = await fetch(
                'https://mock-api.arikmpt.com/api/user/login',
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(values),
                }
              );
      
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              } else {
                
                const data = await response.json();
                
                localStorage.setItem('token', data.data.token);
                console.log(data);
                
                navigate('/list');
              }
            } catch (error) {
              
              console.log(
                'Your fetch operation has a problem : ' +
                  (error as Error).message
              );
            }
          },

          validationSchema:yup.object({
            email: yup.string().email('Email tidak valid').required('Email tidak boleh kosong'),
            password: yup.string().min(8, 'Password minimal terdiri dari 8 karakter').required('Password tidak boleh kosong'),
        }),
    });

   
    return (
        <div style={{display:'flex'}} className='justify-center align-center mt-44'>
        <Card border={false} >
            <Card border>
            <form onSubmit={formMik.handleSubmit} >
                
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
                <Button label={'Login'} type={'submit'} className={'bg-green-500'}/>
            </form>   
        </Card>
    </Card>
     </div>   
    )
}

export default LoginContainer