import { StyledSide } from './styles/SideBar.styled'

import Chart from './Chart'
import Logo from './Logo'
import { Container } from './styles/Container.styled'
import React, { useState, useEffect, useRef } from 'react';
import Map from 'react-map-gl';
import mapboxgl from 'mapbox-gl'; 



const SideBarMenu = ({ADM1Geojson, adm3RsData,mapRef}) => {
  


  
  return (
    <>
    
    
    <StyledSide>
      <Container>
    <Logo/>
    </Container>
      <Chart/>
      
  
      
    </StyledSide>
    
    </>
  )
}

export default SideBarMenu