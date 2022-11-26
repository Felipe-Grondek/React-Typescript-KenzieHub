import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { TechContext } from "../../contexts/TechContext";
import { useNavigate } from "react-router-dom";

import { Title } from "../Register/style";
import { Container } from "../../components/Container";
import  TechCard, { EmptyCard }  from "../../components/TechCard"
import { ButtonStyled, LinkStyled } from "../../styles/Button";
import { Header, Main, NavStyled, TechList } from "./style";
import AddTechModal from "../../components/AddTechModal";
import EditTechModal from "../../components/EditTechModal";
import {AnimatePresence, motion} from "framer-motion"

export default function Dashboard() {

    const navigate = useNavigate()
    const token = localStorage.getItem("@Kenziehub:token")

    useEffect( () => {
        if(!token) {
            return navigate("/login")
        } 
    }, [])

    const {logoutFn, user, loadingDashboard} = useContext(UserContext)
    const {modalOpen, openModal, modalEditOpen} = useContext(TechContext)

    if(loadingDashboard) {
        return null
    }

    if(user === null) {
        return null
    }

    return (
        <>
            <NavStyled>
                <Container>
                    <Title>Kenzie Hub</Title>
                    <LinkStyled btnstyle="grey" btnsize="big" onClick={logoutFn} to="/login">Sair</LinkStyled>
                </Container>
            </NavStyled>
            <Header>
                <Container>
                    <h2>Olá, {user?.name}</h2>
                    <h3>{user?.course_module}</h3>
                </Container>
            </Header>
            <Main>
                <Container>
                    <h2>Tecnologias</h2>
                    <ButtonStyled onClick={() => openModal()} btnSize="small" btnStyle="grey">+</ButtonStyled>
                    <AnimatePresence>
                    {modalOpen && 
                        <motion.div 
                            style={{position: "absolute"}}
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                        >
                            <AddTechModal />
                        </motion.div>}
                        {modalEditOpen && 
                        <motion.div 
                            style={{position: "absolute"}}
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                        >
                            <EditTechModal />
                        </motion.div>}
                    </AnimatePresence>
                    <TechList>
                        {user.techs.length < 1 ?
                            <EmptyCard message="Nenhuma tecnologia foi adicionada!" /> 
                            :
                            user.techs.map((tech) => {
                            return <TechCard 
                            key={tech.id} 
                            id={tech.id}
                            techName={tech.title} 
                            techExperience={tech.status}
                            />
                        })}
                    </TechList>
                </Container>
            </Main>
        </> 
    )
}
