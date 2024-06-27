// Write.js

import React, { useRef, useEffect } from 'react';

import Quill from 'quill';
import 'quill/dist/quill.snow.css';


import { useSelector } from "react-redux"


import styled, { css } from 'styled-components';


import { initialize } from '../../../modules/write';






const TitleInput = styled.input`
    font-size: 2rem;
    outline: none;
    padding-bottom: 23px;
    border: none;
    border-bottom: 5px double #ddd;
    width: 996px;
    ${(props)=>
        props.smallScreen && 
        css`
            width: 660px;
        `
    }
    ${(props)=>
        props.smallerScreen && 
        css`
            width: 350px;
            font-size: 1.7rem;
        `
    }
`

const QuillDiv = styled.div`
    margin: 30px auto;
    margin-bottom: 75px;
    width: 960px;
    height: 500px;
    .ql-editor{
        padding: 20px;
        min-height: 320px;
        font-size: 1.1rem;
        line-height: 1.5;
    }
    .ql-editor.ql-blank::before{
        left: 20px;
    }
    ${(props)=>
        props.smallScreen && 
        css`
            width: 660px;
            .ql-editor{
                width: 660px;
            }
        `
    }
    ${(props)=>
        props.smallerScreen && 
        css`
            width: 350px;
            margin: 30px auto;
            margin-bottom: 80px;
            .ql-editor{
                width: 350px;
                font-size: 1rem;
            }
        `
    }
`



const Write = (props) => {

    const {title, change_content, onChange, smallScreen, smallerScreen} = props;


    const {update_content} = useSelector((state)=>({
        update_content: state.write.content
    }));

    // console.log(update_content);



    // 양식
    const quillElement = useRef(null);
    const quillInstance = useRef(null);

    useEffect(()=>{
        quillInstance.current = new Quill(quillElement.current, {
            theme: 'snow',
            placeholder: '내용을 작성하세요',
            modules: {
                toolbar: [
                    [{header:"1"}, {header:"2"}],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{list: 'ordered'}, {list:'bullet'}],
                    ['blockquote', 'code-block', 'link', 'image'],
                ],
            },
        });

        const quill = quillInstance.current
        quill.on('text-change', (delta, oldDelta, source)=>{
            if(source==='user'){
                change_content(quill.root.innerHTML)
            }
        })
        return () => {
            initialize()
        }
    }, [initialize])

    useEffect(()=>{
        quillInstance.current.root.innerHTML = update_content;
    }, [])




    return (
        <div>

            <TitleInput value={title}
                        onChange={onChange}
                        placeholder='제목을 입력하세요'
                        smallScreen={smallScreen}
                        smallerScreen={smallerScreen}/>


            <QuillDiv smallScreen={smallScreen}
                      smallerScreen={smallerScreen}>
                <div ref={quillElement}/>
            </QuillDiv>

        </div>
    );
};

export default Write;