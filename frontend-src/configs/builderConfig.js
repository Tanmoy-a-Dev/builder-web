import gjsBlocksBasic from "grapesjs-blocks-basic";
import { API_URL } from "../apiUtils/api-builder";
const BuilderConfig = (pagename) => {
	return {
		// Indicate where to init the editor. You can also pass an HTMLElement
		container: "#editor",
		plugins: [gjsBlocksBasic],
		pluginsOpts: {
			gjsBlocksBasic: {},
		},
		storageManager: {
			autosave: false,
			setStepsBeforeSave: 1,
			type: "remote",
			urlStore: `${API_URL}/update-page/${pagename}`,
			urlLoad: `${API_URL}/single-page/${pagename}`,
			contentTypeJson: true,
		},
	};
};

export default BuilderConfig;
