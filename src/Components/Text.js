import React from 'react';

const text = (props) => {
        return  (<header className="" >
            <div>
            {props.children}
            </div>
        </header>)
}

export default text;