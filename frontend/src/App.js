import { ThemeProvider } from 'styled-components'
import Header from './components/Header'
import Footer from './components/Footer'
import Card from './components/Card'
import SideBarMenu from './components/SideBarMenu'
import { Container } from './components/styles/Container.styled'
import { Flex } from './components/styles/Flex.styled'
import GlobalStyles from './components/styles/Global'
import content from './content'
import React,{useState} from 'react'

const theme = {
  colors: {
    header: '#ebfbff',
    body: '#fff',
    footer: '#003333',
  },
  mobile: '768px',
}

function App() {
  const [adm0Array,setadm0Array] = useState(["Kenya", "Nigeria", "Ghana"])
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Header adm0Array={adm0Array}/>
        <Container>
          <Flex>
        <SideBarMenu/>
          <Card />
          </Flex>
          
        </Container>
        <Footer />
      </>
    </ThemeProvider>
  )
}

export default App
