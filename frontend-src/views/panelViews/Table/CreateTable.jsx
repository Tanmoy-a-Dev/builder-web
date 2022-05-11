import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { changeData } from "../../../apiUtils/api-crud.js";
import SignedBtn from "../../../components/buttons/SignedBtn.jsx";
import FormFooter from "../../../components/form/FormFooter";
import SelectField from "../../../components/FormFields/SelectField.jsx";
import StringField from "../../../components/FormFields/StringField.jsx";
import {
	errFunc,
	inputChangeHandler,
	inputObjectChangeHandler
} from "../../../generalFunctions/functions";

function CreateTable() {
	const [inputList, setInputList] = useState([
		{ fieldName: "", type: "STRING", allowNull: false },
	]);
	const [tablename, setTableName] = useState("");
	const [error, setError] = useState("");
	const history = useHistory();

	// handle input change
	// const handleInputChange = (e, index) => {
	//     const { name, value } = e.target;
	//     const list = [...inputList];
	//     list[index][name] = value;
	//     console.log(index)
	//     setInputList(list);
	// };

	// handle click event of the Remove button
	const handleSave = async (e) => {
		e.preventDefault();
		let obj = {};
		// console.log(inputList)
		inputList.forEach((item) => {
			let name = item.fieldName;
			item.allowNull === "True"
				? (item.allowNull = true)
				: (item.allowNull = false);
			obj[name] = {
				type: `DataTypes.${item.type}`,
				allowNull: item.allowNull,
			};
		});

		let data = {
			tablename: tablename,
			tableInfo: obj,
		};
		console.log(data);

		const { error: submitError } = await changeData(
			"private/create-table",
			"post",
			{
				tablename: tablename,
				tableInfo: obj,
			}
		);
		submitError
			? errFunc(setError, submitError)
			: history.push("/admin-panel/tables/show");
	};
	const handleRemoveClick = (index) => {
		const list = [...inputList];
		list.splice(index, 1);
		setInputList(list);
	};

	// handle click event of the Add button
	const handleAddClick = () => {
		setInputList([
			...inputList,
			{ fieldName: "", type: "STRING", allowNull: false },
		]);
	};

	return (
		<>
			{/* {!check ? <h1>You are not authorized</h1> : */}

			<form onSubmit={handleSave}>
				{error && (
					<div className="bg-danger msgDiv">
						<p>{error}</p>
					</div>
				)}
				<StringField
					label="Table Name"
					id="tablename"
					name="tablename"
					required={true}
					inputType="text"
					inputValue={tablename}
					setStateValue={setTableName}
					inputDefaultValue=""
					onChangeFunc={inputChangeHandler}
				/>

				{inputList.map((x, i) => {
					return (
						<div className="row" key={i}>
							<StringField
								label="Column Name :"
								id="columnname"
								name="fieldName"
								required={true}
								inputType="text"
								inputValue={x.fieldName}
								stateValue={inputList}
								setStateValue={setInputList}
								inputDefaultValue=""
								index={i}
								onChangeFunc={inputObjectChangeHandler}
							/>

							<SelectField
								label="Datatypes :"
								id="datatypes"
								name="type"
								value={x.type}
								optionsArray={[
									{ id: 1, name: "STRING" },
									{ id: 2, name: "INTEGER" },
									{ id: 3, name: "DATE" },
								]}
								stateValue={inputList}
								setStateValue={setInputList}
								index={i}
								onChangeFunc={inputObjectChangeHandler}
							/>

							<SelectField
								label="Allow Null Value :"
								id="nullValue"
								name="allowNull"
								value={x.allowNull}
								optionsArray={[
									{ id: 1, name: "False" },
									{ id: 2, name: "True" },
								]}
								stateValue={inputList}
								setStateValue={setInputList}
								index={i}
								onChangeFunc={inputObjectChangeHandler}
							/>

							<div className="row mt-2 mb-5">
								{inputList.length !== 1 && (
									<SignedBtn
										sign="minus"
										index={i}
										onClickFunc={handleRemoveClick}
									/>
								)}

								{inputList.length - 1 === i && (
									<SignedBtn sign="plus" onClickFunc={handleAddClick} />
								)}
							</div>
						</div>
					);
				})}

				<FormFooter button="Create Table" />
			</form>
		</>
	);
}

export default CreateTable;
