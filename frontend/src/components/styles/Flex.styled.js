import styled from 'styled-components'

export const Flex = styled.div`
  display: flex;
  align-items: center;



  @media (max-width: ${({ theme }) => theme.mobile}) {
    flex-direction: column;
    text-align: center;
  }
`
export const FlexColumn = styled(Flex)`
flex-direction: column;

`