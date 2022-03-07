import React,{useState} from 'react'
import { Select, StyledFormWrapper,StyledButton, StyledForm,Date} from './styles/Form.styled'

import { Container } from './styles/Container.styled'
import 'react-datepicker/dist/react-datepicker.css'

import {useForm}   from 'react-hook-form';

function Form(){

   

   const { register, handleSubmit } = useForm();
   const [StartDate, setStartDate] = useState('2020-03-12');
   const [EndDate, setEndDate] = useState('2020-03-12');


   const onSubmit= (data)=>{
      console.log(data);
   }
   const onSubmit2= (data)=>{
      console.log(data);
   }
  return (
    <StyledFormWrapper>
        <Container>
        <StyledForm onSubmit ={handleSubmit(onSubmit)}> 
            <Select {...register('Adm0')}>
              
               <option defaultValue="Kenya">Kenya</option>
               <option value="Nigeria">Nigeria</option>
               
            </Select>
            <Select {...register('Adm1')}>
               
               <option defaultValue="1">1</option>
               <option value="2">2</option>
               <option value="3">3</option>
               
            </Select>

            <Select {...register('Adm2')}>
               
               <option defaultValue="1">1</option>
               <option value="2">2</option>
               
            </Select>
            <Date>
            
            
            <StyledButton type="submit">Geometry</StyledButton>
            </Date>
         </StyledForm>

        </Container>

        <Container>
         <StyledForm onSubmit ={handleSubmit(onSubmit2)}>

            <Select {...register('Platform')}>
               <option defaultValue="" hidden>Plaform</option>
               <option value="Sentinel">Sentinel</option>
               <option value="Landsat">Landsat</option>
      
            </Select>
            <Select {...register('Sensor')}>
               <option defaultValue="" hidden>Sensor</option>
               <option value="Sentinel-1">Sentinel-1</option>
               <option value="Sentinel-2">Sentinel-2</option>
               <option value="Landsat-8">Landsat-8</option>
               
            </Select>

            <Select {...register('Product')}>
               <option defaultValue="" hidden>Product</option>
               <option value="NDVI">NDVI</option>
               <option value="NDMI">NDMI</option>
               
            </Select>
           
            <Date>
            
            <input label= 'Start-Date' type="date" {...register('Start-date')} onChange={e=>setStartDate(e.target.value)}/>
            <input label= 'Start-Date' type="date" {...register('End-date')} onChange={e=>setEndDate(e.target.value)}/>
            <StyledButton type="submit">Compute</StyledButton>
            </Date>
         </StyledForm>
      
        </Container>
      </StyledFormWrapper>
  )
}

export default Form