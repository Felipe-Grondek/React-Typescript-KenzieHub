import axios from "axios"

const token = localStorage.getItem("@kenziehub:token")

export const instance = axios.create({
    baseURL: "https://kenziehub.herokuapp.com/",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    }
})
