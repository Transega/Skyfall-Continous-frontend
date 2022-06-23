import { StyledCard } from './styles/Card.styled'
import MapDeck from './Map'
import Form from './Form'
import SideBarMenu from './SideBarMenu'
import { Container } from './styles/Container.styled'
import { Flex } from './styles/Flex.styled'
import react,{useState,useRef } from 'react'
import LoadingSpinner from './Spinner'

import LoadingSpinner2 from './spiner2'

export default function Card({adm0Array}) {


  const [ADM1Geojson, setADM1Geojson] = useState({})
  const [ADM2Geojson, setADM2Geojson] = useState({})
  const [ADM3Geojson, setADM3Geojson] = useState({})

  const mapRef = useRef();

  const [adm1RsData, setadm1RsData] = useState({})
  const [adm2RsData, setadm2RsData] = useState({})
  const [adm3RsData, setadm3RsData] = useState({})
  const [myBoundsAdm3,setMyBoundsAdm3] = useState([])
  const [imageCoord, setImageCoord] = useState([])
  const [showimage, setshowimage] = useState(false)
  const [productSelected, setproductSelected] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [Adm0, setAdm0] = useState(null)

  const [adm1Imageurls, setadm1Imageurls] = useState({});
  const [IsLoadingMap, setIsLoadingMap] = useState(false);
  const [SelectedImage, setSelectedImage] = useState("")

  const [Cordinates,setCordinates] = useState([36.543,0.453])



// if (ADM1Geojson.features[0].geometry.coordinates){
//   const coordinates = ADM1Geojson.features[0].geometry.coordinates;
// console.log('selected', coordinates[0][0][0])
// // setCordinates(coordinates[0][0][0])
// // var Cordinates = coordinates[0][0][0]

// }

  const [viewState, setViewState] = useState({
   longitude: Cordinates[0],
    latitude: Cordinates[1],
    zoom: 6
})

  return (
    <Container>
          <Flex>

    {isLoading ? <LoadingSpinner2 />: <SideBarMenu ADM1Geojson ={ADM1Geojson} adm1RsData= {adm1RsData} mapRef={mapRef} showimage = {showimage}  
    productSelected={productSelected} Adm0={Adm0} adm1Imageurls={adm1Imageurls} setSelectedImage={setSelectedImage}  setIsLoadingMap = {setIsLoadingMap}/>}
    
    <StyledCard layout = "column">
      <Form 
      Adm0= {Adm0}
      setAdm0={setAdm0}

      adm0Array = {adm0Array}
      ADM1Geojson ={ADM1Geojson}
      ADM2Geojson = {ADM2Geojson}
      ADM3Geojson= {ADM3Geojson}
      adm1RsData = {adm1RsData}
      adm2RsData = {adm2RsData}
      adm3RsData = {adm3RsData}

      setADM1Geojson ={setADM1Geojson}
      setADM2Geojson ={setADM2Geojson}
      setADM3Geojson = {setADM3Geojson}
      setadm1RsData = {setadm1RsData}
      setadm2RsData = {setadm2RsData}
      setadm3RsData = {setadm3RsData}
      mapRef ={ mapRef }
      imageCoord = {imageCoord}
      myBoundsAdm3 = {myBoundsAdm3}
      setMyBoundsAdm3 = {setMyBoundsAdm3}
      setshowimage ={setshowimage}
      productSelected={productSelected}
      setproductSelected={setproductSelected}
      setIsLoading={setIsLoading}
      setErrorMessage={setErrorMessage}
      setadm1Imageurls={setadm1Imageurls}
      setIsLoadingMap = {setIsLoadingMap}
      setViewState={setViewState}
      
      />
      {IsLoadingMap ? <LoadingSpinner /> : <MapDeck ADM1Geojson ={ADM1Geojson} 
      mapRef ={ mapRef } 
      ADM2Geojson = {ADM2Geojson} 
      ADM3Geojson = {ADM3Geojson}
      
      imageCoord = {imageCoord}
      myBoundsAdm3 = {myBoundsAdm3}

      adm1RsData ={adm1RsData}
      adm2RsData = {adm2RsData}
      adm3RsData = {adm3RsData}
      showimage ={showimage}
      isLoading={isLoading}
      adm1Imageurls={adm1Imageurls}
      SelectedImage={SelectedImage}
      setIsLoadingMap = {setIsLoadingMap}
      viewState={viewState}
      setViewState={viewState}

      
      />}
      
    </StyledCard>
    </Flex>
    </Container>
  )
}
