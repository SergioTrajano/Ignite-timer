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
