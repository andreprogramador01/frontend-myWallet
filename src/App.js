import React from "react"
import styled from "styled-components"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"
import Login from "./pages/Login"
import Cadastro from "./pages/Cadastro"
import GlobalStyle from "./css/globalStyle"
import Home from "./pages/Home"
import NovaEntrada from "./pages/NovaEntrada"
import NovaSaida from "./pages/NovaSaida"


export default function App() {
    const [token, setToken] = useState("")
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<Login token={token} setToken={setToken} />} path="/" />
                    <Route element={<Cadastro />} path="/cadastro" />
                    <Route element={<Home token={token} setToken={setToken} />} path="/home" />
                    <Route element={<NovaEntrada token={token} setToken={setToken} />} path="/nova-entrada" />
                    <Route element={<NovaSaida token={token} setToken={setToken} />} path="/nova-saida" />

                </Routes>
                <GlobalStyle />
            </BrowserRouter>
        </>
    )

}