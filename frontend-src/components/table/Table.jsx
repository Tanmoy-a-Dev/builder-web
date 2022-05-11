import React from "react";
import { camalize } from "../../generalFunctions/functions";
import FunctionedBtn from "../buttons/FunctionedBtn.jsx";
import LinkedBtn from "../buttons/LinkedBtn.jsx";

function Table(props) {
	const {
		headers = [],
		tableData = [],
		imgFolder = "",
		link = "",
		func = function () {
			return;
		},
		actionBtns = true,
	} = props;

	// function importAll(r) {
	// 	let images = {};
	// 	r.keys().map((item, index) => {
	// 		images[item.replace("../", "")] = r(item);
	// 	});
	// 	return images;
	// }

	// const imgs = importAll(
	// 	require.context("../../../Images/avatars", false, /\.(png|jpe?g|svg)$/i)
	// );

	// console.log(imgFolder);

	const singleMember = function (obj) {
		for (let prop in obj) {
			if (obj.hasOwnProperty(prop)) {
				return prop;
			}
		}
	};

	return (
		<>
			<div className="row mt-3">
				<div className="col-12">
					<div className="card">
						<div className="card-body table-responsive p-0">
							<table className="table text-nowrap bg-dark ">
								<thead>
									<tr>
										{headers.map((header, index) => (
											<th key={index}>{singleMember(header)}</th>
										))}
										{actionBtns && <th>Actions</th>}
									</tr>
								</thead>
								<tbody>
									{tableData.map((rowData, index) => (
										<tr key={index}>
											{headers.map((header, index) => {
												const headerItem = singleMember(header);
												const item = camalize(headerItem);

												const imgsrc =
													header[headerItem] === "image" &&
													rowData[item] === "null"
														? require(`../../../Images/download.png`)
														: imgFolder[`./${rowData[item]}`];

												// header[headerItem] === "image" &&
												// 	console.log(imgs[`./${rowData[item]}`]);

												return header[headerItem] === "image" ? (
													<td key={index}>
														<img
															src={rowData[item]}
															alt="profile-avatar"
															className="user-avatar"
														/>
													</td>
												) : Array.isArray(rowData[item]) ? (
													<td key={index}>
														<ol>
															{rowData[item].map((data, index) => (
																<li key={index}>{data}</li>
															))}
														</ol>
													</td>
												) : typeof rowData !== "object" ? (
													<td key={index}>
														<span>{rowData}</span>
													</td>
												) : (
													<td key={index}>
														<span>{rowData[item]}</span>
													</td>
												);
											})}
											{actionBtns && (
												<td>
													{link !== "" && (
														<LinkedBtn
															link={link}
															id={rowData.id}
															btnTxt="Update"
															btnClass="btn-primary mr-3"
														/>
													)}
													<FunctionedBtn
														func={func}
														id={rowData.id}
														btnTxt="Delete"
														btnClass="btn-danger"
													/>
												</td>
											)}
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Table;
