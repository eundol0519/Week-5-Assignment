// Text.js

import React from 'react';
import styled from 'styled-components'

const Text = (props)=>{

    const {children, bold, color, size, margin} = props;
    const styles = {
        bold : bold,
        color : color,
        size : size,
        margin : margin
    }

    return(
        <React.Fragment>
            <P {...styles}>{children}</P>
        </React.Fragment>
    );
}

Text.defaultProps = {
    children : null,
    bold : false,
    color : "#22283",
    size : "14px",
    margin : "0px 0px 0px 20px"
};

const P = styled.p`
    font-weight : ${(props)=>(props.bold ? "600" : "400")};
    color : ${(props)=>props.color};
    font-size : ${(props)=>props.size};
    margin : ${(props)=>props.margin};
`

export default Text;