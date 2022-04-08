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


<style>
 
 
 </style>
 
const SideBarMenu = ({ADM1Geojson, adm1RsData,mapRef, showimage,productSelected}) => {


  // var it = ["cat","dog","chicken","pig"].sort().reduce(
  //   (acc, item, i, arr) => acc.concat(
  //     arr.slice(i + 1).map(_item => [item, _item])
  //   ),
  // [])
  // console.log(it)


  

  const NdviData = [
    {
        "Time": 1617264611524,
        "NDVI": 0.4804017856942116
    },
    {
        "Time": 1617264608338,
        "NDVI": 0.48811391852795977
    }]


    
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
      if (time ==="SeasonNDMI"){
        actualDate = "Period Average"
      }
      
        

        return actualDate
      }



  const DateData = (Array) => {
    const tableData = Array.map((item) =>{
      // console.log(item.Time)
      return (

        
        
        <td>{humanReadableDate(item.Time)}</td>
        
       
      )
    })

    // const dynamicdata = adm1RsData.time_series

    // dynamicdata.map((data) => data.Time)

    return tableData

  }

  


  
  return (
    <>
    
    
    <StyledSide>
      <Container>
    <Logo/>
    </Container>
      <Chart adm1RsData={adm1RsData} showimage={showimage} productSelected={productSelected}/>
      <div className='Table'>
     <table>
       <tr>
         <th>StartDate</th>
         <th>EndDate</th>
         <th>Stage</th>
         <th>Crop Condition</th>
       </tr>
       <tr>
         {DateData(NdviData)}
         <td>Emergence</td>
         <td>Average</td>

         {/* <td>Test</td> */}
         {/* <td>Test</td> */}
         
       </tr>
     </table>
      </div>
      
     
      
        
      
  
      
    </StyledSide>
    
    </>
  )
}

export default SideBarMenu