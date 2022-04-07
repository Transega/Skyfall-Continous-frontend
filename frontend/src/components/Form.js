import React,{useState,useEffect, useCallback} from 'react'
import { Select, StyledFormWrapper,StyledButton, StyledForm,Date, StyledInput} from './styles/Form.styled'



import { Container } from './styles/Container.styled'
import 'react-datepicker/dist/react-datepicker.css'

import {useForm}   from 'react-hook-form';
import { StyledHeader } from './styles/Header.styled';
import { Nav } from './styles/Header.styled';
import { StyledUl } from './styles/Header.styled';
import bbox from '@turf/bbox';

import axios from 'axios';
// import MapDeck from './Map';

// import Card from './Card';

// import React from 'react'
//  urls 
const baseurlshp = 'http://208.85.21.253:8080/AdminData'
const adm2Namesurl = baseurlshp+'/get_adm2_shapefile/?Get_sub_counties_names='
const adm3Namesurl = baseurlshp+'/get_adm3_shapefile/?Get_wards_in_sub_county='
// urls for geojson data 
const adm1geoJsonurl = baseurlshp+'/get_adm1_shapefile/?Get_county='
const adm2geoJsonurl = baseurlshp+'/get_adm2_shapefile/?sub_county='
const adm3geoJsonurl = baseurlshp+'/get_adm3_shapefile/?GetWardGeojson='

// url for remote sensing data  http://localhost:8100

const rsapiurl = 'http://208.85.21.253:8080/RemotesensingApi/get_rsAdmi1/' 
// const rsapiurl = 'http://localhost:8100/RemotesensingApi/get_rsAdmi1/'


const Form = ({adm0Array, 
   setADM3Geojson, 
   ADM1Geojson, 
   ADM2Geojson,
   ADM3Geojson,
   setADM2Geojson,
   setADM1Geojson,
   mapRef,
   adm1RsData,
   adm2RsData,
   adm3RsData,
   setadm1RsData,
   setadm2RsData,
   setadm3RsData,
   setImageCoord,
   myBoundsAdm3,
   setMyBoundsAdm3,
   setshowimage
}) => {
   const options = adm0Array.map((item) => {
      return (
         <option key={item} value={item}> 
         {item}
         </option>
      )
   })
   // console.log(ADM1Geojson);
   // set lists for admin levels selection and update using useState
   const [adm1Array, setadm1Array] = useState([])
   const [adm2Array, setadm2Array] = useState([])
   const [adm3Array, setadm3Array] = useState([])

// Iterate over the array for admn level names 

   const customoptions = (anArray) =>{
      var opt = anArray.map((item) => {
         return (
            <option key={item} value={item}> 
            {item}
            </option>
         )
      })
   return opt
      
   }
   

  


   const { register, handleSubmit } = useForm();
   const [StartDate, setStartDate] = useState('');
   const [EndDate, setEndDate] = useState('');
   const [Adm0, setAdm0] = useState(null)
   const [Adm1, setAdm1] = useState(null)
   const [Adm2, setAdm2] = useState(null)
   const [Adm3, setAdm3] = useState(null)

 // use state for sensor and product selections
 const [allowedPlatform, setallowedPlatform] = useState(['Landsat', 'Sentinel'])
 const [allowedProducts, setallowedProducts] = useState([])
 const [allowedSensor, setallowedSensor] = useState([])

 const [platformSelected, setplatformSelected] = useState('')
 const [sensorSelected, setsensorSelected] = useState('')
 const [productSelected, setproductSelected] = useState('')

 // use state for remote sensing data from GEE 







 const rsProducts = {
    'Landsat':{
       'L8':['NDVI']
    },

    'Sentinel':{
       'Sentinel_2':['NDVI', 'NDMI']
    }
    
 }

   // use state for Geojson data 



   // use state for Geojson data 

   


 
// track chnages for user selection on Adm0


const onAdm0Chnage =(e) => {
   let oldValue = Adm0;
   // console.log(Adm0, 'adm0..33')
   let newValue = e.target.value;
      setAdm0(newValue);
   // console.log(Adm0, 'adm0..')
   
   }

   
   // track chnages for user selection on Adm1 and perform some tasks
 
const onAdm1Chnage = (e) => {

   
   const newValue = e.target.value;
   setAdm1(newValue)
   // console.log(Adm1, 'admi1 selected..')
  
//   console.log(ADM1Geojson);

   const getSubcountyList = async (Adm1) => {
      const subcountyList = await fetchData(adm2Namesurl+Adm1)
      setadm2Array(subcountyList['sub_counties'])
   }

   getSubcountyList()

    }
// adm2 changes 

const onAdm2Chnage = (e) => {
   setAdm2(e.target.value)
   // console.log('adm2 changed to ', Adm2)

   const getWardList = async () => {
   const wardsList = await fetchData(adm3Namesurl+Adm2)
   setadm3Array(wardsList['Wards'])
}
getWardList()

    }

// adm3 changes 

const onAdm3Chnage = (e) => {
   var adm3Selected = e.target.value
   setAdm3(adm3Selected)
   
}

// platform changes 
const onchangePlatform = (e) => {
   var selectedp = e.target.value
   setplatformSelected(selectedp)
   var sensor = Object.keys(rsProducts[selectedp])
   // console.log(sensor)
   setallowedSensor(sensor)


}

// sensor changes 
const onchangeSensor = (e) => {
   var selectedSensor = e.target.value
   setsensorSelected(selectedSensor)
   var productavailabe = rsProducts[platformSelected][selectedSensor]
   setallowedProducts(productavailabe)
   // console.log(productavailabe, platformSelected,'sensor')
}

// onchange platform 
const onchangeProduct = (e) => {
   var selectedProduct = e.target.value
   setproductSelected(selectedProduct)


}

useEffect(()=> {
   const getAdm2 = async () => {
      try{
   const subcountyList = await fetchData(adm2Namesurl+Adm1)
   setadm2Array(subcountyList['sub_counties'])
   // get shapefile json from server 
   const Adm2GeoJson = await fetchJson(adm2geoJsonurl+Adm2)
   setADM2Geojson(Adm2GeoJson)

   const [minLng, minLat, maxLng, maxLat] = bbox(Adm2GeoJson);

      
   mapRef.current.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat]
      ])

   }catch(error){
      console.log(error);
   }
   
}

   getAdm2()
}, [Adm2,Adm1,setADM2Geojson])



// adm 3  use effect 
useEffect(()=> {
   const getAdm3 = async () => {
      try{
   const wardsList = await fetchData(adm3Namesurl+Adm2)
   setadm3Array(wardsList['Wards'])
   // get shapefile json from server 
   const ADM3Geojson = await fetchJson(adm3geoJsonurl+Adm3)
   // console.log('test')
   setADM3Geojson(ADM3Geojson)

   const [minLng, minLat, maxLng, maxLat] = bbox(ADM3Geojson);

   
   mapRef.current.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat]
      ])

      const myBoundsAdm3 = bbox(ADM3Geojson)

      setMyBoundsAdm3(myBoundsAdm3)
      
   }catch(error){
      console.log(error)
   }
    
   }

   getAdm3()
  }, [Adm2,setADM3Geojson,myBoundsAdm3])

  // use this for admin 3 geojson
  useEffect(()=> {
    
   const getAdm3geojson = async () => {
      try{
        
 
   
   // get shapefile json from server 
   const ADM3Geojson = await fetchJson(adm3geoJsonurl+Adm3)
   // console.log('test')
   setADM3Geojson(ADM3Geojson)
}catch(error){
   console.log(error);
}


   }     

   getAdm3geojson()
  }, [Adm3,setADM3Geojson])

// Use effect to update list of counties 

useEffect(()=> {
   const getAdm1 = async () => {
      try{
   const Adm1fromsever = await fetchAdm1()
   setadm1Array(Adm1fromsever['counties'])
   // get shapefile  json from server 
   const Adm1Json = await fetchJson(adm1geoJsonurl+Adm1)
      
   setADM1Geojson(Adm1Json)

   const [minLng, minLat, maxLng, maxLat] = bbox(Adm1Json);
console.log(bbox(Adm1Json));
   // console.log(mapRef);
   if(bbox(Adm1Json)[0]!=='Infinity'){
   mapRef.current.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat]
      ])}

   }catch(error){
      console.log(error);
} 

}

    getAdm1()
    setshowimage(false)
    

  }, [Adm1])

  
  // use effect to fetch other datasets from server 

  

// Fetch Counties
      
  const fetchAdm1 = async () => {
   const res = await fetch(baseurlshp+'/get_adm1_shapefile/?county_names=ALL')
   const data = await res.json()
   return data  
 }

 // Fetch Wards and Subcounties 

  const fetchData = async (url) => {
   const res = await fetch(url)
   const data = await res.json()

   // console.log(data)

   return data

 }

 // fetch json data for the admn levels
 const fetchJson = async (url) => {
    const res = await fetch(url)
    const data = await res.json()

   //  console.log(data, 'geojson')

    return data
 }

 // fetch Remote sensing data from api

 const fetchRemoteSensingData = async (url) => {

      const res = await axios.get(url)
      
      const data =  res.data

      console.log(data, 'success')
      return data
 }

 const onsubmit = (e) => {
   e.preventDefault()
   // validate selections
      if (!Adm1 & ! Adm1!=='Adm1'){
         alert('please make Admin level selections')
         return
      }

      // platform sensor and product
      if (!platformSelected){
         alert('Please select platform')
      }
      if (!sensorSelected){
         alert('Please select Sensor')
         return
      }
      if (!productSelected){
         alert('Please select product')
         return
      }
      // dates
      if (!StartDate){
         alert('please add start date')
         return
      }
      if (!EndDate){
         alert('please add end date')
         return
      }

      
      // console.log(Adm1,sensorSelected,platformSelected,productSelected)
      const getadm1RsData = async () => {

         // 'http://208.85.21.253:8080/RemotesensingApi/get_rsAdmi1/'
         //  Admin 1 RS data

         
         const adm1RsDataFromserver = await fetchRemoteSensingData(rsapiurl+'?platform='+platformSelected
         +'&sensor='+sensorSelected+'&product='+productSelected+'&start_date='+StartDate+
         '&end_date='+EndDate+'&county='+Adm1)

         console.log('test')
         //  destructure time series
         const {time_series} = adm1RsDataFromserver

         const timedata =  time_series.filter((i)=> i.NDVI !== NaN)
         console.log(timedata)
      

         setadm1RsData(adm1RsDataFromserver)
         
         

         // // Adm 2 RS data
         // const adm2RsDataFromserver = await fetchRemoteSensingData(rsapiurl+'?platform='+platformSelected
         // +'&sensor='+sensorSelected+'&product='+productSelected+'&start_date='+StartDate+
         // '&end_date='+EndDate+'&subcounty='+Adm2)

         // // console.log(adm2RsDataFromserver, 'adm2 rs')
         // setadm2RsData(adm2RsDataFromserver)

         //    // Adm 3 RS data 
         // const adm3RsDataFromserver = await fetchRemoteSensingData(rsapiurl+'?platform='+platformSelected
         // +'&sensor='+sensorSelected+'&product='+productSelected+'&start_date='+StartDate+
         // '&end_date='+EndDate+'&ward='+Adm3)


          
         // setadm3RsData(adm3RsDataFromserver)
         setshowimage(true)
         


      }
      getadm1RsData()
      // setshowimage(false)


 }


 

  return (
     <StyledHeader>
        <Container>
           <Nav>
              <StyledUl>
   <StyledFormWrapper>
      
   <Container>
   <StyledForm> 
       <Select {...register('Adm0')} 
       onChange={onAdm0Chnage}>
       <option value="" hidden>Adm0</option>
         {customoptions(adm0Array)}

          
       </Select>
       <Select {...register('Adm1')} onChange={onAdm1Chnage}>
          
          <option defaultValue="Adm1">Adm1</option>
          {customoptions(adm1Array)}
   
          
       </Select>

       <Select {...register('Adm2')} onChange={onAdm2Chnage}>
          
          <option defaultValue="1">Adm2</option>
         {customoptions(adm2Array)}
         
          
       </Select>
       
       <Select {...register('Adm3')} className='Adm3' onChange={onAdm3Chnage}>
          
          <option defaultValue="ADM3">Adm3</option>
          {customoptions(adm3Array)}
        
          
       </Select>
       
       
       {/* <StyledButton type="submit">Geometry</StyledButton> */}
       
    </StyledForm>

   </Container>

   <Container>
    <StyledForm onSubmit={onsubmit}>
    <StyledInput>
       <Select {...register('Platform')} onChange={onchangePlatform}>
          <option defaultValue="" hidden>Plaform</option>
          {customoptions(allowedPlatform)}
 
       </Select>
       </StyledInput>
       <StyledInput>
       <Select {...register('Sensor')} onChange={onchangeSensor}>
          <option defaultValue="" hidden>Sensor</option>
          {customoptions(allowedSensor)}
         
       </Select>
       </StyledInput>
         <StyledInput>
         
       <Select {...register('Product')} onChange={onchangeProduct}>
          <option defaultValue="" hidden>Product</option>
          {customoptions(allowedProducts)}
          
       </Select>
       </StyledInput>
      
       <Date>
       
   <input label= 'Start-Date' type="date" {...register('Start-date')} onChange={e=>setStartDate(e.target.value)}/>
     <input label= 'Start-Date' type="date" {...register('End-date')} onChange={e=>setEndDate(e.target.value)}/>
       <StyledButton type="submit">Compute</StyledButton>
       </Date>
    </StyledForm>
    {/* <MapDeck/> */}
   
   </Container>
  
 </StyledFormWrapper>
 </StyledUl>
 </Nav>

 </Container>
 
 </StyledHeader>

  )
   
}

export default Form
