// Write.js

import React, { useRef, useEffect, useState } from 'react';

import Quill from 'quill';
import 'quill/dist/quill.snow.css';

import { useSearchParams } from 'react-router-dom';


import { useSelector, useDispatch } from "react-redux"


import styled from 'styled-components';


import { initialize } from '../../../modules/write';






const TitleInput = styled.input`
    font-size: 2rem;
    outline: none;
    padding-bottom: 23px;
    border: none;
    border-bottom: 5px double #ddd;
    width: 996px;
`

const QuillDiv = styled.div`
    margin: 30px auto;
    margin-bottom: 75px;
    width: 960px;
    height: 500px;
    .ql-editor{
        padding: 20px;
        min-height: 320px;
        font-size: 1.125rem;
        line-height: 1.5;
    }
    .ql-editor.ql-blank::before{
        left: 20px;
    }
`



const Write = (props) => {

    const {postings, title, change_content, onChange} = props;


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
                // console.log(quill.root.innerHTML); // 이렇게쓰닉까 p태그 붙어서 나옴
                change_content(quill.root.innerHTML)
            }
            // if(source==='user'){
            //     onChangeField({key: 'body', value: quill.root.innerHTML});
            // }
        })
        return () => {
            initialize()
        }
    }, [initialize])

    // const mounted = useRef(false);
    useEffect(()=>{
        // if(mounted.current) return;
        // mounted.current = true;
        quillInstance.current.root.innerHTML = update_content;
    }, [])




    return (
        <div>

            <TitleInput value={title}
                        onChange={onChange}
                        placeholder='제목을 입력하세요'/>


            <QuillDiv>
                <div ref={quillElement}/>
            </QuillDiv>

        </div>
    );
};

export default Write;