import React from 'react';

const body = (props) => {
        return  (
        <body className="container responsive bg-secondar py-4 " >
            <div >
                {props.children}
            </div>
        </body>)
}

export default body;