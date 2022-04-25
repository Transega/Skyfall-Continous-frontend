import { StyledSide } from './styles/SideBar.styled'

import Chart from './Chart'
import Logo from './Logo'
import { Container } from './styles/Container.styled'
import React, { useState, useEffect, useRef } from 'react';
import Map from 'react-map-gl';
import mapboxgl from 'mapbox-gl'; 
import customtable from './customtable';
// import table from '.styles/table.css'

import customstyle from './styles/table.css'
import cropSelection from './cropSelection';



 
const SideBarMenu = ({ADM1Geojson, adm1RsData,mapRef, showimage,productSelected, Adm0}) => {

  // const [NdviData, setNdviData] = useState([
  //   {
  //       "Time": 1617264611524,
  //       "NDVI": 0.4804017856942116
  //   },
  //   {
  //       "Time": 1617264608338,
  //       "NDVI": 0.48811391852795977
  //   }]) 

    const [NdviData, setNdviData] = useState([
    ['2021-03-01', '2021-04-30', 'Emergence', 'Good'],
    ['2021-05-01', '2023-08-30', 'Maturity', 'Average'],
    ['2021-09-01', '2021-10-31', 'Harvest', 'Average'],
    ]) 


    // array of crops 
    const [Crops, SetCrops] = useState([])
    // array of crop stages 
    const [CropStages, setCropStages] = useState(['Emergence', 'Maturity', 'Harvesting'])

    const [CropSelected, setCropSelected] = useState('')
    const [CropStageSelected, setCropStageSelected] = useState('')
    const [country, setcountry] = useState('Kenya')

    const cropCalenderUrl = 'http://208.85.21.253:8080/CropCalenderApi/'
    

   
    
   

  // fecth crop list 
  // cropCalenderUrl+'getCrops/?country='+country
  const fetchCropCalendaData = async (url) => {
    const res = await fetch(url)
    const data = await res.json()
    return data  
  }


   useEffect(()=> {
   
      const getCroplist = async () =>{
        const CroplistFromServer = await fetchCropCalendaData(cropCalenderUrl+'getCrops/?country='+country)
        
        SetCrops(CroplistFromServer['Crops'])
        
      }
      getCroplist()

    
      
   
     }, [])

  

 


    
     const humanReadableDate = (time)=> {
      if (time !=='SeasonNDVI'){
        var date = new Date(time);
          
        var Day = date.getDate().toString().length ==2 ? date.getDate() : `0${date.getDate()}`


        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var formatedMonth = month.toString().length ==2 ? month : `0${month}`
        // console.log(date, month,Day, 'y', year)

        
        //template string

        var actualDate = `${Day}-${formatedMonth}-${year}`

      } else {
        actualDate = "Period Average"
      }
      if (time === "SeasonNDMI"){
        actualDate = "Period Average"
      }
      if (time ==="SeasonUrl"){
        actualDate = "Period Average"

      }
        

        return actualDate
      }



  const DateData = (Array) => {
    const tableData = Array.map((item) =>{
    //  const test = item.map((data)=>{

        
      if (Object.keys(adm1RsData).length !== 0 && CropSelected){
        // NdviData = adm1RsData.time_series
        

      return (

        
        
       
         <tr>
         
          <td>{item[0]}</td>
         <td>{item[1]}</td> 
         <td>{item[2]}</td> 
         <td>{item[3]}</td>
         
       </tr>
      
        
       
      )} 

  
      

    })

    // const dynamicdata = adm1RsData.time_series

    // dynamicdata.map((data) => data.Time)

    return tableData

  }


// Track changes on crop selcetion 

const cropChanges =(e) => {
  let newValue = e.target.value;
  setCropSelected(newValue);
  // console.log(Adm0, 'adm0..')
  
  }

  // Track changes on stage selcetion 

const ImageDateChanges =(e) => {
  let newValue = e.target.value;
  console.log(newValue)
  setCropStageSelected(newValue);

  
  
  }



// iterate over a list of items to provide options to the user for selection 
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

// use this function to change images on the map
const imageoptions = (anArray) =>{
  var opt = anArray.map((item) => {
     return (
        <option key={humanReadableDate(item.Time)} value={item.imageurl}> 
        {humanReadableDate(item.Time)}
        </option>
     )
  })
return opt
  
}

  


  
  return (
    <>
    
    
    <StyledSide>
      <Container>
    <Logo/>
    </Container>
      <Chart adm1RsData={adm1RsData} showimage={showimage} productSelected={productSelected}/>
      
      <div className='Table'>
      <div className='Crop-health'> 
      <select onChange={cropChanges}>
                <option defaultValue="" hidden>Crop</option>
                {Object.keys(adm1RsData).length !== 0 ? customoptions(Crops) : <></>}
               
      </select>
       
      <select onChange={ImageDateChanges}>
                <option defaultValue="" hidden>Date Image</option>
              {Object.keys(adm1RsData).length !== 0 ? imageoptions(adm1RsData['image_url']) : <></>} 
      </select>
      </div> 
      
    {/* <table></table> */}
    
     <table>
       <tr>
         <th>StartDate</th>
         <th>EndDate</th>
         <th>Stage</th>
         <th>Crop</th>
       </tr>
      
         {DateData(NdviData)}
        
         
     
     </table> 
      </div>
      
     
      
        
      
  
      
    </StyledSide>
    
    </>
  )
}

export default SideBarMenu