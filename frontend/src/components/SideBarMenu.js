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



 
const SideBarMenu = ({ADM1Geojson, adm1RsData,mapRef, showimage,productSelected, Adm0,adm1Imageurls,setSelectedImage, setIsLoadingMap}) => {

 

    const [INdexData, setINdexData] = useState([
    [],
    [],
    [],
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
        const CroplistFromServer = await fetchCropCalendaData(`${cropCalenderUrl}getCrops/?country=${country}`)
        setCrops(CroplistFromServer['Crops'])
      }
    
      getCroplist() 
   
     }, [country, CropSelected])

     useEffect(() => {
         // get crop calenda json from backend for selected crop
      if (CropSelected){
        const getCropCalendaData = async () =>{
          const CropCalendaFromServer = await fetchCropCalendaData(cropCalenderUrl+'getCrops/?country='+country+'&crop='+CropSelected)
          
          setcropCalenderData(CropCalendaFromServer['CropCalendaData'])
          const testlogic = CropCalendaRestructure(CropCalendaFromServer['CropCalendaData'],adm1RsData.time_series)
    
          setINdexData(testlogic)
          // console.log('cal', cropCalenderData, CropCalendaFromServer)

        }
        getCropCalendaData()
      }

     }, [CropSelected,adm1RsData])

  

 


    
     const humanReadableDate = (time)=> {
      if (time !=='Season'+productSelected){
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
      if (time === "Season"+productSelected){
        actualDate = "Period Average"
      }
      if (time ==="SeasonUrl"){
        actualDate = "Period Average"

      }
        

        return actualDate
      }

      const humanReadableDateProcesor = (time)=> {
        // this funtion is specific for Crop health analysis time conversion
        if (time !=='Season'+productSelected){
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
         {/* <td>{item[1]}</td>  */}
         <td>{item[2]}</td> 
         <td>{item[3]}</td>
         <td>{item[4]}</td>
         
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

  // Check for water stress for NDMI product 
  function WaterStress(period,index){
    var condition = ''
    
      if (index< 0 && index< -0){
        condition = 'Severe Drought'
      }
      if (index> 0 && index<0.4){
        condition = 'Moderate Drought'
      }
      if (index> 0.4 && index < 0.8){
        condition = 'No Water Stress'
      
    }

    return condition

  }

  var test1 =  WaterStress('Emegence', 0.1)

  console.log(test1, 'condition test')

  function cropCondition(period,index,Index_name){

    // console.log(Index_name, 'index name ')
    
    var condition = ''
    if (period == 'Emergence'){
      if (index> 0.1 && index<=0.2){
        condition = 'Average'
      }
      if(index>0.2){
        condition = 'Good'
        // console.log(period)
      }else if (index<0.1){
        condition = 'Affected'
      }
    }
    if (period == 'Maturity'){
      if(index> 0.2 && index<0.3){
        condition = 'Average'

      }
      if (index< 0.2){
        condition = 'Affected'
      }else if (index> 0.3) {
        condition = 'Good'
      }

    }

    if (period == 'Harvest'){
      if (index>=0.4){
        condition = 'Not Ready (Good Yield Expected)'
      }
      if (index< 0.2){
        condition = 'Low Yield'
      }
      if (index>=0.2 && index<=0.4){

      } 
      
    }

    return condition

  }
  // var test = cropCondition('Emergence', 0.4, 'NDVI')
  // console.log(test)
function handleDate(cropCalendaDate, Date){

  // console.log(cropCalendaDate,' imput Date')
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
var Emergence = {'index':[], 'date':[], 'period':'Emergence', 'Area':[]}
var Maturity = {'index':[], 'date':[], 'period':'Maturity', 'Area':[]}
var Harvest = {'index':[], 'date':[], 'period':'Harvest', 'Area':[]}
// console.log(data)

data.map((item)=>{

  // if (item.Time !== 'SeasonNDVI'){
    var date = humanReadableDateProcesor(item.Time)
    if (date ){
      // console.log(date, 'date')
      // console.log(cropCalenderData, 'crop calenda data')
    
    
    if (Dateconverter(humanReadableDateProcesor(item.Time))  >=   Dateconverter(handleDate(calenda['Emergence'][0],date))
      // Dateconverter(humanReadableDateProcesor(item.Time)) 
      
    && Dateconverter(humanReadableDateProcesor(item.Time)) <= Dateconverter(handleDate(calenda['Emergence'][1],date))){
      // console.log(productSelected)
      
      Emergence['index'].push(item[productSelected])
      Emergence['Area'].push(item['Area_Ha'])
      Emergence['date'].push(humanReadableDateProcesor(item.Time))
        

  }
  if (Dateconverter(humanReadableDateProcesor(item.Time))  >= Dateconverter(handleDate(calenda['Maturity'][0],date))
  
  && Dateconverter(humanReadableDateProcesor(item.Time)) <= Dateconverter(handleDate(calenda['Maturity'][1],date))){
    // console.log(humanReadableDateProcesor(item.Time), 'Mat')

    Maturity['index'].push(item[productSelected])
    Maturity['Area'].push(item['Area_Ha'])
    Maturity['date'].push(humanReadableDateProcesor(item.Time))

}

if (Dateconverter(humanReadableDateProcesor(item.Time))  >= Dateconverter(handleDate(calenda['Harvest'][0],date)) 
&& Dateconverter(humanReadableDateProcesor(item.Time)) <= Dateconverter(handleDate(calenda['Harvest'][1],date))){
  // console.log(humanReadableDateProcesor(item.Time), 'H')

  Harvest['index'].push(item[productSelected])
  Harvest['Area'].push(item['Area_Ha'])
  Harvest['date'].push(humanReadableDateProcesor(item.Time))


}
}

})
// console.log(Dateconverter(calenda['Emergence'][0]), 'cal')
var output = [Emergence, Maturity, Harvest]

output.map((item)=>{
  if (item.index.length != 0)
 var period = item.period
 var dates = [item.date[0], item.date.slice(-1)]
//  var indextest = item.index
// avarage value per period
 var avarage_index = item.index.reduce((a, b) => a + b, 0) / item.index.length


 var crop_condition = cropCondition(period,avarage_index, productSelected)

 // test for crop condition each date
 var new_output_array = []

 item.index.forEach((index_value,date_value)=>{
   const date = item.date[date_value]
   const area_ha = item['Area'][date_value]
   console.log(date_value,'date test', area_ha, 'area')

  //  console.log('date',date, 'index', index_value)
   var crop_condition_each_date = cropCondition(period,index_value, productSelected)
   if (productSelected =='NDMI'){
     crop_condition_each_date = WaterStress(period, index_value)
   }
   new_output_array = [date, date,period,crop_condition_each_date,area_ha]

   console.log('new',new_output_array,index_value, productSelected)
   Restructured.push(new_output_array)

 })


// var selected_prod = productSelected

//  var output = [dates[0], dates[1][0],period,crop_condition]



//  if (dates[1].length !== 0){
//   // Restructured.push(output)
//   // console.log(dates, 'cond')
//  }

 

})

console.log(Restructured)

return Restructured

}

// Track changes on crop selcetion 

const cropChanges =(e) => {
  let newValue = e.target.value;
  console.log(newValue, 'crop actual')
  setCropSelected(newValue);
  console.log(CropSelected, 'crop state')
  
  const getCropCalendaData = async () =>{
    const CropCalendaFromServer = await fetchCropCalendaData(cropCalenderUrl+'getCrops/?country='+country+'&crop='+newValue)
    
    setcropCalenderData(CropCalendaFromServer['CropCalendaData'])
    // console.log('cal', cropCalenderUrl+'getCrops/?country='+country+'&crop='+newValue)

    // console.log(CropCalendaFromServer, 'data')
    
// crop health and water stress logic by calling the CropCalendaRestructure 
    const testlogic = CropCalendaRestructure(CropCalendaFromServer['CropCalendaData'],adm1RsData.time_series)
    
    setINdexData(testlogic)




  }
  getCropCalendaData()
  
  }

  // Track image changes 
  const set_loading = () =>{
    setIsLoadingMap(false);

  }

const ImageDateChanges =(e) => {
  let newValue = e.target.value;
  setIsLoadingMap(true);

  setSelectedImage(newValue);

  setTimeout( function() { set_loading(); }, 1000);
  
  
  

  // console.log(newValue,'selected Image')

  
  
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
              {Object.keys(adm1RsData).length !== 0 ? imageoptions(adm1Imageurls['image_url']) : <></>} 
      </select>
      </div> 
      
    {/* <table></table> */}
    
     <table>
       <tr>
         <th>Date</th>
         {/* <th>EndDate</th> */}
         <th>Stage</th>
         <th>Crop Condition</th>
         <th>Area Ha</th>
       </tr>
      
         {DateData(INdexData)}
        
         
     
     </table> 
      </div>
      
     
      
        
      
  
      
    </StyledSide>
    
    </>
  )
}

export default SideBarMenu