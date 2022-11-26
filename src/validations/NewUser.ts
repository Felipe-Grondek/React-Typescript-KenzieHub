import * as yup from "yup"

export const NewTechSchema = yup.object().shape({
    title: yup.string().required("O nome é obrigatório")
})
