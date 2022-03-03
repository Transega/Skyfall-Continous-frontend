import SocialIcons from './SocialIcons'
import { Container } from './styles/Container.styled'
import { Flex } from './styles/Flex.styled'
import { StyledFooter } from './styles/Footer.styled'

export default function Footer() {
  return (
    <StyledFooter>
      <Container>
        

        <Flex>
        <img src='./images/logo.png' alt='' />
        <p>&copy; 2022 Skyfall-Pula. All rights reserved</p>
        <SocialIcons />
        </Flex>

        
      </Container>
    </StyledFooter>
  )
}
