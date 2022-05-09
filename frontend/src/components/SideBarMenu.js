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
    const [Crops, setCrops] = useState([])
    // array of crop stages 
    // const [CropStages, setCropStages] = useState(['Emergence', 'Maturity', 'Harvesting'])

    const [CropSelected, setCropSelected] = useState('')
    const [CropStageSelected, setCropStageSelected] = useState('')
    const [country, setcountry] = useState('Kenya')
    const [cropCalenderData, setcropCalenderData] = useState({})

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
        
        setCrops(CroplistFromServer['Crops'])
        
      }
    
      getCroplist()

    
      
   
     }, [country])

     useEffect(() => {
         // get crop calenda json from backend for selected crop
      if (CropSelected){
        const getCropCalendaData = async () =>{
          const CropCalendaFromServer = await fetchCropCalendaData(cropCalenderUrl+'getCrops/?country='+country+'&crop='+CropSelected)
          
          setcropCalenderData(CropCalendaFromServer['CropCalendaData'])
          // console.log('cal', CropSelected,cropCalenderData)

        }
        getCropCalendaData()
      }

     }, [CropSelected])

  

 


    
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

      const humanReadableDateProcesor = (time)=> {
        // this funtion is specific for Crop health analysis time conversion
        if (time !=='SeasonNDVI' && time !== 'SeasonNDMI'){
          var date = new Date(time);
            
          var Day = date.getDate().toString().length ==2 ? date.getDate() : `0${date.getDate()}`
  
  
          var year = date.getFullYear()
          var month = date.getMonth() + 1
          var formatedMonth = month.toString().length ==2 ? month : `0${month}`
          // console.log(date, month,Day, 'y', year)
  
          
          //template string
  
          // var actualDate = `${Day}-${formatedMonth}-${year}`
          var actualDate = `${year}-${formatedMonth}-${Day}`
  
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
// cross check crop calenda data with what is gotten from the computation 
function Dateconverter(date){
  const newDate = new Date(date)
  return newDate
  }

  function cropCondition(period,ndvi){
    var condition = ''
    if (period == 'Emergence'){
      if (ndvi> 0.1 && ndvi<=0.2){
        condition = 'Average'
      }
      if(ndvi>0.2){
        condition = 'Good'
        // console.log(period)
      }else if (ndvi<0.1){
        condition = 'Affected'
      }
    }
    if (period == 'Maturity'){
      if(ndvi> 0.2 && ndvi<0.3){
        condition = 'Average'

      }
      if (ndvi< 0.2){
        condition = 'Affected'
      }else if (ndvi> 0.3) {
        condition = 'Good'
      }

    }

    if (period == 'Harvest'){
      if (ndvi < 0.2){
        condition = 'Low Yield'
      }
      if (ndvi>=0.2 && ndvi <=0.4){
        condition = 'Good Yield'

      }else {
        condition = ' Good Yield expected'
      }
    }

    return condition

  }
  // var test = cropCondition('Emergence', 0.4)
  // console.log(test)
function handleDate(cropCalendaDate, Date){

  console.log(Date,' imput Date')
  //this function handles the crop calenda dates and dynamically assigns the year to crop calenda
  var currrentYear = Date.slice(0,4);
  var cropCalendaMonthDay = cropCalendaDate.slice(4, 10)

  var adjustedCalendaDate = currrentYear+cropCalendaMonthDay
  // console.log(adjustedCalendaDate)

  return adjustedCalendaDate

}

// var test = handleDate(cropCalenderData['Emergence'][0],'2023-03-01')
// console.log(test)
function CropCalendaRestructure(calenda, data){
var Restructured = []
var Emergence = {'index':[], 'date':[], 'period':'Emergence'}
var Maturity = {'index':[], 'date':[], 'period':'Maturity'}
var Harvest = {'index':[], 'date':[], 'period':'Harvest'}
// console.log(data)

data.map((item)=>{

  // if (item.Time !== 'SeasonNDVI'){
    var date = humanReadableDateProcesor(item.Time)
    if (date ){
      console.log(date, 'date')
    
    
    if (Dateconverter(humanReadableDateProcesor(item.Time))  >=   Dateconverter(handleDate(cropCalenderData['Emergence'][0],date))
      // Dateconverter(humanReadableDateProcesor(item.Time)) 
    && Dateconverter(humanReadableDateProcesor(item.Time)) <= Dateconverter(handleDate(cropCalenderData['Emergence'][1],date))){
      // console.log(humanReadableDateProcesor(item.Time))

      Emergence['index'].push(item.NDVI)
      Emergence['date'].push(humanReadableDateProcesor(item.Time))

      
     

  
    

  }
  if (Dateconverter(humanReadableDateProcesor(item.Time))  >= Dateconverter(handleDate(cropCalenderData['Maturity'][0],date))
  
  && Dateconverter(humanReadableDateProcesor(item.Time)) <= Dateconverter(handleDate(cropCalenderData['Maturity'][1],date))){
    // console.log(humanReadableDateProcesor(item.Time), 'Mat')

    Maturity['index'].push(item.NDVI)
    Maturity['date'].push(humanReadableDateProcesor(item.Time))

}

if (Dateconverter(humanReadableDateProcesor(item.Time))  >= Dateconverter(handleDate(cropCalenderData['Harvest'][0],date)) 
&& Dateconverter(humanReadableDateProcesor(item.Time)) <= Dateconverter(handleDate(cropCalenderData['Harvest'][1],date))){
  // console.log(humanReadableDateProcesor(item.Time), 'H')

  Harvest['index'].push(item.NDVI)
  Harvest['date'].push(humanReadableDateProcesor(item.Time))

  
 




}

  
 

  if (Dateconverter(humanReadableDate(item.Time)) >= Dateconverter(calenda['Emergence'][0]) && Dateconverter(humanReadableDate(item.Time)) 
  <= Dateconverter(calenda['Emergence'][1])){
    var indexValues = []
    Restructured.push(item.NDVI)

   

  }}

})
// console.log(Dateconverter(calenda['Emergence'][0]), 'cal')
var output = [Emergence, Maturity, Harvest]

output.map((item)=>{
  if (item.index.length != 0)
 var period = item.period
 var dates = [item.date[0], item.date.slice(-1)]
//  var indextest = item.index
 var avarage_index = item.index.reduce((a, b) => a + b, 0) / item.index.length
 var crop_condition = cropCondition(period,avarage_index)
//  console.log(period,crop_condition, 'y', item.date.slice(-1))

 var output = [dates[0], dates[1][0],period,crop_condition]

 Restructured.push(output)

})

return Restructured

}

// Track changes on crop selcetion 

const cropChanges =(e) => {
  let newValue = e.target.value;
  setCropSelected(newValue);
  console.log(CropSelected, 'crop sele')
  
  const getCropCalendaData = async () =>{
    const CropCalendaFromServer = await fetchCropCalendaData(cropCalenderUrl+'getCrops/?country='+country+'&crop='+newValue)
    
    setcropCalenderData(CropCalendaFromServer['CropCalendaData'])
    // console.log('cal', newValue,cropCalenderData, CropCalendaFromServer)

    const testlogic = CropCalendaRestructure(CropCalendaFromServer['CropCalendaData'],adm1RsData.time_series)
    console.log(testlogic)
    setNdviData(testlogic)




  }
  getCropCalendaData()
  
  }

  // Track changes on stage selcetion 

const ImageDateChanges =(e) => {
  let newValue = e.target.value;
  
  setCropStageSelected(newValue);
  // console.log(CropStageSelected)

  
  
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
       
      <select  onChange={ImageDateChanges}>
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