import { StyledHeader,StyledA, Image, StyledLi, StyledUl, DropDownContent,DropDownLi, SubA, Nav, Logo, Ul } from './styles/Header.styled'
import { Container } from './styles/Container.styled'
import { Flex } from './styles/Flex.styled'
import { Button } from './styles/Button.styled'
import Calendar from './Calendar'
import Form from './Form'

export default function Header() {
  return (
    <StyledHeader>
      <Container>
        <Nav>
            
          <Logo src='./images/logo.png' alt='' />
          
        
           
            <StyledUl>
                
    
                
                <Form/>

            </StyledUl>
         <Flex>

                <Calendar/>
                </Flex>

          <Button>Compute</Button>
        </Nav>

        
      </Container>
    </StyledHeader>
  )
}
