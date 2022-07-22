import React,{useState, useEffect} from 'react';
import Map, {Marker,Source, Layer} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

// @ts-ignore
    // eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const MAPBOX_TOKEN = "pk.eyJ1Ijoia29yeWtvcmlyMTIzIiwiYSI6ImNsMGdqcjdybTEzcTczanBybHU5anN6bnUifQ.rIUBT4fmSIwMuwN_vtUznw"



function MapDeck({ADM1Geojson,ADM2Geojson,ADM3Geojson,mapRef, adm1RsData,adm2RsData,adm3RsData,showimage,isLoading,adm1Imageurls,SelectedImage,setIsLoadingMap,viewState, setViewState}){

  const [viewState1, setViewState1] = useState({
    longitude: 36.543,
    latitude: 0.453,
    zoom: 7
})

if (isLoading){

  const coordinates = ADM1Geojson.features[0].geometry.coordinates;
// console.log('selected', coordinates[0][0][0])
// setCordinates(coordinates[0][0][0])
var Cordinates = coordinates[0][0][0]

// setViewState1({
//   longitude: Cordinates[0],
//     latitude: Cordinates[1],
//     zoom: 6
// })

}




// if (ADM1Geojson.features[0].geometry.coordinates){
//   const coordinates = ADM1Geojson.features[0].geometry.coordinates;
// console.log('selected', coordinates[0][0][0])
// // setCordinates(coordinates[0][0][0])
// // var Cordinates = coordinates[0][0][0]

// }


const [Image_on_Map, setImage_on_Map] = useState([])



 

  

    // console.log(ADM1Geojson);

    const layerStyle = {
      id: 'point',
      type: "fill",
      paint: {
      "fill-color": "rgb(5, 30, 52)",
      "fill-opacity": 0.5,
    }
    };
    
    const add_Image_url = () => {

    

   

    

      
      
      if (showimage === true) {

        var url = [adm1Imageurls.image_url[0]['imageurl']]

      const change_url_link = (data)=>{
        url = data
        return url
        
      }
      setTimeout( function() { change_url_link(adm1Imageurls.image_url[0]['imageurl']); }, 10000);

      if (SelectedImage){
        // setIsLoadingMap(false)
        
       
      
   
        
        url = [SelectedImage];

        
        
      }

        //  console.log([adm1Imageurls.image_url[0]['imageurl']], 'image')
      //   setImage_on_Map([adm1Imageurls.image_url[0]['imageurl']
      // ])
      
      return (

        <Source
        id ="wms_source"
        type = "raster"
        tiles ={url}
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
      {...viewState1}
      onMove={evt => setViewState1(evt.viewState1)}
      
      mapStyle="mapbox://styles/mapbox/satellite-v9"//"mapbox://styles/mapbox/streets-v9"
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
      {add_Image_url()}
      {setTimeout(() => {
        console.log('Hello Timeout!')
        
        return add_Image_url()
     }, 1000)}

        
      {/* <Marker longitude={36.543} latitude={0.453} color="red" /> */}


    </Map>
  )
}

export default MapDeck