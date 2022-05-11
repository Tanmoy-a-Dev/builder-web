import grapesjs from "grapesjs";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./builder.css";

const MainBuilder = () => {
	const { name } = useParams();
	console.log(name);
	const [gEditor, setGEDitor] = useState(null);

	useEffect(() => {
		const editor = grapesjs.init({
			// Indicate where to init the editor. You can also pass an HTMLElement
			container: "#gjs",
			// Get the content for the canvas directly from the element
			// As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
			fromElement: true,
			// Size of the editor
			height: "95vh",
			width: "auto",
			// Disable the storage manager for the moment
			storageManager: false,
			// Avoid any default panel
			panels: { defaults: [] },

			// block manager for blocks
			blockManager: {
				appendTo: "#blocks",
				blocks: [
					{
						id: "section", // id is mandatory
						label: "Section", // can pass html/svg/plain text
						attributes: { class: "gjs-block-section" },
						draggable: false,
						content: `<section>
						<h1>This is a section</h1>
						<p>Just a p tag</p>
						</section>`,
					},
					{
						id: "text",
						label: "Text",
						content: `<div>Insert your text here</div>`,
					},
					{
						id: "image",
						label: "Image",
						content: { type: "image" },
						activate: true,
					},
				],
			},
		});
		// adding components using block api, it has other special features than just to add in blocks array
		editor.BlockManager.add("withApi", {
			label: "Block Api",
			content: {
				tagName: "div",
				draggable: true,
				attributes: { class: "outer-container" },
				components: [
					{
						tagName: "span",
						// content string will not be parsed
						// static content should be written in content
						content: `<b>This is just a content and it will be shown as text and it will not be parsed </b>`,
					},
					{
						tagName: "div",
						// components string will be parsed and transformed in Components
						// static content should not be written in components
						components: `<span>This is a component but it had been written like string</span>`,
					},
				],
			},
		});

		// setting panels using panels api
		editor.Panels.addPanel({
			id: "panel-top",
			el: ".panel_top",
		});
		editor.Panels.addPanel({
			id: "panel-basic",
			el: ".panel_basic-actions",
			buttons: [
				{
					id: "visibility",
					className: "btn-toggle-borders",
					label: `<u>B</u>`,
					command: "sw-visibility", // built-in command
				},
				{
					id: "export",
					className: "btn-open-export",
					label: "Ex",
					command: "export-template",
					context: "export-template", // for grouping context of other buttons on the same panel
				},
				{
					id: "json-format",
					className: "btn-show-json",
					label: "json",
					context: "show-json",
					command(editor) {
						editor.Modal.setTitle("Showing json format")
							.setContent(
								`<textarea style= "width: 100%; height: 300px">
							${JSON.stringify(editor.getComponents())}
						</textarea>`
							)
							.open();
					},
				},
			],
		});

		setGEDitor(editor);
	}, []);

	return (
		<div className="whole_container">
			<div className="panel_top">
				<div className="panel_basic-actions"></div>
			</div>
			<div id="gjs"></div>
			<div id="blocks"></div>
		</div>
	);
};

export default MainBuilder;
