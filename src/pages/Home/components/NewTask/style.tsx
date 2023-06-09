import { styled } from "styled-components";

export const FormContainer = styled.div`
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    color: ${(props) => props.theme["gray-100"]};
    font-size: 1.125rem;
    font-weight: bold;
    flex-wrap: wrap;
`;

const BaseInput = styled.input`
    height: 2.5rem;
    background-color: transparent;
    border: 0;
    border-bottom: 2px solid ${(props) => props.theme["gray-500"]};
    padding: 0 0.5rem;

    font-size: 1.125rem;
    font-weight: bold;
    color: ${(props) => props.theme["gray-100"]};

    &:focus {
        box-shadow: none;
        border-color: ${(props) => props.theme["green-500"]};
    }

    &::placeholder {
        color: ${(props) => props.theme["gray-500"]};
    }

    &:disabled {
        cursor: not-allowed;
    }
`;

export const TaskInput = styled(BaseInput)`
    flex: 1;

    &::-webkit-calendar-picker-indicator {
        display: none !important;
    }
`;

export const MinutesAmountInput = styled(BaseInput)`
    width: 4rem;

    &:disabled {
        // desabilita setas no input
        /* Chrome, Safari, Edge, Opera */
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        /* Firefox */
        -moz-appearance: textfield;
    }
`;
