import React from 'react';
import { useHistory } from 'react-router-dom';

function FormFooter({ button }) {
    const history = useHistory();
    return (
        <div className="card-footer mt-5 formFooter">
            {/* <button
                className="btn btn-danger"
                // onClick={() => history.goBack()}
            >
                Cancel
            </button> */}
            <button type='submit' className="btn btn-primary float-right">{button}</button>
        </div>
    )
}

export default FormFooter
