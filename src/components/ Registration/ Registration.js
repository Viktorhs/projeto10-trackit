import { useState } from 'react';
import logo from '../../assets/images/logo.svg'
import { postRegister } from '../../services/trackit';
import { ThreeDots } from 'react-loader-spinner';
import { Container, Form, Button, StyledLink } from '../Login/Login'
import { useNavigate } from 'react-router-dom';

export default function Registration() {

  const [WaitRegister, setWaitRegister] = useState(false)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: "",
    name: "",
    image: "",
    password: ""
  });

  function handleForm(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  function register(e) {
    setWaitRegister(true)
    e.preventDefault();
    console.log(form)
    const promise = postRegister(form)
    promise.catch((r) => {
      alert('Erro a se comunicar com o servidor de cadastro')
      setWaitRegister(false)
      console.log(r)
    })
    promise.then((r) => {
      navigate('/')
    })
  }

  if (!WaitRegister) {
    return (
      <Container>
        <img src={logo} alt='logo' />
        <Form onSubmit={register}>
          <input type='email' name='email' placeholder="email" onChange={handleForm} value={form.description} required />
          <input type="password" name="password" placeholder="senha" onChange={handleForm} value={form.description} required />
          <input type="text" name="name" placeholder="nome" onChange={handleForm} value={form.description} required />
          <input type='url' name='image' placeholder="foto" onChange={handleForm} value={form.description} required />
          <Button type="submit">Cadastrar</Button>
        </Form>
        <StyledLink to='/'>Já tem uma conta? Faça login!</StyledLink>
      </Container>
    )
  } else if (WaitRegister) {
    return (
      <Container>
        <img src={logo} alt='logo' />
        <Form onSubmit={register} opacity='0.5'>
          <input type='email' name='email' placeholder="email" onChange={handleForm} value={form.description} disabled />
          <input type="password" name="password" placeholder="senha" onChange={handleForm} value={form.description} disabled />
          <input type="text" name="name" placeholder="nome" onChange={handleForm} value={form.description} disabled />
          <input type='url' name='image' placeholder="foto" onChange={handleForm} value={form.description} disabled />
          <Button type="submit" opacity='0.7' disabled > <ThreeDots color="#FFFFFF" height={13} width={51} /></Button>
        </Form>
        <StyledLink to='/'>Já tem uma conta? Faça login!</StyledLink>
      </Container>
    )
  }


}

