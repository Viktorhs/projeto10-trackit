import { useContext, useState } from "react"
import styled from "styled-components"
import UserContext from "../../contexts/UserContext"
import check from "../../images/check.svg"
import { postCheckHabit, postUnCheckHabit } from "../../services/trackit"

export default function CardHabits({ currentSequence, highestSequence, id, children, done }) {
    const isCheck = done
    const { setAtt, att } = useContext(UserContext)
    const [clicked, setClicked] = useState(false)

    function attList() {
        if (att) {
            setAtt(false)
        }
        if (!att) {
            setAtt(true)
        }
    }

    function checkCard() {
        setClicked(true)
        if (isCheck) {
            const promisse = postUnCheckHabit(id)
            promisse.catch(() => {
                alert('Não e possivel marcar habitos do dia anterior')
                setClicked(false)
            })
            promisse.then(() => {
                setClicked(false)
                attList()
            })

        }
        if (!isCheck) {
            const promisse = postCheckHabit(id)
            promisse.catch(() => {
                alert('Não e possivel desmarcar habitos do dia anterior')
                setClicked(false)
            })
            promisse.then(() => {
                setClicked(false)
                attList()
            })
        }
    }

    return (
        <Container active={currentSequence === highestSequence && highestSequence > 0}>
            <div>
                <h4>{children}</h4>
                <p>Sequência atual: <b>{currentSequence} dias</b></p>
                <p>Seu recorde: <b>{highestSequence} dias</b></p>
            </div>
            <ButtonCheck active={isCheck} onClick={() => checkCard()} disabled={clicked}><img src={check} alt='check-button' /></ButtonCheck>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    min-height: 94px    ;
    padding: 13px 13px 17px 15px;
    margin-bottom: 10px;
    background-color: #ffffff;
    border-radius: 5px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    div{
        width: 90%;
    }

    b{
        color:${(props) => typeof props.active !== 'boolean' || props.active ? "#8FC549" : "#666666"};
    }

    div h4{
        font-weight: 400;
        font-size: 20px;
        line-height: 25px;
        color: #666666;
        margin-bottom:7px;
    }
    div p{
        font-weight: 400;
        font-size: 13px;
        line-height: 16px;
        color: #666666;
    }
`
const ButtonCheck = styled.button`
    width: 69px;
    height: 69px;
    border: none;
    background: ${(props) => typeof props.active !== 'boolean' || props.active ? "#8FC549" : "#E7E7E7"};
    border-radius: 5px;

    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

`