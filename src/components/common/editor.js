import React from "react";
import EditorJS from '@editorjs/editorjs';

import styled from "styled-components";

const Contenedor = styled.div`
    width: 100%;
    max-width: 70vw;
    margin: 0 auto;
    background: #fff;
    border-radius: 8px;
    -webkit-box-shadow: 0 24px 24px -18px rgba(69,104,129,.33), 0 9px 45px 0 rgba(114,119,160,.12);
    box-shadow: 0 24px 24px -18px rgba(69,104,129,.33), 0 9px 45px 0 rgba(114,119,160,.12);
    padding: 70px 50px;
    font-size: 16px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
`;

const editor = new EditorJS('editorjs');

export const Editor = () => {

    return (
        <>
            <Contenedor>
                <div id="editorjs"></div>
            </Contenedor>
        </>
    );
};
