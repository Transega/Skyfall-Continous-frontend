import { StyledHeader, StyledUl, Nav, Logo} from './styles/Header.styled'
import { Container } from './styles/Container.styled'
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
          
        </Nav>
      </Container>
    </StyledHeader>
  )
}
