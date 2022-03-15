import { StyledSide } from './styles/SideBar.styled'

import Chart from './Chart'
import Logo from './Logo'
import { Container } from './styles/Container.styled'
import React, { useState, useEffect, useRef } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';


const SideBarMenu = ({ADM1Geojson, adm3RsData}) => {
  const [map, setMap] = useState();
  const mapElement = useRef();
  const mapRef = useRef();
  mapRef.current = map;

  useEffect(() => {
    const initialMap = new Map({
      target: mapElement.current,
        layers: [
            new TileLayer({
                source: new OSM(),
            }),
        ],
        view: new View({
            center: [0.804121,35.501888],
            zoom: 5,
        }),
    });
    setMap(initialMap);
}, []);
 
  return (
    <>
    
    
    <StyledSide>
      <Container>
    <Logo/>
    </Container>
      <Chart/>
      
      <div style={{height:'100vh',width:'100%'}} ref={mapElement}></div>
      
    </StyledSide>
    
    </>
  )
}

export default SideBarMenu