import styled from 'styled-components'

export const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.colors.header};
  padding: 20px 0;
  
`

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    flex-direction: column;
  }
`

export const Logo = styled.img`
  @media (max-width: ${({ theme }) => theme.mobile}) {
    margin-bottom: 10px;
  }
  width: 200px;
  height:50px;
`

export const Image = styled.img`
  width: 375px;
  margin-left: 40px;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    margin: 40px 0 30px;
  }
`



export const StyledUl = styled.ul`
    list-style-type: none;
    margin: 0;
    overflow: hidden;
    background-color: #333;
    padding: 0px;
    background-color: lightblue;
    color: black;
    font-weight: bold;

    h1{
      height: 30px;
    }
`;




