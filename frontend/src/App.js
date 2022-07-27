import { ThemeProvider } from 'styled-components'

import Footer from './components/Footer'
import Card from './components/Card'


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
  const [adm0Array,setadm0Array] = useState(["Kenya", "Zambia"])
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        
        
        
          <Card adm0Array={adm0Array}/>
        
        <Footer />
      </>
    </ThemeProvider>
  )
}

export default App
