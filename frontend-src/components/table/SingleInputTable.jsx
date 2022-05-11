import React from "react";
import CheckField from "../FormFields/CheckField.jsx";

function SingleInputTable({
	headers = [],
	tableData = [],
	checkedState,
	setState,
}) {
	const firstElement = headers.length && headers[0].toLowerCase();
	// console.log(checkedState);
	return (
		<div className="row mt-3">
			<div className="col-12">
				<div className="card">
					<div className="card-body table-responsive p-0">
						<table className="table text-nowrap bg-dark ">
							<thead>
								<tr>
									{headers.map((header, index) => (
										<th key={index}>{header}</th>
									))}
								</tr>
							</thead>
							<tbody>
								{tableData.map((rowData, index) => (
									<tr key={index}>
										<td className="hello">{rowData.displayName}</td>
										<td>
											<CheckField
												id={rowData[firstElement]}
												defaultFuncParam={rowData[firstElement]}
												checkedState={checkedState}
												setState={setState}
											/>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SingleInputTable;
