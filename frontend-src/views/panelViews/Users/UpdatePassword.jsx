import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { changeData } from '../../../apiUtils/api-crud';
import Form from '../../../components/form/Form.jsx';
import { errFunc, inputChangeHandler } from '../../../generalFunctions/functions';

function UpdatePassword() {

    const { id } = useParams();
    const history = useHistory();
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');


    const changePassword = async (e) => {
        e.preventDefault();

        if (password !== confirmpassword) {
            errFunc(setError, "Password do not matched")
            setPassword('');
            setConfirmPassword('');
        }
        else {
            const { error: submitError } = await changeData(
                `private/update-password/${id}`,
                "put",
                {password}
            );
            submitError
                ? errFunc(setError, submitError)
                : history.push("/admin-panel/profile");
            // try {
            //     await axios.put(
            //         `${process.env.REACT_APP_BACKLINK}/api/private/update-password/${id}`,
            //         { password },
            //         { withCredentials: true }
            //     );
            //     await axios.get(`${process.env.REACT_APP_BACKLINK}/api/auth/logout`, { withCredentials: true });
            //     history.push("/login");
            // }
            // catch (err) {
            //     setError(error.response.msg)
            // }
        }

    }
    const inputArr = [
        {
            fieldType: "string",
            label: "Password",
            id: "password",
            name: "password",
            required: true,
            inputType: "password",
            inputValue: password,
            setStateValue: setPassword,
            inputDefaultValue: "",
            onChangeFunc: inputChangeHandler,
        },
        {
            fieldType: "string",
            label: "Confirm Password",
            id: "confirmpassword",
            name: "confirmpassword",
            required: true,
            inputType: "password",
            inputValue: confirmpassword,
            setStateValue: setConfirmPassword,
            inputDefaultValue: "",
            onChangeFunc: inputChangeHandler,
        },
    ]

    return (
        <>
            <Form
                errorText={error}
                fields={inputArr}
                onSubmitMethod={changePassword}
                submitBtnTxt="Update Password"
            />
          
                    {/* <form onSubmit={changePassword} className='row'>
                {error && <h1>{error}</h1>}
                

                        <div className="form-group col-sm-6">
                            <label>Password:</label>
                            <input type="password" name="password" className="form-control"
                                autoComplete="true"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group col-sm-6">
                            <label>Confirm Password:</label>
                            <input type="password" className="form-control"
                                autoComplete="true"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <FormFooter button="Change Password" />
                    </form> */}
            {/* } */}

        </>
    )
}

export default UpdatePassword
