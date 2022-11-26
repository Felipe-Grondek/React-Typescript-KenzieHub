import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { instance } from "../services/api"
import axios from "axios"

import {ToastError, ToastSucess} from "../services/toast"

interface iUserContextProps {
    children: React.ReactNode
}

interface iUserTechs {
    created_at: string;
    id: string;
    status: string;
    title: string;
    updated_at: string;
}

interface iUserWorks {
    id: string;
    title: string;
    description: string;
    deploy_url: string;
    created_at: string;
    updated_at: string;
}

interface iUser {
    avatar_url: string | null;
    bio: string;
    contact: string;
    course_module: string;
    created_at: string;
    email: string;
    id: string;
    name: string;
    techs: iUserTechs[];
    updated_at: string;
    works: iUserWorks[];
}

interface iUserContext {
    registerUser: (dataForm: iFormRegister) => void;
    loginFn: (dataForm: iFormLogin) => void;
    logoutFn: () => void;
    user: iUser | null;
    setUser: React.Dispatch<React.SetStateAction<iUser | null>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    loadingDashboard: boolean;
}

export interface iFormLogin {
    email: string;
    password: string;
}

export interface iFormRegister {
    email: string;
    password: string;
    confirmPassword?: string;
    name: string;
    bio: string;
    contact: string;
    course_module: string;
}

export const UserContext = createContext({} as iUserContext)

export default function UserContextProvider({children}: iUserContextProps) {

    const navigate = useNavigate()
    const [user, setUser] = useState<iUser | null>(null)
    const [loading, setLoading] = useState(true)
    const [loadingDashboard, setLoadingDashboard] = useState(true)

    useEffect(() => {
        async function loadUser() {
            const token = localStorage.getItem("@Kenziehub:token")

            if(token) {
                instance.defaults.headers.authorization = `Bearer ${token}`

                try {
                    const {data} = await instance.get("/profile")
                    setUser(data)
                } catch (error) {
                    console.log(error)
                }
            }
            setLoading(false)
            setLoadingDashboard(false)
        }

        loadUser()
    }, [])

    async function registerUser(dataForm: iFormRegister) {
        delete dataForm.confirmPassword

        try {
            const {data} = await instance.post("/users", dataForm)
            ToastSucess('Conta criada com sucesso!')
            navigate("/login")
            
        } catch (error) {
            console.log(error)

            if(axios.isAxiosError(error) && error.response) {
                if(error.response.data.message.includes("exists")) {
                    return ToastError('E-mail já cadastrado!')
                }
            }

            ToastError('Ops, algo deu errado! Tente novamente.')
        }
    }

    async function loginFn(dataForm: iFormLogin) {
        setLoading(true)
        try {
            const {data} = await instance.post("/sessions", dataForm)
            ToastSucess('Login realizado com sucesso!')
            const {user: userResponse, token} = data

            instance.defaults.headers.authorization = `Bearer ${token}`
            
            setUser(userResponse)
            localStorage.setItem("@Kenziehub:token", token)
    
            navigate("/dashboard", {replace: true})
        } catch (error) {
            console.log(error)
            ToastError('Verifique o email e senha e tente novamente!')
        }

        setLoading(false)
    }

    function logoutFn() {
        localStorage.removeItem("@Kenziehub:token")
        setUser(null)
    }

    return(
        <UserContext.Provider value={{registerUser, loginFn, logoutFn, user, setUser, loading, setLoading, loadingDashboard}}>
            {children}
        </UserContext.Provider>
    )
}
