import styled from 'styled-components'
import { useState } from 'react';
import { postLogin } from '../../services/trackit';
import logo from '../../assets/images/logo.svg'
import { Link, useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner'

export default function Login() {
    const navigate = useNavigate()

    const [waiting, setWaiting] = useState(false)

    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    function handleForm(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    function login(e) {

        setWaiting(true)
        e.preventDefault();
        const promise = postLogin(form)
        promise.catch(() => {
            alert('Erro no login, verifique se o email e senha estão corretos')
            setWaiting(false)
        }
        )
        promise.then((r) => {
            localStorage.removeItem("trakit")
            let trakitInf = JSON.stringify(r.data)
            localStorage.setItem("trakit", trakitInf)
            navigate('/hoje')
            console.log(JSON.parse(localStorage.getItem("trakit")).token)
        })

    }
    if (!waiting) {
        return (
            <Container>
                <img src={logo} alt='logo' />
                <Form onSubmit={login}>
                    <input type='email' name='email' placeholder="email" onChange={handleForm} value={form.description} required />
                    <input type="password" name="password" placeholder="senha" onChange={handleForm} value={form.description} required />
                    <Button type="submit" brightness='90%' px='1px'>Entrar</Button>
                </Form>
                <StyledLink to='/cadastro'>Não tem uma conta? Cadastre-se!</StyledLink>
            </Container>
        )
    } else if (waiting) {
        return (
            <Container>
                <img src={logo} alt='logo' />
                <Form onSubmit={login} opacity='0.5'>
                    <input type='email' name='email' placeholder="email" onChange={handleForm} value={form.description} disabled />
                    <input type="password" name="password" placeholder="senha" onChange={handleForm} value={form.description} disabled />
                    <Button type="submit" opacity='0.7' disabled > <ThreeDots color="#FFFFFF" height={13} width={51} /></Button>

                </Form>
                <StyledLink to='/cadastro'>Não tem uma conta? Cadastre-se!</StyledLink>
            </Container>
        )
    }

}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    padding-top: 68px;

    img{
        width: 180px;
        height: 179px;
        margin-bottom: 33.5px;
    }

    span{


    }
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center ;

    input{
        width: 303px;
        height: 45px;
        left: 36px;
        top: 279px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        margin-bottom: 6px;
        opacity: ${props => props.opacity};   
        padding: 0 11px;
    }
    ::placeholder{
        font-weight: 400;
        font-size: 20px;
        line-height: 25px;
        color: #DBDBDB;
    }
`
const Button = styled.button`
        width: 303px;
        height: 45px;
        background: #52B6FF;
        border-radius: 4px;

        display: flex;
        align-items: center;
        justify-content: center;

        border: none;

        font-weight: 400;
        font-size: 21px;
        line-height: 26px;
        text-align: center;
        color: #FFFFFF;

        opacity: ${props => props.opacity};

        &:active{
        filter: brightness(${props => props.brightness});
        transform: translateY(${props => props.px});
    }
`
const StyledLink = styled(Link)`
    margin-top: 25px;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    text-decoration-line: underline;
    color: #52B6FF;
`

export { Container, Form, Button, StyledLink }