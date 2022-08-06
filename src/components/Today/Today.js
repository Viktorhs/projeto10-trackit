import dayjs from "dayjs"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import UserContext from "../../contexts/UserContext"
import { getTodayHabits } from "../../services/trackit"
import CardHabits from "./CardHabits"

export default function Today() {
    const { setUserHabits, userHabits, att } = useContext(UserContext)
    const [todayHabits, setTodayHabits] = useState([])

    useEffect(() => {
        const promisse = getTodayHabits()
        promisse.catch(() => {
            alert('Erro de cominucação com o servidor')
        })
        promisse.then((r) => {
            setTodayHabits(r.data)
            percentComplete(r.data)
        })
    }, [att])

    const WeekDays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo']
    const day = dayjs().format('DD/MM')
    const WeekDay = (dayjs().day())
    const [define, setDefine] = useState(true)

    function percentComplete(habits) {
        if (habits.length > 0) {
            const total = habits.length
            const complete = habits.filter((a) => a.done === true).length
            const percent = ((complete * 100) / total).toFixed(0)
            setUserHabits({
                ...userHabits,
                total: total,
                complete: complete,
                percent: percent
            })
            setDefine(false)
        } else {
            setUserHabits({
                ...userHabits,
                percent: 0
            })
            setDefine(true)
        }
    }

    

    return (
        <Container>
            <Wrapper active={userHabits.percent > 0}>
                <h4>{WeekDays[WeekDay - 1]}, {day}</h4>
                {(userHabits.percent === undefined || userHabits.percent < 1) ? <p>Nenhum hábito concluído ainda</p> : <p>{userHabits.percent}% dos hábitos concluídos</p>}
            </Wrapper>

            {todayHabits.map((item) => <CardHabits
                currentSequence={item.currentSequence}
                highestSequence={item.highestSequence}
                key={item.id}
                id={item.id}
                done={item.done}>{item.name}</CardHabits>)}
        </Container>
    )

}

const Container = styled.div` 
    width: 100vw;
    margin-top: 71px;
    margin-bottom: 70px;
    padding: 0 18px;

    div:last-child{
        margin-bottom: 120px;
    }


`

const Wrapper = styled.div`
&&{
        margin-bottom: 28px;
        padding-top: 28px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    h4{
        font-weight: 400;
        font-size: 23px;
        line-height: 29px;
        color: #126BA5;
    }
    p{
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;

        color:${(props) => typeof props.active !== 'boolean' || props.active ? "#8FC549" : "#bababa"}
    }

`