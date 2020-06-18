import React from 'react';

const header = (props) => {
        return  (<header className="container-fluid bg-succes py-4 alert-primary" >
            <div className="container" className="responsive">
            {props.children}
            </div>
        </header>)
}

export default header;