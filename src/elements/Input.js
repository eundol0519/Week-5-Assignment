// Input.js

import React from 'react';
import styled from 'styled-components'
import { Text } from '../elements';

const Input = (props)=>{

    const { label, placeholder, _onChange, _onKeyUp, type } = props

    return(
        <React.Fragment>
            <Text>{label}</Text>
            <InputBox type={type} placeholder={placeholder} onChange={_onChange} onKeyUp={_onKeyUp}></InputBox>
        </React.Fragment>   
    );
}

Input.defaultProps = {
    label : "텍스트",
    placeholder : "텍스트를 입력 해주세요",
    type : "text",
    _onChange : () => {},
    _onKeyUp : () => {},
};

const InputBox = styled.input`
    border : 1px solid #212121;
    width : 100%;
    height : 50px;
    padding : 12px 4px;
    box-sizing: border-box;
`

export default Input;