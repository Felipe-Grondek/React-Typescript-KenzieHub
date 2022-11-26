import { useContext } from "react";
import { useForm } from "react-hook-form"
import { iEditTech, TechContext } from "../../contexts/TechContext";
import { ButtonStyled } from "../../styles/Button";
import { Input, Label, Select } from "../../styles/Input";
import { FormStyled } from "../Form";
import { ModalWrapper } from "./style";

export default function EditTechModal() {

    const {closeEditModal, editTech, cardInfo, removeTech} = useContext(TechContext)

    const {register, handleSubmit} = useForm<iEditTech>()

    return(
        <ModalWrapper>
            <FormStyled onSubmit={handleSubmit(editTech)}>
                <div className="formHeader">
                    <h3>Editar Tecnologia</h3>
                    <button onClick={() => closeEditModal()} type="button">x</button>
                </div>
                <div className="formBody">
                    <Label htmlFor="title">Nome</Label>
                    <Input readOnly id="title" placeholder="Nome da tecnologia" value={cardInfo?.techName} />

                    <Label htmlFor="status">Selecionar status</Label>

                    <Select id="status" {...register("status")} defaultValue={cardInfo?.techExperience}>
                        <option value="Iniciante">Iniciante</option>
                        <option value="Intermediário">Intermediário</option>
                        <option value="Avançado">Avançado</option>
                    </Select>
                    <input type="text" hidden {...register("id", {value: cardInfo?.id})}/>

                    <div className="buttonArea">
                        <ButtonStyled type="submit">Editar Tecnologia</ButtonStyled>
                        <ButtonStyled onClick={() => removeTech(
                            cardInfo !== null ? cardInfo.id : ""
                        )} btnStyle="grey-light" type="button">Deletar Tecnologia</ButtonStyled>
                    </div>
                </div>
            </FormStyled>
        </ModalWrapper>
    )
}
