import React from 'react'
import { Select, StyledFormWrapper,StyledButton, StyledForm} from './styles/Form.styled'

import { Container } from './styles/Container.styled'
import DatePicker from "react-datepicker";
import { Wrapper } from "./styles/Calendar.styled";
import { useState } from "react";
import 'react-datepicker/dist/react-datepicker.css'

const Form = () => {

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
          
        </StyledForm>
        </Container>
        <Container>

        <StyledButton type="submit">Compute</StyledButton>
        </Container>
      </StyledFormWrapper>
  )
}

export default Form