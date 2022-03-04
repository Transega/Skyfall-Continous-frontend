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

export const StyledLinks = styled.link`
color: red;
  display: flex;
  justify-content: space-around;
  width: 100%;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

export const Ul = styled.ul`
list-style:none;
display: flex;
justify-content: space-around;

li{
  margin: 0px 7px;
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
`;

export const StyledLi = styled.li`
    float: left;
    height: 100%;
    padding: 10px;
    border-radius:10px;
    &:hover {
        background-color:green;
    }
`;

export const DropDownContent = styled.div`
    display: none;
    position: absolute;
    min-width: 160px;
    z-index: 1;
`;

export const DropDownLi = styled(StyledLi)`
    display: inline-block;
    &:hover ${DropDownContent} {
        display: block;
    }
`;

export const StyledA = styled.a`
    display: inline-block;
    text-align: center;
    text-decoration: none;
`;

export const SubA = styled(StyledA)`
    text-decoration: none;
    display: block;
    text-align: left;
    background-color: lightblue;
    padding: 10px;
`;



