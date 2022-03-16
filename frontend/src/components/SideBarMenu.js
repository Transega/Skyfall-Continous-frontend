import { StyledSide } from './styles/SideBar.styled'

import Chart from './Chart'
import Logo from './Logo'
import { Container } from './styles/Container.styled'
import React, { useState, useEffect, useRef } from 'react';
import Map from 'react-map-gl';
import mapboxgl from 'mapbox-gl'; 



const SideBarMenu = ({ADM1Geojson, adm1RsData,mapRef, showimage}) => {
  


  
  return (
    <>
    
    
    <StyledSide>
      <Container>
    <Logo/>
    </Container>
      <Chart adm1RsData={adm1RsData} showimage={showimage}/>
      
  
      
    </StyledSide>
    
    </>
  )
}

export default SideBarMenu