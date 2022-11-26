import { useContext } from "react";
import { FaRegTrashAlt } from "react-icons/fa"
import { TechContext } from "../../contexts/TechContext";

import { CardStyled } from "./style";

export interface iTechCardProps {
    techName: string;
    techExperience: string;
    id: string;
}

export default function TechCard({techName, techExperience, id}: iTechCardProps) {

    const {removeTech, openEditModal} = useContext(TechContext)

    return(
        <CardStyled
        >   
            <div className="clickContainer"
                onClick={() => openEditModal({techExperience, techName, id})}
            >
                <h3>{techName}</h3>
                <h4>{techExperience}</h4>
            </div>
            <div className="cardContainer">
                <button onClick={() => removeTech(id)}><FaRegTrashAlt className="trashIcon" /></button>
            </div>
        </CardStyled>
    )
}

export function EmptyCard({message}: {message: string}) {

    return(
        <CardStyled>
            <h3>{message}</h3>
        </CardStyled>
    )
}