import styled from "styled-components";

export const Input = styled.input`
    background: var(--grey-2);
    color: var(--grey-0);
    border: 1px solid var(--grey-2);
    border-radius: 4px;

    padding: 0 16px;
    height: 48px;

    font-size: 16px;
    font-weight: 400;

    &:focus {
        color: var(--grey-0);

        outline: 2px solid var(--grey-1);
    }

    &::placeholder {
        color: var(--grey-1);
    }
`

export const Label = styled.label`
    font-size: 12px;
    font-weight: 400;

    margin: 18px 0 10px;

    display: inline-block;
    width: fit-content;
`

export const HelperText = styled.p`
    
`

export const Select = styled.select`
    width: 100%;
    padding: 0 22px;
    height: 48px;

    display: inline-flex;
    justify-content: center;
    align-items: center;

    border-radius: 4px;
    border: 1px solid var(--grey-2);

    background: var(--grey-2);
    color: var(--grey-0);
    font-size: 16px;
    font-weight: 500;

    transition: 0.26s;

    &:hover {
        transition: 0.26s;
        border-color: var(--grey-1);
    }

    option {
        color: var(--grey-0);
    }
`