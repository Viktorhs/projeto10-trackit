import { useContext } from "react"
import styled from "styled-components"
import UserContext from "../../contexts/UserContext"

export default function ListHabits(){
    const {userHabits} = useContext(UserContext)
    if(userHabits.length === 0){
        return(
            <Container>
                <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
            </Container>
        )
    }
}

const Container = styled.div`
    p{
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        color: #666666;
    }

`