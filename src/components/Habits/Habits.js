import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";
import { getListHabits } from "../../services/trackit";
import CreateHabit from "./CreateHabit";
import ListHabits from "./ListHabits";

export default function Habits(){
    const {setUserHabits, att} = useContext(UserContext)
    const [create, setCreate] = useState(false)
    const [habits,setHabits] = useState([])


    useEffect(() =>{
        const promisse = getListHabits()
        promisse.catch(() => {
            alert('Erro de cominucação com o servidor')
        })
        promisse.then((r) => {
            setHabits(r.data)
            setUserHabits(r.data)
        })
    }, [att])

    return(
        <Container>
            <Wrapper>
                <h4>Meus hábitos</h4>
                <div onClick={() => setCreate(true)}>+</div>
            </Wrapper>
            {create ? <CreateHabit 
            setCreate={setCreate}/> : <></>}
            <ListHabits habits={habits} setHabits={setHabits}/>
        </Container>
    )

}

const Container = styled.div`
    width: 100vw;
    margin-top: 71px;
    margin-bottom: 70px;
    padding: 0 18px;

`

const Wrapper = styled.span`
    &&{
        margin-bottom: 28px;
        padding-top: 17px;
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
        cursor: pointer;
    }
    div:active{
        transform: translateY(1px);
    }

`