import styled from 'styled-components'
import { useContext, useState } from 'react';
import { postLogin } from '../../services/trackit';
import logo from '../../assets/images/logo.svg'
import { Link, useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner'
import UserContext from '../../contexts/UserContext';

export default function Login() {
    const navigate = useNavigate()
    const {setUser} = useContext(UserContext)

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
            setUser(r.data)
            localStorage.setItem("trakit", trakitInf)
            navigate('/hoje')
        })

    }
        return (
            <Container>
                <img src={logo} alt='logo' />
                <Form onSubmit={login} active={waiting}>
                    <input type='email' name='email' placeholder="email" onChange={handleForm} value={form.description} required  disabled={waiting}/>
                    <input type="password" name="password" placeholder="senha" onChange={handleForm} value={form.description} required  disabled={waiting}/>
                    <Button type="submit" active={waiting} disabled={waiting}>
                        {waiting ? <ThreeDots color="#FFFFFF" height={13} width={51} /> : 'Entrar'}
                    </Button>
                </Form>
                <StyledLink to='/cadastro'>Não tem uma conta? Cadastre-se!</StyledLink>
            </Container>
        )

}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: #FFFFFF;
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
        opacity: ${(props) => typeof props.active !== 'boolean' || props.active ? '0.5' : ""};   
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

        opacity: ${(props) => typeof props.active !== 'boolean' || props.active ? '0.7' : ""};

        &:active{
        filter: brightness(${(props) => typeof props.active !== 'boolean' || props.active ? '' : '90%'});
        transform: translateY(${(props) => typeof props.active !== 'boolean' || props.active ? '' : '1px'});
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