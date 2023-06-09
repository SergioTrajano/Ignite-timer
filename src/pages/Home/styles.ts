import { styled } from "styled-components";

export const HomeContainer = styled.main`
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3.5rem;
    }
`;

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

export const CountDownContainer = styled.div`
    font-family: "Roboto Mono", monospace;
    font-size: 10rem;
    line-height: 8rem;
    color: ${(props) => props.theme["gray-100"]};

    display: flex;
    gap: 1rem;

    span {
        background-color: ${(props) => props.theme["gray-700"]};
        padding: 2rem 1rem;
        border-radius: 8px;
    }
`;

export const CountDownSeparator = styled.div`
    width: 4rem;
    padding: 2rem 0;

    display: flex;
    justify-content: center;
    overflow: hidden;

    color: ${(props) => props.theme["green-500"]};
`;

const BaseCountDownButton = styled.button`
    width: 100%;
    border: 0;
    padding: 1rem;
    border-radius: 8px;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    font-weight: bold;
    color: ${(props) => props.theme["gray-100"]};

    cursor: pointer;

    &:disabled {
        opacity: 0.7;

        cursor: not-allowed;
    }

    transition: background-color 0.5s;
`;

export const StartCountDownButton = styled(BaseCountDownButton)`
    background-color: ${(props) => props.theme["green-500"]};

    &:not(:disabled):hover {
        background-color: ${(props) => props.theme["green-700"]};
    }
`;

export const StopCountDownButton = styled(BaseCountDownButton)`
    background-color: ${(props) => props.theme["red-500"]};

    &:not(:disabled):hover {
        background-color: ${(props) => props.theme["red-700"]};
    }
`;
