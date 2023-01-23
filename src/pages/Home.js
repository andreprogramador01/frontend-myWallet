import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from 'axios'

export default function Home(props) {
    const [arrayTransacoes, setArrayTransacoes] = useState()
    const [soma, setSoma] = useState()
    const [user, setUser] = useState()
    const navegacao = useNavigate()
    if (!props.token) {
        navegacao('/')
    }
    const config = {
        headers: {
            "Authorization": "Bearer " + props.token
        }
    }
    const body = {}

    useEffect(() => {
        if (!props.token) {
            navegacao('/')
        }
        axios.post(process.env.REACT_APP_API_URL + '/todas-transacoes', body, config)
            .then(res => {

                setArrayTransacoes(res.data.transacoes)
                setUser(res.data.user)
                console.log(res.data.user)
            })
            .catch(err => console.log(err))
    }, [])

    function deslogar(e) {
        props.setToken("")
        console.log(props.token)
    }

    return <HomeContainer>
        <DivTopo>
            <p>Olá, {(user) && user.name.split(" ")[0]}</p><Link onClick={deslogar} to="/"><ion-icon style={{ color: "#FFFFFF", fontSize: "24px" }} name="exit-outline"></ion-icon></Link>
        </DivTopo>
        {(arrayTransacoes === undefined) ? (<DivCentro>
            <div>Não há registros de
                entrada ou saída</div>
        </DivCentro>) : (<DivTransacoes>
            {arrayTransacoes.map(t => <div><p style={{ paddingRight: "10px" }}>{t.date}</p><p style={{ marginRight: "auto", color: "#000000" }}>{t.description}</p><p style={{ color: t.value > 0 ? "#03AC00" : "#C70000" }}>{Number(t.value).toFixed(2).replace('.', ',')}</p></div>)}
            <DivSaldo>
                {(arrayTransacoes.length > 0) &&
                    <div><p style={{ color: "#000000" }}>SALDO</p><p style={{ color: (arrayTransacoes.map(t => t.value).reduce((somaParcial, value) => Number(somaParcial) + Number(value), 0) > 0) ? "#03AC00" : "#C70000" }}>{arrayTransacoes.map(t => t.value).reduce((somaParcial, value) => Number(somaParcial) + Number(value), 0).toFixed(2).replace('.', ',')}</p></div>
                }
            </DivSaldo>
        </DivTransacoes>)}

        <DivRodape>
            <NovaEntrada>
                <LinkNovaEntrada to="/nova-entrada">
                    <ion-icon style={{ color: "#FFFFFF", fontSize: "24px" }} name="add-circle-outline"></ion-icon>
                    <p>Nova entrada</p>
                </LinkNovaEntrada>
            </NovaEntrada>

            <NovaSaida>
                <LinkNovaSaida to="/nova-saida">
                    <ion-icon style={{ color: "#FFFFFF", fontSize: "24px" }} name="add-circle-outline"></ion-icon>
                    <p>Nova saída</p>
                </LinkNovaSaida>
            </NovaSaida>
        </DivRodape>
    </HomeContainer>
}
const HomeContainer = styled.div`
    background-color: #8c11be;
    width: 375px;
    height: 667px;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 24px 24px;
`
const DivTopo = styled.div`
    display:flex;
    width: 327px;
    justify-content:space-between;
    align-items: center;
    margin-bottom:22px;
    p{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 26px;
        line-height: 31px;
        color:#FFFFFF;
    }
`
const DivCentro = styled.div`
    width: 326px;
    height: 446px;
    background: #FFFFFF;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;

    color: #868686;
    div{
        width: 180px;

    }
`
const DivTransacoes = styled.div`
    position: relative;
    width: 326px;
    height: 446px;
    background: #FFFFFF;
    border-radius: 5px;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #868686;
    padding-left:11px;
    padding-right:11px;
    padding-top:23px;
    
    div{
        display: flex;
        justify-content: space-around;
        font-size: 16px;
        
    }
`
const DivSaldo = styled.div`
    position: absolute;
    bottom:0;
    left:0;
    div{
        width: 326px;
    display:flex;
    padding-left:11px;
    padding-right:11px;
    justify-content: space-between;
    }
`
const DivRodape = styled.div`
    display:flex;
    justify-content: space-between;
    width:326px;
    
    gap:15px;
`
const NovaEntrada = styled.div`
    display: flex;
    flex-direction:column;
    width: 155px;
    height: 114px;
    background: #A328D6;
    border-radius: 5px;
    padding:10px;
    margin-top:13px;
    text-decoration: none;
    
    p{
        margin-top:32px;
        width: 64px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
        color: #FFFFFF;
        text-decoration: none;
    }
`
const NovaSaida = styled.div`
    display: flex;
    flex-direction:column;
    width: 155px;
    height: 114px;
    background: #A328D6;
    border-radius: 5px;
    padding:10px;
    margin-top:13px;
    text-decoration: none;
    p{
        margin-top:32px;
        width: 64px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
        color: #FFFFFF;
    }
`
const LinkNovaEntrada = styled(Link)`
    text-decoration: none;
`
const LinkNovaSaida = styled(Link)`
    text-decoration:none;
`



