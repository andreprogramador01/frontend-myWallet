import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { useState,useEffect } from "react"
import axios from "axios"

export default function NovaSaida(props) {
    const navegacao = useNavigate()
    const [valor, setValor] = useState()
    const [descricao, setDescricao] = useState()
    const [tipo, setTipo] = useState('saida')
    useEffect(()=>{
        if(!props.token){
            navegacao('/')
        }
    }, [])
    function enviarSaida(e) {
        e.preventDefault()
        const transacao = { value: Number(valor) * -1, description: descricao, type: tipo }
        const config = {
            headers: {
            "Authorization": "Bearer "+ props.token
            }
        }
        axios.post(process.env.REACT_APP_API_URL +'/nova-transacao', transacao,config)
        .then(res=>{
            console.log(res.data)
            navegacao('/home')
        })
        
    }
    return (
        <NovaSaidaContainer>
            <Titulo>
                Nova saída
            </Titulo>
            <Form onSubmit={enviarSaida}>
                <Input type="text" placeholder="Valor" value={valor} onChange={e => setValor(e.target.value)} />
                <Input type="text" placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} />
                <InputSub type="submit" value="Salvar saída" />
            </Form>
        </NovaSaidaContainer>
    )
}
const NovaSaidaContainer = styled.div`
    display:flex;
    flex-direction:column;
    width: 375px;
    height:667px;
    background-color: #8C11BE;
    padding-top:25px;
    padding-left:24px;
`
const Titulo = styled.p`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: #FFFFFF;
    margin-bottom:40px;
`
const Form = styled.form`
    display: flex;
    flex-direction:column;
    gap:13px;
`
const Input = styled.input`
    text-indent: 15px;
    width: 326px;
    height: 58px;
    background: #FFFFFF;
    border-radius: 5px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #000000;
`
const InputSub = styled.input.attrs({
    type: 'submit',
    value: 'Salvar saída'
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
        cursor:pointer;
`
