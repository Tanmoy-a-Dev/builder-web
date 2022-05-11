import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../apiUtils/api-builder";
import "./pages.css";

function BuilderPages() {
	const [name, setName] = useState("");
	const [slug, setSlug] = useState("");
	const [pages, setPages] = useState([]);
	const [isValid, setIsValid] = useState({ name: true, slug: true });

	const clearField = () => {
		setName("");
		setSlug("");
	};
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!name && !slug) {
			return setIsValid({ name: false, slug: false });
		} else if (!name) {
			return setIsValid({ name: false, slug: true });
		} else if (!slug) {
			return setIsValid({ name: true, slug: false });
		}

		const newP = { pageName: name, pageSlug: slug };
		console.log(newP);
		try {
			const { data } = await axios.post(`${API_URL}/create-page`, {
				pageName: name,
				pageSlug: slug,
			});
			console.log(data);
			const allPages = [...pages, data.page];
			setPages(allPages);
			setName("");
			setSlug("");
		} catch (err) {
			console.log(`Error: ${err.message}`);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`${API_URL}/show-pages`);
				// console.log(response.data);
				setPages(response.data.pages);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);

	return (
		<div className="container builder">
			<div className="row">
				<div className="col-12 mt-5">
					<form id="create-page">
						<div className="modal-header">
							<h5 className="modal-title" id="addPageModalLabel">
								Create Page
							</h5>
						</div>
						<div className="modal-body">
							<div className="col-auto">
								<label htmlFor="name" className="form-label">
									Name
								</label>
								<input
									type="text"
									className={`form-control form-control-sm ${
										isValid.name ? "" : "is-invalid"
									}`}
									id="name"
									name="name"
									placeholder="Name of Page"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
								{!isValid.name && (
									<div className="invalid-feedback">
										Please provide a valid name.
									</div>
								)}
							</div>
							<div className="col-auto">
								<label htmlFor="slug" className="form-label">
									Slug
								</label>
								<input
									type="text"
									className={`form-control form-control-sm ${
										isValid.slug ? "" : "is-invalid"
									}`}
									id="slug"
									name="slug"
									placeholder="Slug of Page"
									value={slug}
									onChange={(e) => setSlug(e.target.value)}
								/>
								{!isValid.slug && (
									<div className="invalid-feedback">
										Please provide a valid Slug.
									</div>
								)}
							</div>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary btn-sm"
								data-bs-dismiss="modal"
								onClick={clearField}>
								Clear
							</button>
							<button
								type="button"
								className="btn btn-primary btn-sm"
								onClick={handleSubmit}>
								Save
							</button>
						</div>
					</form>
				</div>
				<div className="col-12 my-2">
					<table className="table table-bordered table-hover">
						<thead>
							<tr>
								<td>ID</td>
								<td>Name</td>
								<td>Slug</td>
								<td>Action</td>
							</tr>
						</thead>
						<tbody>
							{pages ? (
								pages.map((page) => (
									<tr key={page.id}>
										<td>{page.id}</td>
										<td>{page.pageName}</td>
										<td>{page.pageSlug}</td>
										<td>
											<Link to={`/admin-panel/page-builder/edit/${page.id}`}>
												Edit
											</Link>
											<Link to={`${page.pageSlug}`}>page</Link>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td>No Pages</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default BuilderPages;
