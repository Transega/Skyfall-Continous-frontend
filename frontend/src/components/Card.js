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

  const [adm1RsData, setadm1RsData] = useState({})
  const [adm2RsData, setadm2RsData] = useState({})
  const [adm3RsData, setadm3RsData] = useState({})

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




      
      
      
      
      />
      <MapDeck ADM1Geojson ={ADM1Geojson} mapRef ={ mapRef } ADM2Geojson = {ADM2Geojson} ADM3Geojson = {ADM3Geojson}/>
      
    </StyledCard>
    </Flex>
    </Container>
  )
}
