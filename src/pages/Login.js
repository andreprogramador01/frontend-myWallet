import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

export default function Login(props) {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const navegacao = useNavigate()
    function Logar(e) {
        e.preventDefault()
        const usuario = { email, password: senha }
        axios.post(process.env.REACT_APP_API_URL + '/login', usuario)
            .then(res => {
                navegacao('/home')
                props.setToken(res.data)
            })
            .catch(err => console.log(err))
        console.log("Bearer " +props.token)
    
    }
    return <LoginContainer>

        <Logo> MyWallet </Logo>
        <Form onSubmit={Logar}>
            <Input placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} type="text" />
            <Input placeholder="Senha" type="password" value={senha} onChange={e => setSenha(e.target.value)} />
            <InputSub type="submit" value="Entrar"></InputSub>
            <p><LinkCadastro to="/cadastro">Primeira vez? Cadastra-se</LinkCadastro></p>
        </Form>
    </LoginContainer>
}
const LinkCadastro = styled(Link)`
    text-decoration: none;
    color: #FFFFFF
`
const LoginContainer = styled.div`
    background-color: #8c11be;
    width: 375px;
    height: 667px;
    display: flex;
    align-items: center;
    flex-direction: column;
`
const Logo = styled.div`
    margin-top:159px;
    margin-bottom:24px;
    font-family: 'Saira Stencil One';
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 50px;
    color: #FFFFFF;
`
const Form = styled.form`
    display: flex;
    flex-direction:column;
    align-items:center;
    gap:13px;
    p{
        margin-top:36px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;

        /* identical to box height */

        color: #FFFFFF;
    }
    
`
const Input = styled.input`
        width: 326px;
        height: 58px;
        background: #FFFFFF;
        border-radius: 5px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        text-indent: 15px;
        color: #000000;
        outline:none;
        border:none;
        
`
const InputSub = styled.input.attrs({
    type: 'submit',
    value: 'Entrar'
})`
        width: 326px;
        height: 46px;
        background: #A328D6;
        border-radius: 5px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 23px;
        text-indent: 15px;
        color: #FFF;
        border:none;
  `