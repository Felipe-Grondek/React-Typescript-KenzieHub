import { createContext, useContext, useEffect, useState } from "react"
import { iTechCardProps } from "../components/TechCard"
import axios from "axios"

import { instance } from "../services/api"
import { ToastError, ToastSucess } from "../services/toast"
import { UserContext } from "./UserContext"

interface iTechContextProps {
    children: React.ReactNode
}

interface iTechContext {
    modalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
    newTech: (dataForm: iNewTech) => void;
    removeTech: (id: string) => void;
    editTech: (dataForm: iEditTech) => void;
    modalEditOpen: boolean;
    openEditModal: (data: iTechCardProps) => void;
    closeEditModal: () => void;
    cardInfo: iTechCardProps | null;
}

export interface iNewTech {
    title: string;
    status: string;
}

export interface iEditTech {
    status: string;
    id: string;
}

export const TechContext = createContext({} as iTechContext)

export default function TechContextProvider({children}: iTechContextProps) {

    const [modalOpen, setModalOpen] = useState(false)
    const [modalEditOpen, setModalEditOpen] = useState(false)
    const [cardInfo, setCardInfo] = useState<iTechCardProps | null>(null)
    const [uptadeList, setUpdateList] = useState<string | null>(null)

    const {setUser, setLoading} = useContext(UserContext)

    useEffect(() => {

        async function reloadList() {
            const {data} = await instance.get("/profile")

            setUser(data)
        }
        
        if(uptadeList) {
            reloadList()
        }

    }, [uptadeList])

    function openModal() {
        setModalOpen(true)
    }

    function closeModal() {
        setModalOpen(false)
    }

    function openEditModal(data: iTechCardProps) {
        setCardInfo(data)
        setModalEditOpen(true)
    }

    function closeEditModal() {
        setModalEditOpen(false)
    }

    async function newTech(dataForm: iNewTech) {
        setLoading(true)
        try {
            const {data} = await instance.post("/users/techs", dataForm)
            setUpdateList(data)
            ToastSucess("Tecnologia registrada com sucesso!")

        } catch (error) {
            setLoading(false)
            console.log(error)

            if(axios.isAxiosError(error) && error.response) {
                if(error.response.data.message.includes("Already have")) {
                    return ToastError('Esta tecnologia já foi adicionada, você pode atualizar ou remover.')
                }
            }
            ToastError('Ops, algo deu errado! Tente novamente.')
        }
        setLoading(false)
    }

    async function removeTech(id: string) {
        setLoading(true)
        try {
            await instance.delete(`/users/techs/${id}`)
            setUpdateList(id)
        } catch (error) {
            ToastError('Ops, algo deu errado! Tente novamente.')
            console.log(error)
        }
        setLoading(false)
        setModalEditOpen(false)
    }

    async function editTech(dataForm: iEditTech) {
        setLoading(true)
        const {id, status} = dataForm
        try {
            await instance.put(`/users/techs/${id}`, {status})
            setUpdateList(`${id}, ${status}`)
            ToastSucess("Tecnologia atualizada com sucesso!")
        } catch (error) {
            setLoading(false)
            ToastError('Ops, algo deu errado! Tente novamente.')
            console.log(error)
        }
        setModalEditOpen(false)
        setLoading(false)
    }

    return(
        <TechContext.Provider value={{modalOpen, openModal, closeModal, newTech, removeTech, editTech, modalEditOpen, openEditModal, closeEditModal, cardInfo}}>
            {children}
        </TechContext.Provider>
    )
}