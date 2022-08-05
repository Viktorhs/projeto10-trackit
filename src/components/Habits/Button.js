import styled from "styled-components";

const Button = styled.button`

    width: 30px;
    height: 30px;
    border: 1px solid ${(props) => typeof props.active !== 'boolean' || props.active ? "#CFCFCF" : "#D5D5D5"};
    border-radius: 5px;
    margin-right: 4px;
    background-color: ${(props) => typeof props.active !== 'boolean' || props.active ? "#CFCFCF" : "#FFFFFF"};
    color: ${(props) => typeof props.active !== 'boolean' || props.active ? "#FFFFFF" : "#DBDBDB"};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-weight: 400;
    font-size: 20px;
    line-height: 25px;
`;

export default Button;
