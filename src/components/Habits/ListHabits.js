import { useContext, useState } from "react"
import styled from "styled-components"
import UserContext from "../../contexts/UserContext"
import trash from "../../images/trash.svg"
import { deleteHabit } from "../../services/trackit"
import Button from "./Button"

function DayButton({ id, days, children }) {
    const day = days.filter((a) => a === id)
    if (day[0] === id) {
        return <Button active={true}>{children}</Button>
    } else {
        return <Button active={false}>{children}</Button>
    }

}

function HabitCard({ children, days, id, habits, setHabits }) {
    const defaultDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
    const { setAtt, att } = useContext(UserContext);

    function attLista() {
        if (att === false) {
            setAtt(true)
        } else {
            setAtt(false)
        }
    }

    function trashHabit(id) {
        if (window.confirm("Deseja apagar o habito?")) {
            const promise = deleteHabit(id);
            promise.catch(() => {
                alert('Falha em apagar o habito, por favor tente mais tarde')
            })
            promise.then(() => {
                attLista()
            })

        }
    }

    return (
        <Card>
            <p>{children}</p>
            <div>{defaultDays.map((item, index) => <DayButton key={index} id={index} days={days}>{item}</DayButton>)}</div>
            <img src={trash} alt='trash-button' onClick={() => trashHabit(id)} />
        </Card>
    )
}

export default function ListHabits({ habits, setHabits }) {
    const organize = habits.sort((a, b) => b.id - a.id)


    return (
        <Container>
            {organize.map((item, index) => <HabitCard key={index}
                days={item.days}
                id={item.id}
                habits={habits}
                setHabits={setHabits}>{item.name}</HabitCard>)}
        </Container>
    )

}

const Container = styled.div`

    width: 100%;

    p{
        width: 90%;
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        color: #666666;
    }
    div:last-child{
        margin-bottom: 120px;
    }

`

const Card = styled.div`
    width: 100%;
    min-height: 91px;
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    padding: 13px 0 15px 15px;
    background-color: #ffffff;
    margin-bottom: 10px;
    border-radius: 5px;

    div{
        display: flex;
        margin-top: 8px;
    }

    button{
        cursor: default;
    }
    img{
        position: absolute;
        right: 10px;
        top:11px;
        cursor: pointer;
        width: 18px;
        height: 20px;
    }
`