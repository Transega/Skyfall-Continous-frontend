import { StyledSide } from './styles/SideBar.styled'
import React from 'react'
import Chart from './Chart'
import Logo from './Logo'
import { Container } from './styles/Container.styled'


const SideBarMenu = ({ADM1Geojson}) => {

  console.log(ADM1Geojson);
  return (
    <>
    
    
    <StyledSide>
      <Container>
    <Logo/>
    </Container>
      <Chart/>
      {Object.keys(ADM1Geojson).length=== 0 ? <p>No data yet</p>:
      <p>There is data </p>
      }
    </StyledSide>
    
    </>
  )
}

export default SideBarMenu