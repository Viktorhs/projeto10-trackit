import { Link } from "react-router-dom"
import styled from "styled-components"
import {
    CircularProgressbar,
    buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";


export default function Menu() {
    const { userHabits } = useContext(UserContext)

    return (
        <FooterMenu>
            <MenuLink to='/habitos'>Hábitos</MenuLink>
            <MenuLink to='/hoje' style={{ width: 91, height: 91, marginBottom: 47 }}><CircularProgressbar
                value={userHabits.percent} text={"Hoje"}
                background
                backgroundPadding={6}
                styles={buildStyles({
                    textSize: '18px',
                    pathTransitionDuration: 0.5,
                    backgroundColor: "#52B6FF",
                    textColor: "#ffffff",
                    pathColor: "#ffffff",
                    trailColor: "transparent"
                })}
            /></MenuLink>
            <MenuLink to='/historico'>Histórico</MenuLink>
        </FooterMenu>
    )
}

const FooterMenu = styled.footer`
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100vw;
    height: 70px;
    padding: 0 31px;
    background: #FFFFFF;
`

const MenuLink = styled(Link)`
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 22px;
    text-decoration: none;
    text-align: center;

    color: #52B6FF;
`