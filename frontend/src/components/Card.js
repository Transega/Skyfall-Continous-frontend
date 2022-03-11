import { StyledCard } from './styles/Card.styled'
import MapDeck from './Map'
import Form from './Form'
import SideBarMenu from './SideBarMenu'
import { Container } from './styles/Container.styled'
import { Flex } from './styles/Flex.styled'
import react,{useState,useRef } from 'react'

export default function Card({adm0Array}) {


  const [ADM1Geojson, setADM1Geojson] = useState({})
  const [ADM2Geojson, setADM2Geojson] = useState({})
  const [ADM3Geojson, setADM3Geojson] = useState({})
  const mapRef = useRef();


  return (
    <Container>
          <Flex>
    <SideBarMenu ADM1Geojson ={ADM1Geojson}/>
    <StyledCard layout = "column">
      <Form 
      adm0Array = {adm0Array}
      ADM1Geojson ={ADM1Geojson}
      ADM2Geojson = {ADM2Geojson}
      ADM3Geojson= {ADM3Geojson}
      setADM1Geojson ={setADM1Geojson}
      setADM2Geojson ={setADM2Geojson}
      setADM3Geojson = {setADM3Geojson}
      mapRef ={ mapRef }




      
      
      
      
      />
      <MapDeck ADM1Geojson ={ADM1Geojson} mapRef ={ mapRef } ADM2Geojson = {ADM2Geojson} ADM3Geojson = {ADM3Geojson}/>
      
    </StyledCard>
    </Flex>
    </Container>
  )
}
