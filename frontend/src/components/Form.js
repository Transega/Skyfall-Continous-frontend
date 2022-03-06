import React from 'react'
import { Select, StyledFormWrapper,StyledButton, StyledForm} from './styles/Form.styled'

import { Container } from './styles/Container.styled'
import 'react-datepicker/dist/react-datepicker.css'
import Calendar from './Calendar';
import { Flex } from './styles/Flex.styled';

function Form(){

  return (
    <StyledFormWrapper>
        <Container>
        <StyledForm> 
            <Select>
               <option value="" hidden>Adm0</option>
               <option value="1">Kenya</option>
               <option value="2">Nigeria</option>
               
            </Select>
            <Select>
               <option value="" hidden>Adm1</option>
               <option value="1">1</option>
               <option value="2">2</option>
               <option value="2">3</option>
               
            </Select>

            <Select>
               <option value="" hidden>Adm2</option>
               <option value="1">1</option>
               <option value="2">2</option>
               
            </Select>
            <StyledButton type="submit">Geometry</StyledButton>
            
         </StyledForm>

        </Container>

        <Container>
         <StyledForm>
            <Select>
               <option value="" hidden>Plaform</option>
               <option value="1">Sentinel</option>
               <option value="2">Landsat</option>
      
            </Select>
            <Select>
               <option value="" hidden>Sensor</option>
               <option value="1">Sentinel-1</option>
               <option value="2">Sentinel-2</option>
               <option value="2">Landsat-8</option>
               
            </Select>

            <Select>
               <option value="" hidden>Product</option>
               <option value="1">NDVI</option>
               <option value="2">NDMI</option>
               
            </Select>
            <Flex>
               <Calendar/>
               <StyledButton type="submit">Compute</StyledButton>
            </Flex>
            
         </StyledForm>
      
        </Container>
      </StyledFormWrapper>
  )
}

export default Form