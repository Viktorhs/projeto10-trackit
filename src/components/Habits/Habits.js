import { useContext, useEffect } from "react";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
import { getListHabits } from "../../services/trackit";
import ListHabits from "./ListHabits";

export default function Habits(){
    const {userHabits, setUserHabits} = useContext(UserContext)
    useEffect(() =>{
        const promisse = getListHabits()
        promisse.catch(() => {
            alert('Erro de cominucação com o servidor')
        })
        promisse.then((r) => {
            setUserHabits(r.data)
            console.log(r.data)
        })
    }, [])

    return(
        <Container>
            <Wrapper>
                <h4>Meus hábitos</h4>
                <div>+</div>
            </Wrapper>
            <ListHabits/>
        </Container>
    )

}

const Container = styled.div`
        width: 100vw;
        margin-top: 70px;
        padding: 0 18px;

`

const Wrapper = styled.span`
    &&{
        padding-top: 28px;
        margin-bottom: 28px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    h4{
        font-weight: 400;
        font-size: 23px;
        line-height: 29px;
        color: #126BA5;
    }
    div{
        width: 40px;
        height: 35px;
        background: #52B6FF;
        border-radius: 5px;

        font-weight: 400;
        font-size: 27px;
        line-height: 34px;
        text-align: center;
        color: #FFFFFF;
        transition: 50ms;
    }
    div:active{
        transform: translateY(1px);
    }

`