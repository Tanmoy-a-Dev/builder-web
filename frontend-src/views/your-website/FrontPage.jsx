import axios from "axios";
import DOMPurify from "dompurify";
import Parser, { domToReact } from "html-react-parser";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../apiUtils/apiUrl";

function FrontPage({ page }) {
	const [pageData, setPageData] = useState();
	console.log(page.datas);
	// page.datas.html
	const replaceObj = [{ "class=": "className=" }];
	const cleanHtmlString = DOMPurify.sanitize(pageData, {
		USE_PROFILES: { html: true },
	});
	console.log(page.id);

	useEffect(() => {
		const fetchPage = async () => {
			console.log(`${API_URL}/single-page/${page.id}`);
			const { data } = await axios.get(
				`http://localhost:5000/api/pages/single-page/${page.id}`,
				{
					withCredentials: true,
				}
			);
			setPageData(data.datas.html);
			console.log(data);
		};
		fetchPage();
	}, []);

	const htmlToJsx = replaceObj.reduce(
		(f, s) =>
			f.replace(new RegExp(Object.keys(s)[0], "g"), s[Object.keys(s)[0]]),
		cleanHtmlString
	);

	function parseWithLinks(text) {
		const options = {
			replace: ({ name, attribs, children }) => {
				if (name === "a" && attribs.href) {
					return <Link to={attribs.href}>{domToReact(children)}</Link>;
				}
			},
		};

		return Parser(text, options);
	}

	console.log(page);

	useEffect(() => {
		const style = document.createElement("style");
		document.head.appendChild(style);
		style.innerHTML = `${page.datas.css}`;
	}, [page]);

	return (
		<>
			<Link to="/" style={{ display: "none" }}>
				h
			</Link>
			{parseWithLinks(htmlToJsx)}
			{console.log(parseWithLinks(htmlToJsx))}
		</>
	);
}

export default FrontPage;
