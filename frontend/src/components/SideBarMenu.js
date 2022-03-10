import { StyledSide } from './styles/SideBar.styled'
import React from 'react'
import Chart from './Chart'
import Logo from './Logo'
import { Container } from './styles/Container.styled'


const SideBarMenu = () => {
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