
import styled from "styled-components";

export const Wrapper = styled.div`
display: flex;
flex-direction: row;

@media (max-width: ${({ theme }) => theme.mobile}) {
    flex-direction: column;
  }

`;