import { StyledHeader, StyledUl, Nav, Logo} from './styles/Header.styled'
import { Container } from './styles/Container.styled'
import Form from './Form'


import React from 'react'

const Header = ({adm0Array}) => {
  return (
    <StyledHeader>
      <Container>
        <Nav>
            
          <Logo src='./images/logo.png' alt='' />
          <StyledUl>
                <Form adm0Array={adm0Array}/> 
          </StyledUl>
          
        </Nav>
      </Container>
    </StyledHeader>
  )
}

export default Header

// export default function () {
//   return (
    
//   )
// }
