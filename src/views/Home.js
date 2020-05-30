import React from "react";
import styled from "styled-components";
import { Editor } from "../components/common/editor";

const HolisContainer = styled.h3`
  color: red;
`;

export const Home = () => {
    return (
        <>
            <HolisContainer>Holis</HolisContainer>
            <Editor></Editor>
        </>

    );
};
