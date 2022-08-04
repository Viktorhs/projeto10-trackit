import styled from "styled-components"

export default function Historic() {
    return (
        <Container>
            <h2>Histórico</h2>
            <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
        </Container>
    )
}

const Container = styled.div`
    width: 100vw;
    margin-top: 70px;
    padding: 28px 18px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    h2{
        font-size: 23px;
        line-height: 29px;
        color: #126BA5;
        margin-bottom: 17px;
    }
    p{
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;

        color: #666666;
    }
`