import styled from "styled-components"
import { Link } from "react-router-dom"
import { useState } from "react"
import axios from 'axios'

export default function Login() {
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [confirmaSenha, setConfirmaSenha] = useState("")

    function cadastrarUsuario(e) {
        e.preventDefault()
        const usuario = { name: nome, email, password: senha, confirmPassword: confirmaSenha }
        axios.post(process.env.REACT_APP_API_URL + '/cadastro', usuario)
            .then(res => console.log(res.data))
            .catch(err => {
                console.log(err.response.data)
            })


    }
    return <CadastroContainer>

        <Logo>MyWallet</Logo>
        <Form onSubmit={cadastrarUsuario}>
            <Input placeholder="Nome" type="text" value={nome} onChange={e => setNome(e.target.value)} />
            <Input placeholder="E-mail" type="text" value={email} onChange={e => setEmail(e.target.value)} />
            <Input placeholder="Senha" type="password" value={senha} onChange={e => setSenha(e.target.value)} />
            <Input placeholder="Confirme a Senha" type="password" value={confirmaSenha} onChange={e => setConfirmaSenha(e.target.value)} />
            <InputSub type="submit" value="Cadastrar"></InputSub>
            <p><LinkLogin to="/">Já tem uma conta? Entre agora!</LinkLogin></p>
        </Form>
    </CadastroContainer>
}
const LinkLogin = styled(Link)`
    text-decoration: none;
    color: #FFFFFF
`
const CadastroContainer = styled.div`
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