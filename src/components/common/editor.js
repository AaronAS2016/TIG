import React, { useEffect } from "react";
import EditorJS from '@editorjs/editorjs';
import {createRepository} from '../../services/shell'

import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    max-width: 60vw;
    margin: 0 auto;
    background: #fff;
    border-radius: 8px;
    -webkit-box-shadow: 0 24px 24px -18px rgba(69,104,129,.33), 0 9px 45px 0 rgba(114,119,160,.12);
    box-shadow: 0 24px 24px -18px rgba(69,104,129,.33), 0 9px 45px 0 rgba(114,119,160,.12);
    padding: 70px 50px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
`;

const GitPushButton = styled.button`
    padding: 20px;
    border-radius: 8px;
    cursor: pointer;
`
const editor = new EditorJS('editorjs');

export const Editor = () => {

    useEffect(() => {

    });
    function logBlocks() {

        createRepository("jeremias");
        
        editor.save().then((outputData) => {
            // git ls-remote --exit-code -h "$REPO_URL"
            console.log('Article data: ', outputData)

            // git.add([])
        }).catch((error) => {
            console.log('Saving failed: ', error)
        });
    }


    return (
        <>
            <GitPushButton onClick={() => logBlocks()}>Enviar cambios</GitPushButton>
            <Container>
                <div id="editorjs"></div>
            </Container>
        </>
    );
};
