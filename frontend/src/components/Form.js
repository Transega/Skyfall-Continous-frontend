import React,{useState,useEffect} from 'react'
import { Select, StyledFormWrapper,StyledButton, StyledForm,Date} from './styles/Form.styled'

import { Container } from './styles/Container.styled'
import 'react-datepicker/dist/react-datepicker.css'

import {useForm}   from 'react-hook-form';

// import React from 'react'
//  urls 
const baseurlshp = 'http://149.28.234.94:8080'
const adm2Namesurl = baseurlshp+'/countiesFacilities/get_adm1_shapefile/?Get_sub_counties_names='

const Form = ({adm0Array}) => {
   const options = adm0Array.map((item) => {
      return (
         <option key={item} value={item}> 
         {item}
         </option>
      )
   })
   // set lists for admin levels selection and update using useState
   const [adm1Array, setadm1Array] = useState([])
   const [adm2Array, setadm2Array] = useState([])


   const optionsAdm1 = adm1Array.map((item) => {
      return (
         <option key={item} value={item}> 
         {item}
         </option>
      )
   })

   const optionsAdm2 = adm2Array.map((item) => {
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
   const [Adm1, setAdm1] = useState('Baringo')


   const onSubmit= (data)=>{
      console.log(data);
   }
   const onSubmit2= (data)=>{
      console.log(data);
   }
// track chnages for user selection on Adm0
   const onAdm0Chnage = (e) => {
      setAdm0(e.target.value)
      console.log(Adm0, 'adm0..')
    }

   // track chnages for user selection on Adm1 and perform some tasks

 const onAdm1Chnage = (e) => {
      setAdm1(e.target.value)
      console.log(Adm1, 'admi1 selected..')
      // const subcountyList = getDatasets(adm2Namesurl+Adm1)
      // setadm2Array(subcountyList['sub_counties'])
      

    }

    useEffect(()=> {
      const getAdm2 = async () => {
        const subcountyList = await fetchData(adm2Namesurl+Adm1)
        setadm2Array(subcountyList['sub_counties'][0])
      }
   
       getAdm2()
     }, [])



// Use effect to update list of counties 

// const getDatasets = function (url){
//    const datafromserver =  fetchData(url)
//    console.log(datafromserver)
   
// return datafromserver
//   }

useEffect(()=> {
   const getAdm1 = async () => {
     const Adm1fromsever = await fetchAdm1()
     setadm1Array(Adm1fromsever['counties'])
   }

    getAdm1()
  }, [])

  // use effect to fetch other datasets from server 

  

      // fetch data  from server 
      // admin 1
  const fetchAdm1 = async () => {
   const res = await fetch(baseurlshp+'/countiesFacilities/get_adm1_shapefile/?county_names=ALL')
   const data = await res.json()
   
   
   return data  
 }

 // fetch data adm2 

 const fetchData = async (url) => {
    const res = await fetch(url)
    const data = await res.json()

    console.log(data)

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
       <Select {...register('Adm1')} onChange={onAdm1Chnage}>
          
          <option defaultValue="Adm1">Adm1</option>
          <option value={optionsAdm1.value}>{optionsAdm1.value}</option>
          console.log({optionsAdm1})
          
       </Select>

       <Select {...register('Adm2')}>
          
          <option defaultValue="1">1</option>
          <option value={optionsAdm2.value}>{optionsAdm2.value}</option>
          console.log({optionsAdm2})
          
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
