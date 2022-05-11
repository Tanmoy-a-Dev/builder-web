import React, { useEffect, useState } from "react";
import { changeData } from "../../../apiUtils/api-crud";
import LinkedBtn from "../../../components/buttons/LinkedBtn.jsx";
import Table from "../../../components/table/Table.jsx";
import { errFunc, msgFunc } from "../../../generalFunctions/functions";
import useGetData from "../../../hooks/useGetData";

function ShowTables() {
	const [tables, setTables] = useState([]);
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");

	const {
		dataResponse: allTables,
		responseError: tablesResponseError,
		isLoading: tablesLoading,
	} = useGetData("private/get-tables");

	useEffect(() => {
		if (allTables) setTables(allTables.tables);
	}, [allTables]);

	const dropTable = async (id) => {
		const { data: deletedData, error: deleteError } = await changeData(
			`private/drop-table/${id}`,
			"delete"
		);
		deleteError
			? errFunc(setError, deleteError)
			: msgFunc(setMessage, "deleted");
		const newTableList = tables.filter(table => table.tablename !== deletedData.tablename)
		setTables(newTableList)
	};

	return (
		<>
			{tablesLoading && <h1>Loading...</h1>}
			{tablesResponseError && <h1>{tablesResponseError}</h1>}
			{/* {!check ? <h1>You do not have permission for this action, Contact with your admin</h1> */}

			<div>
				<div className="upper-div">
					{message && <h1>{message}</h1>}
					{error && <h1>{error}</h1>}
					<LinkedBtn
						link="/admin-panel/tables/create"
						btnTxt="Add Table"
						btnClass="btn-success add-btn"
					/>
				</div>

				<Table
					headers={[{ Tablename: "string" }, { "Table Columns": "string" }]}
					tableData={tables}
					func={dropTable}
				/>
				{/* <div className="card-body table-responsive p-0">
                        <table className="table text-nowrap">
                            <thead>

                                <tr>
                                    <th>#</th>
                                    <th>Tablename</th>
                                    <th>Table Columns</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tables.map((table, index) => (

                                    <tr key={table.id}>
                                        <td>{index + 1}</td>
                                        <td>{table.tablename}</td>
                                        <td>
                                            {table.tableColumns.map(column => (
                                                <p key={column}>{column}</p>
                                            ))}
                                        </td>
                                        <td>
                                            
                                                <button
                                                    onClick={() => dropTable(table.id)}
                                                    className='btn btn-danger'
                                                >
                                                    Delete
                                                </button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div> */}
			</div>
		</>
	);
}

export default ShowTables;
