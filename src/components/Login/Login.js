import styled from 'styled-components'
import { useState } from 'react';
import logo from '../../assets/images/logo.svg'

export default function Login(){

    const [form, setForm] = useState({
        email: '',
        password: '',
      });

      function handleForm (e) {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        }) 
      }

      function login(e) {
		e.preventDefault();
        console.log(form)
	}

    return(
    <Container>
        <img src={logo} alt='logo'/>
        <Form onSubmit={login}>
            <input type='email' name='email' placeholder="email" onChange={handleForm} value={form.description} required/>
            <input type="password" name="password" placeholder="senha" onChange={handleForm} value={form.description} required/>
            <Button type="submit">Entrar</Button>
        </Form>
        <span>Não tem uma conta? Cadastre-se!</span>
    </Container>
    )
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
        margin-top: 25px;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        text-align: center;
        text-decoration-line: underline;

        color: #52B6FF;

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

        border: none;

        font-weight: 400;
        font-size: 21px;
        line-height: 26px;
        text-align: center;
        color: #FFFFFF;

        &:active{
        filter: brightness(90%);
        transform: translateY(1px);
    }
`