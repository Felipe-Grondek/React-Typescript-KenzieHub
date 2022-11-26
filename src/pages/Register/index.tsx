import { useContext, useEffect } from "react";
import { iFormRegister, UserContext } from "../../contexts/UserContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import { registerSchema } from "../../validations/RegisterUser";

import { Container } from "../../components/Container";
import { FormStyled } from "../../components/Form";
import { ButtonStyled, LinkStyled } from "../../styles/Button";
import { Input, Label, Select } from "../../styles/Input";
import { Header, Title } from "./style";
import { useNavigate } from "react-router-dom";

export default function Register() {

    const navigate = useNavigate()

    const token = localStorage.getItem("@Kenziehub:token")

    useEffect( () => {
        if(token) {
            return navigate("/dashboard")
        } 
    }, [])

    const {registerUser} = useContext(UserContext)

    const {register, handleSubmit, formState: {errors}} = useForm<iFormRegister>({
        resolver: yupResolver(registerSchema)
    })

    return (
        <Container styleType="center">
            <Header>
                <Title>Kenzie Hub</Title>
                <LinkStyled btnstyle="grey" btnsize="big" to="/login">Voltar</LinkStyled>
            </Header>
            <FormStyled onSubmit={handleSubmit(registerUser)}>
                <h2 className="formTitle">Crie sua conta</h2>
                <p className="formDescription">Rapido e grátis, vamos nessa</p>

                <Label htmlFor="name">Nome</Label>
                <Input type="text" id="name" placeholder="Digite aqui seu nome" {...register("name")} />
                <span>{errors.name?.message}</span>
                
                <Label htmlFor="email">Email</Label>
                <Input type="text" id="email" placeholder="Digite aqui seu email" {...register("email")}/>
                <span>{errors.email?.message}</span>

                <Label htmlFor="password">Senha</Label>
                <Input type="password" id="password" placeholder="Digite aqui sua senha" {...register("password")}/>
                <span>{errors.password?.message}</span>

                <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                <Input type="password" id="confirmPassword" placeholder="Digite novamente sua senha" {...register("confirmPassword")}/>
                <span>{errors.confirmPassword?.message}</span>

                <Label htmlFor="bio">Bio</Label>
                <Input type="text" id="bio" placeholder="Fale sobre você" {...register("bio")}/>
                <span>{errors.bio?.message}</span>

                <Label htmlFor="contact">Contato</Label>
                <Input type="text" id="contact" placeholder="Opção de contato" {...register("contact")}/>
                <span>{errors.contact?.message}</span>

                <Label htmlFor="module">Selecionar Módulo</Label>
                <Select id="module" {...register("course_module")}>
                    <option value="Primeiro Módulo (Front End)">Primeiro Módulo</option>
                    <option value="Segundo Módulo (Front End)">Segundo Módulo</option>
                    <option value="Terceiro Módulo (Front End)">Terceiro Módulo</option>
                </Select>
                <ButtonStyled type="submit">Cadastrar</ButtonStyled>
            </FormStyled>
        </Container>
    )
}