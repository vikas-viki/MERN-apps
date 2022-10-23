import React from 'react';

function Alert(props) {
    // console.log('alert re renderred')
    const capsCase = (word) => {
        const lowerWord = word.toLowerCase();
        return lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1)
    }
    const AStyle = {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10px'
    }
    return (
        <div className="container" style={AStyle}>
            {
                props.alert && <div className={`alert  alert-dismissible fade show alert-${props.alert.type}`} role="alert">
                    <strong>{capsCase(props.alert.type)}:</strong> {props.alert.msg}
                </div>}
        </div>
    )
}

export default Alert