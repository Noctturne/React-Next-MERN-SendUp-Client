import React, {useContext, useState} from 'react';
import FileContext from '../../context/files/fileContext';

const Form = () => {
    const FileContexts = useContext(FileContext);
    const {addPass, addDownloads} = FileContexts;

    const [havePass, setHavePass] = useState(false);

    return(
        <div className="uk-text-center">
            <label className="uk-form-label uk-light"> Delete after: </label>
              <select onChange={e => addDownloads(parseInt(e.target.value))} className="uk-input uk-select">
                    <option defaultValue="" selected disabled>-- Downloads --</option>
                    <option value="1"> One </option>
                    <option value="5"> Five </option>
                    <option value="10"> Ten </option>
            </select>
            <div className="uk-margin-small">
                <label className="uk-form-label uk-light"> Protect with password: </label>
                <input  onChange={() => setHavePass(!havePass)} className="uk-checkbox uk-margin-right uk-margin-left" type="checkbox"></input>
                {havePass ? (               
                     <input onChange={e => addPass(e.target.value)}  className="uk-input uk-form-width-large" type="password" 
                        id="password"></input>
                ): null }
                </div>
        </div>
    )
}

export default Form;