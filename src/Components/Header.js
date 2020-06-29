import React from 'react';

const header = (props) => {
        return  (<header className="container-fluid py-2 colorPagina">
            <div className="responsive">
            {props.children}
            </div>
        </header>)
}

export default header;