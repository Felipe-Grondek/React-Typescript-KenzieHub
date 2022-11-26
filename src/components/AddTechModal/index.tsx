import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { iNewTech, TechContext } from "../../contexts/TechContext";
import { ButtonStyled } from "../../styles/Button";
import { Input, Label, Select } from "../../styles/Input";
import { FormStyled } from "../Form";
import { ModalWrapper } from "./style";
import { NewTechSchema } from "../../validations/NewUser";

export default function AddTechModal() {

    const {closeModal, newTech} = useContext(TechContext)

    const {register, handleSubmit, formState: {errors, submitCount, isSubmitSuccessful}, resetField} = useForm<iNewTech>({
        resolver: yupResolver(NewTechSchema)
    })

    useEffect(() => {
        if(isSubmitSuccessful) {
            resetField("title")
        }
    }, [submitCount])

    return(
        <ModalWrapper>
            <FormStyled onSubmit={handleSubmit(newTech)}>
                <div className="formHeader">
                    <h3>Cadastrar Tecnologia</h3>
                    <button onClick={() => closeModal()} type="button">x</button>
                </div>
                <div className="formBody">
                    <Label htmlFor="title">Nome</Label>
                    <Input id="title" placeholder="Nome da tecnologia" {...register("title")}/>
                    <span>{errors.title?.message}</span>

                    <Label htmlFor="status">Selecionar status</Label>
                    <Select id="status" {...register("status")}>
                        <option value="Iniciante">Iniciante</option>
                        <option value="Intermediário">Intermediário</option>
                        <option value="Avançado">Avançado</option>
                    </Select>

                    <ButtonStyled type="submit">Cadastrar Tecnologia</ButtonStyled>
                </div>
            </FormStyled>
        </ModalWrapper>
    )
}
