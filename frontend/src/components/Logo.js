import { StyledHeader, LogoStyle} from './styles/Header.styled'
import { Container } from './styles/Container.styled'



import React from 'react'

const Logo  = () => {
  return (
    <StyledHeader>
      <Container>
        
            
          <LogoStyle src='./images/logo.png' alt='' />
          
          
        
      </Container>
    </StyledHeader>
  )
}

export default Logo

// export default function () {
//   return (
    
//   )
// }
