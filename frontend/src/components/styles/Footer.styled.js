import styled from 'styled-components'

export const StyledFooter = styled.footer`
display:flex;
justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.footer};
  color: #fff;
  padding: 50px 0 50px;
  

  ul {
    list-style-type: none;
  }

  ul li {
    margin-bottom: 20px;
  }

  p {
    text-align: right;
    margin-left: 20px;
  }

  @media (max-width: ${({ theme }) => theme.mobile}) {
    text-align: center;
    ul {
      padding: 0;
    }
    p {
      text-align: center;
    }
  }
`
