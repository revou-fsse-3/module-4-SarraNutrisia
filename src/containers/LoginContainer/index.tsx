import { Input, Text, Button, Card } from '../../components';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';


const LoginContainer = () => {

    const navigate = useNavigate();
    
    interface FormProps {
        email: string;
        password: string;
    }

    const formMik = useFormik<FormProps>({
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
        <Card border={false} className=" ">
            <Card border className="bg-white shadow-xl rounded-lg p-8">
            <form onSubmit={formMik.handleSubmit} >
                
                <div className= "m-1">
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
                <div className='m-1'>
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
                <Button label={'Register'} onClick={() => navigate('/')}/>


                <Button label={'Login'} type={'submit'}/>
            </form>   
        </Card>
    </Card>
  </div>   
    )
}

export default LoginContainer