import React from 'react';

const body = (props) => {
        return  (
        <div className="container responsive bg-secondar py-4 ">
            <div >
                {props.children}
            </div>
        </div>)
}

export default body;