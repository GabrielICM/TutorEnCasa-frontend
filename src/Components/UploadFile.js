import React, {Fragment, useState} from 'react';
import { data } from 'jquery';

const fileUpload = () => {

    const [fileName, setfileName] = useState('Elegir archivo');
    const [file, setfile] = useState('');

    const onChange = data => {
        setfile(data.target.files[0]);
        setfileName(data.target.files[0].name);
    };

    return(
        <Fragment>
            <div className="custom-file mt-4 upload center">
                <input type="file" name="file" className="custom-file-input" id="customFile" accept="application/pdf" onChange={onChange}/>
                <label className="custom-file-label" htmlFor="customFile">
                    {fileName}
                </label>
            </div> 
        </Fragment>
    );  
};

export default fileUpload;