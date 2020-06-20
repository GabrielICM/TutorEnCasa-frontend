import React from 'react';

const body = (props) => {
        return  (
        <div className="container responsive bg-secondar py-4 "  className="center" >
            <div >
                {props.children}
            </div>
        </div>)
}

export default body;