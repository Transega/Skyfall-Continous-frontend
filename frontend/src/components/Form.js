import React,{useState,useEffect} from 'react'
import { Select, StyledFormWrapper,StyledButton, StyledForm,Date} from './styles/Form.styled'

import { Container } from './styles/Container.styled'
import 'react-datepicker/dist/react-datepicker.css'

import {useForm}   from 'react-hook-form';

// import React from 'react'

const Form = ({adm0Array}) => {
   const options = adm0Array.map((item) => {
      return (
         <option key={item} value={item}> 
         {item}
         </option>
      )
   })
   const [adm1Array, setadm1Array] = useState([])
   const optionsAdm1 = adm1Array.map((item) => {
      return (
         <option key={item} value={item}> 
         {item}
         </option>
      )
   })

   

   const { register, handleSubmit } = useForm();
   const [StartDate, setStartDate] = useState('2020-03-12');
   const [EndDate, setEndDate] = useState('2020-03-12');
   const [Adm0, setAdm0] = useState('')


   const onSubmit= (data)=>{
      console.log(data);
   }
   const onSubmit2= (data)=>{
      console.log(data);
   }

   const onAdm0Chnage = (e) => {
      setAdm0(e.target.value)
      console.log(Adm0, 'adm0..')
    }

// Use effect to update list of counties 

useEffect(()=> {
   const getAdm1 = async () => {
     const Adm1fromsever = await fetchAdm1()
     setadm1Array(Adm1fromsever['counties'])
   }

    getAdm1()
  }, [])

      // fetch data  from server 
  const fetchAdm1 = async () => {
   const res = await fetch('http://149.28.234.94:8080/countiesFacilities/get_adm1_shapefile/?county_names=ALL')
   const data = await res.json()
   
   return data  
 }
      
  return (
   <StyledFormWrapper>
   <Container>
   <StyledForm> 
       <Select {...register('Adm0')} 
       onChange={onAdm0Chnage}>
       <option value="" hidden>Adm0</option>
          <option value={options}>{options.value} 
          </option>
          console.log({options})

          
       </Select>
       <Select {...register('Adm1')}>
          
          <option defaultValue="Adm1">Adm1</option>
          <option value={optionsAdm1.value}>{optionsAdm1.value}</option>
          console.log({optionsAdm1})
          
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
