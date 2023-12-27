import { Input, Text, Button, Card } from '../../components';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';

const HomeContainer = () => {
    
    const [step, setStep] = useState<number>(1);
  
    
    const handleNext = () => {
      if (step === 3) {
        return;
      }
      setStep((prevState) => prevState + 1);
    };
  
    
    const handlePrevious = () => {
      if (step === 1) {
        return;
      }
      setStep((prevState) => prevState - 1);
    };
  
    interface DataProps {
      Fullname: string;
      Email: string;
      Date: string;
      Alamat: string;
      Kota: string;
      Negara: string;
      Kodepos: string;
      Username: string;
      Password: string;
    }
  
    const formMik = useFormik({
      initialValues: {
        Fullname: '',
        Email: '',
        Date: '',
        Alamat: '',
        Kota: '',
        Negara: '',
        Kodepos: '',
        Username: '',
        Password: '',
      },
      onSubmit: (values: DataProps) => console.log(values),
      validationSchema: yup.object({
        Fullname: yup.string().required('Name can not be blank'),
        Email: yup.string().email('Email is not valid').required('Email can not be blank, example : Sarra@email.com'),
        Date: yup.date().required('Date of birth can not be blank, example : 29-10-1997'),
        Alamat: yup.string().required('Address can not be blank'),
        Kota: yup.string().required('City can not be blank'),
        Negara: yup.string().required('State can not be blank'),
        Kodepos: yup.string().required('Zipcode can not be blank'),
        Username: yup.string().required('Username can not be blank'),
        Password: yup.string().min(8,'Password required at least 8 characters').required('Password can not be blank, required at least 8 characters'),
      }),
    });
    console.log(formMik);
    return (
      <Card border={false} className=" ">
        
  
        <Card border>
          
  
          {step === 1 && (
            <form onSubmit={formMik.handleSubmit}>
              <p>Personal Information</p>
             
              <div className="m-1">
                <Text>{'Full Name'}</Text>
                <Input
                  className="block border-emerald-700 border"
                  name={'Nama'}
                  value={formMik.values.Fullname}
                  onChange={formMik.handleChange('Fullname')}
                />
                
                {formMik.errors.Fullname && (
                  <Text>{formMik.errors.Fullname}</Text>
                )}
              </div>
            
              <div className="m-1">
                <Text>{'Email Address'}</Text>
                <Input
                  className="block border-emerald-700 border"
                  name={'Email'}
                  value={formMik.values.Email}
                  onChange={formMik.handleChange('Email')}
                />
                
                {formMik.errors.Email && <Text>{formMik.errors.Email}</Text>}
              </div>
              
              <div className="m-1">
                <Text>{'Date of Birth'}</Text>
                <Input
                  className="block border-emerald-700 border"
                  name={'Date'}
                  value={formMik.values.Date}
                  onChange={formMik.handleChange('Date')}
                />
                
                {formMik.errors.Date && <Text>{formMik.errors.Date}</Text>}
              </div>
             
              <Button
                label={'Previous'}
                onClick={handlePrevious}
                type={'button'}
                className={'bg-green-500'}
              />
              
              <Button
                label={'Next'}
                onClick={handleNext}
                type={'button'}
                className={'bg-green-500'}
              />
            </form>
          )}
  
          
  
          {step === 2 && (
            <form onSubmit={formMik.handleSubmit}>
              <p>Address Information</p>
              
              <div className="m-1">
                <Text>{'Street Address'}</Text>
                <Input
                  className="block border-emerald-700 border"
                  name={'Alamat'}
                  value={formMik.values.Alamat}
                  onChange={formMik.handleChange('Alamat')}
                />
                
                {formMik.errors.Alamat && <Text>{formMik.errors.Alamat}</Text>}
              </div>
             
              <div className="m-1">
                <Text>{'City'}</Text>
                <Input
                  className="block border-emerald-700 border"
                  name={'Kota'}
                  value={formMik.values.Kota}
                  onChange={formMik.handleChange('Kota')}
                />
                
                {formMik.errors.Kota && <Text>{formMik.errors.Kota}</Text>}
              </div>
              
              <div className="m-1">
                <Text>{'State'}</Text>
                <Input
                  className="block border-emerald-700 border"
                  name={'Negara'}
                  value={formMik.values.Negara}
                  onChange={formMik.handleChange('Negara')}
                />
                
                {formMik.errors.Negara && <Text>{formMik.errors.Negara}</Text>}
              </div>
              
              <div className="m-1">
                <Text>{'Zip Code'}</Text>
                <Input
                  className="block border-emerald-700 border"
                  name={'Kodepos'}
                  value={formMik.values.Kodepos}
                  onChange={formMik.handleChange('Kodepos')}
                />
                
                {formMik.errors.Kodepos && <Text>{formMik.errors.Kodepos}</Text>}
              </div>
              
              <Button
                label={'Previous'}
                onClick={handlePrevious}
                type={'button'}
                className={'bg-green-500'}
              />
              
              <Button
                label={'Next'}
                onClick={handleNext}
                type={'button'}
                className={'bg-green-500'}
              />
            </form>
          )}
  
          
  
          {step === 3 && (
            <form onSubmit={formMik.handleSubmit}>
              
              <div className="m-1">
                <Text>{'Username'}</Text>
                <Input
                  className="block border-emerald-700 border"
                  name={'Username'}
                  value={formMik.values.Username}
                  onChange={formMik.handleChange('username')}
                />
                
                {formMik.errors.Username && (
                  <Text>{formMik.errors.Username}</Text>
                )}
              </div>
              
              <div className="m-1">
                <Text>{'Password'}</Text>
                <Input
                  className="block border-emerald-700 border"
                  name={'Password'}
                  value={formMik.values.Password}
                  onChange={formMik.handleChange('Password')}
                />
                
                {formMik.errors.Password && (
                  <Text>{formMik.errors.Password}</Text>
                )}
              </div>
              
              <Button
                label={'Previous'}
                onClick={handlePrevious}
                type={'button'}
                className={'bg-green-500'}
              />
              
              <Button
                label={'Submit'}
                type={'submit'}
                className={'bg-green-500'}
              />
            </form>
          )}
        </Card>
      </Card>
    );
  }
export default HomeContainer