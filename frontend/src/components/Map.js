import React,{useState} from 'react';
import Map, {Marker,Source, Layer} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = "pk.eyJ1Ijoia29yeWtvcmlyMTIzIiwiYSI6ImNsMGdqcjdybTEzcTczanBybHU5anN6bnUifQ.rIUBT4fmSIwMuwN_vtUznw"


function MapDeck(){

    const [viewState, setViewState] = useState({
        longitude: 36.543,
        latitude: 0.453,
        zoom: 10
    })
  return (

    <Map
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
        <Source 
        id='testSource' 
        type='raster' 
        tiles={["mapbox://styles/korykorir123/cl0hzgbrv000515o9adccekbk"]} 
        tileSize={256}>
        
        
        <Layer 
            id ='simple-tiles'
            type = 'raster'
            source = 'raster-tiles'
            minzoom ={0} 
            maxzoom =  {22 }
            />
       </Source>

        
      <Marker longitude={36.543} latitude={0.453} color="red" />
    </Map>
  )
}

export default MapDeck