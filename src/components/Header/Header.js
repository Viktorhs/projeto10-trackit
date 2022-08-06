import styled from "styled-components"

export default function Header() {
    const auth = JSON.parse(localStorage.getItem("trakit"))
    return (
        <HeaderBar>
            <h1>TrakIt</h1>
            <img src={auth.image} alt="user-profile"/>
        </HeaderBar>
    )
}

const HeaderBar = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 4;

    width: 100vw;
    height: 70px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 18px;
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

    h1{
        font-family: 'Playball', cursive;
        font-style: normal;
        font-weight: 400;
        font-size: 38.982px;
        line-height: 49px;
        color: #FFFFFF;
    }

    img{
        width: 51px;
        height: 51px;
        border-radius: 50%;
    }
` 