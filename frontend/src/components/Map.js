import React,{useState} from 'react';
import Map, {Marker,Source, Layer} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

// @ts-ignore
    // eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const MAPBOX_TOKEN = "pk.eyJ1Ijoia29yeWtvcmlyMTIzIiwiYSI6ImNsMGdqcjdybTEzcTczanBybHU5anN6bnUifQ.rIUBT4fmSIwMuwN_vtUznw"


function MapDeck({ADM1Geojson,ADM2Geojson,ADM3Geojson,mapRef, adm1RsData,adm2RsData,adm3RsData,showimage}){

 

    const [viewState, setViewState] = useState({
        longitude: 36.543,
        latitude: 0.453,
        zoom: 10
    })

    // console.log(ADM1Geojson);

    const layerStyle = {
      id: 'point',
      type: "fill",
      paint: {
      "fill-color": "rgb(5, 30, 52)",
      "fill-opacity": 0.5,
    }
    };
    
    const test = () => {

      
      
      if (showimage === true) {
        console.log(adm1RsData.image_url, 'rsdata')
      return (

        <Source
        id ="wms_source"
        type = "raster"
        tiles ={[adm1RsData.image_url
        ]}
        tileSize ={256}>
          <Layer 
          id= "ras_id"
          type ="raster"
          source ="wms_source"
          />
      </Source>

      )}
    }
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
      </Source >
      
      {/* <Source> </Source> */}
      {test()}

        
      <Marker longitude={36.543} latitude={0.453} color="red" />


    </Map>
  )
}

export default MapDeck