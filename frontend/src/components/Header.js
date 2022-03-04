import { StyledHeader,StyledA, Image, StyledLi, StyledUl, DropDownContent,DropDownLi, SubA, Nav, Logo, Ul } from './styles/Header.styled'
import { Container } from './styles/Container.styled'
import { Flex } from './styles/Flex.styled'
import { Button } from './styles/Button.styled'
import Calendar from './Calendar'

export default function Header() {
  return (
    <StyledHeader>
      <Container>
        <Nav>
            
          <Logo src='./images/logo.png' alt='' />
          
          <StyledUl>
                
                
                <DropDownLi>
                    <StyledA onClick={() => this.handleClick("DropDown")}>
                        Country
                    </StyledA>
                    <DropDownContent>
                        {" "}
                        <SubA onClick={() => this.handleClick("Link1")}>
                            Kenya
                        </SubA>
                        <SubA onClick={() => this.handleClick("Link2")}>
                            Nigeria
                        </SubA>
                        <SubA onClick={() => this.handleClick("Link3")}>
                            Zambia
                        </SubA>
                    </DropDownContent>
                </DropDownLi>
                <DropDownLi>
                    <StyledA onClick={() => this.handleClick("DropDown")}>
                        Admin1
                    </StyledA>
                    <DropDownContent>
                        {" "}
                        <SubA onClick={() => this.handleClick("Link1")}>
                            Link 1
                        </SubA>
                        <SubA onClick={() => this.handleClick("Link2")}>
                            Link 2
                        </SubA>
                        <SubA onClick={() => this.handleClick("Link3")}>
                            Link 3
                        </SubA>
                    </DropDownContent>
                </DropDownLi>
                <DropDownLi>
                    <StyledA onClick={() => this.handleClick("DropDown")}>
                        Admin2
                    </StyledA>
                    <DropDownContent>
                        {" "}
                        <SubA onClick={() => this.handleClick("Link1")}>
                            Link 1
                        </SubA>
                        <SubA onClick={() => this.handleClick("Link2")}>
                            Link 2
                        </SubA>
                        <SubA onClick={() => this.handleClick("Link3")}>
                            Link 3
                        </SubA>
                    </DropDownContent>
                </DropDownLi>
                <DropDownLi>
                    <StyledA onClick={() => this.handleClick("DropDown")}>
                        Admin3
                    </StyledA>
                    <DropDownContent>
                        {" "}
                        <SubA onClick={() => this.handleClick("Link1")}>
                            Link 1
                        </SubA>
                        <SubA onClick={() => this.handleClick("Link2")}>
                            Link 2
                        </SubA>
                        <SubA onClick={() => this.handleClick("Link3")}>
                            Link 3
                        </SubA>
                    </DropDownContent>
                </DropDownLi>
            </StyledUl>
            <StyledUl>
                
    
                <DropDownLi>
                    <StyledA onClick={() => this.handleClick("DropDown")}>
                        Platform
                    </StyledA>
                    <DropDownContent>
                        {" "}
                        <SubA onClick={() => this.handleClick("Link1")}>
                            Sentinel-2
                        </SubA>
                        <SubA onClick={() => this.handleClick("Link2")}>
                            Landsat-8
                        </SubA>
                        
                    </DropDownContent>
                </DropDownLi>
                <DropDownLi>
                    <StyledA onClick={() => this.handleClick("DropDown")}>
                        Sensor
                    </StyledA>
                    <DropDownContent>
                        {" "}
                        <SubA onClick={() => this.handleClick("Link1")}>
                            Link 1
                        </SubA>
                        <SubA onClick={() => this.handleClick("Link2")}>
                            Link 2
                        </SubA>
                        <SubA onClick={() => this.handleClick("Link3")}>
                            Link 3
                        </SubA>
                    </DropDownContent>
                </DropDownLi>
                <DropDownLi>
                    <StyledA onClick={() => this.handleClick("DropDown")}>
                        Product
                    </StyledA>
                    <DropDownContent>
                        {" "}
                        <SubA onClick={() => this.handleClick("Link1")}>
                            NDVI
                        </SubA>
                        <SubA onClick={() => this.handleClick("Link2")}>
                            NDMI
                        </SubA>
                        
                    </DropDownContent>
                </DropDownLi>
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
