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
 
const SideBarMenu = ({ADM1Geojson, adm1RsData,mapRef, showimage}) => {

  


  
  return (
    <>
    
    
    <StyledSide>
      <Container>
    <Logo/>
    </Container>
      <Chart adm1RsData={adm1RsData} showimage={showimage}/>
      <div className='Table'>
     <table>
       <tr>
         <th>Date</th>
         <th>Stage</th>
         <th>Condition</th>
       </tr>
       <tr>
         <td>2022-01-01</td>
         <td>Emergence</td>
         <td>Good</td>
         
       </tr>
     </table>
      </div>
      
     
      
        
      
  
      
    </StyledSide>
    
    </>
  )
}

export default SideBarMenu