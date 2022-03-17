import styled from "styled-components";

export const StyledFormWrapper = styled.div`
  display: flex;
  height: 80px;
  justify-content: center;
  align-items: center;
  
  padding: 0 20px;
`;

export const StyledForm = styled.form`
display:flex;
  width: 100%;
  height: 70px;
  max-width: 700px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
`;

export const StyledInput = styled.div`
display:flex;
width: 150px

`;
export const Select = styled.select`
  width: 100%;
  
  background: white;
  color: gray;
  padding-left: 5px;
  font-size: 14px;
  border:none;
  margin-left: 10px;

       option {
         color: black;
         background: white;
         font-weight: small;
         display: flex;
         white-space: pre;
         min-height: 20px;
         padding: 0px 2px 1px;
       }
`;




export const StyledButton = styled.button`

  background-color: #50C878;
  color: #fff;
  font-size: 0.9rem;
  border: 0;
  border-radius: 5px;
  height: 40px;
  padding: 0 20px;
  cursor: pointer;
  box-sizing: border-box;
`;

export const Date =  styled.div`
display: flex;
justify-content: space-between;
align-items: center;

`