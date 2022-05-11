// imports from node modules
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// importing css file
import "./App.css";
// importing config files
import { PANEL_ROUTES } from "./configs/route.config";
import { LoggedinUserProvider } from "./contexts/LoggedinUserContext";
import useGetData from "./hooks/useGetData";
// importing view files
import PanelLayout from "./panelLayout/PanelLayout.jsx";
import LoginScreen from "./views/authViews/login";
import MainBuilder from "./views/builderViews/BuilderMain.jsx";
import PageToView from "./views/PageToView.jsx";
import TempPage from "./views/TempPage.jsx";
import FrontPage from "./views/your-website/FrontPage.jsx";

function App() {
	// states
	const [pages, setPages] = useState([]);

	const {
		dataResponse: pageData,
		responseError: pagesResponseError,
		isLoading: pagesLoading,
	} = useGetData(`pages/show-pages`);

	useEffect(() => {
		pageData && setPages(pageData.pages);
	}, [pageData]);

	// pageData && console.log(pageData.pages);
	// useEffect(() => {
	// 	const fetchPages = async () => {
	// 		try {
	// 			const { data } = await axios.get(
	// 				"http://localhost:5000/api/pages/show-pages"
	// 			);
	// 			setPages(data.pages);
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	};
	// 	fetchPages();
	// }, []);
	return (
		<Router>
			<div className="App">
				<Switch>
					<Route exact path="/" component={TempPage} />

					{/* auth routes */}
					<Route exact path="/login" component={LoginScreen} />

					<Route path="/admin-panel/page-builder/edit/:name">
						<MainBuilder />
					</Route>

					{/* website pages routes */}
					{pages.length &&
						pages.map((page) => (
							<Route exact path={page.pageSlug} key={page.pageName}>
								<FrontPage page={page} />
							</Route>
						))}

					{/* admin panel routes */}
					<LoggedinUserProvider>
						<PanelLayout>
							{PANEL_ROUTES.map((route) => (
								<Route exact path={route.slug} key={route.slug}>
									<PageToView route={route.slug} />
								</Route>
							))}
						</PanelLayout>
					</LoggedinUserProvider>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
