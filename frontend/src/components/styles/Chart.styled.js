import styled from 'styled-components'

export const ChartStyled = styled.div`
  display: flex;
  height: 400px;
  width: 80%;
  
  

 

  @media (max-width: ${({ theme }) => theme.mobile}) {
    flex-direction: column;
  }
`
