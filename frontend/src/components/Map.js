import React,{useState, useEffect} from 'react';
import Map, {Marker,Source, Layer} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl'; 
//import * as mapboxgl from 'mapbox-gl';

const MAPBOX_TOKEN = "pk.eyJ1Ijoia29yeWtvcmlyMTIzIiwiYSI6ImNsMGdqcjdybTEzcTczanBybHU5anN6bnUifQ.rIUBT4fmSIwMuwN_vtUznw"


function MapDeck({
  ADM1Geojson,
  ADM2Geojson,
  ADM3Geojson,
  mapRef,
  adm1RsData ,
  adm2RsData ,
  adm3RsData ,
  imageCoord,
  myBoundsAdm3
   

}){



    const [viewState, setViewState] = useState({
        longitude: 36.543,
        latitude: 0.453,
        zoom: 10
    })

    // console.log(ADM1Geojson);
    const Rasterlayers =
      {
        id: "r_tiles",
        type: "raster",
        source: 'ras_data',
        paint :{}
      }
    

    const layerStyle = {
      id: 'point',
      type: "fill",
      paint: {
      "fill-color": "rgb(5, 30, 52)",
      "fill-opacity": 0.5,
    }
    };


    
  

    

  return (

    <Map ref={mapRef}
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      <Source id="my-data" type="geojson" data={ADM1Geojson}>
        <Layer {...layerStyle} />
      </Source>
      <Source id="my-data" type="geojson" data={ADM2Geojson}>
        <Layer {...layerStyle} />
      </Source>
      <Source id="my-data" type="geojson" data={ADM3Geojson}>
        <Layer {...layerStyle} />
      </Source>
      
      <Source
      id ="wms_source"
      type = "raster"
      tiles ={['https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/maps/2e5b1b6e3fbfa32214e0f93ae8398ee2-370b0b907ece9172d0b7058cbcff24e0/tiles/{z}/{x}/{y}'
    ]}
      tileSize ={256}>
        <Layer 
        id= "ras_id"
        type ="raster"
        source ="wms_source"
        />
      </Source>
  
      
      

        
      
    </Map>
  )
}

export default MapDeck