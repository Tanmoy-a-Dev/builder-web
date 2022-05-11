export function errFunc(setState, state) {
	setState(state);
	return setTimeout(() => {
		setState("");
	}, 5000);
}

export function msgFunc(setState, msg) {
	setState(msg);
	return setTimeout(() => {
		setState("");
	}, 1000);
}

export function statesEqualityCheck(
	stateObj = {},
	stateObjKey = "",
	stateOne = "",
	stateTwo,

	setStateObj = function () {
		return;
	},
	setStateOne,
	setStateTwo,

	errorState,
	setErrorState
) {
	if (
		typeof stateObj === "object" &&
		!Array.isArray(stateObj) &&
		stateObj !== null &&
		Object.keys(stateObj).length > 0
	) {
		if (stateObj[stateObjKey] !== stateTwo) {
			setStateObj({ ...stateObj, [stateObjKey]: "" });
			setStateTwo("");
			errFunc(setErrorState, errorState);
			// console.log(errorState)
			return false;
		}
	} else if (!Object.keys(stateObj).length > 0) {
		if (stateOne !== stateTwo) {
			setStateOne(null);
			setStateTwo(null);
			return false;
		}
	} else {
		return true;
	}
}

export function handleArrayStateChange(arr, str, setState) {
	let find = arr.indexOf(str);
	find > -1 ? arr.splice(find, 1) : arr.push(str);
	return setState(arr);
}

export function fileChangeHandler(event, setFileState, setTempImageState) {
	const file = event.target.files[0]; 
	previewFile(file, setTempImageState);
	// let temp_path = URL.createObjectURL(event.target.files[0]); 
	// setTempImageState(temp_path);
	setFileState(event.target.files[0]);
}


const previewFile = (file, setPreviewState) => {
	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onloadend = () => {
		setPreviewState(reader.result)
	}
} 

export function uploadImage(base64EncodedImage) {
	console.log(base64EncodedImage);
}

export function inputObjectChangeHandler(
	e,
	setObjState,
	objState,
	index = null
) {
	const { name, value } = e.target;
	if (index !== null) {
		const list = [...objState];
		list[index][name] = value;
		setObjState(list);
	} else {
		setObjState({ ...objState, [name]: value });
	}
}

export function inputChangeHandler(e, setState) {
	setState(e.target.value);
}

export function defaultCheckedFunc(arrState, param) {
	return arrState.includes(param);
}

export const camalize = function camalize(str) {
	return str
		.toLowerCase()
		.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
};

export const singleMember = function (obj) {
	for (let prop in obj) {
		if (obj.hasOwnProperty(prop)) {
			return prop;
		}
	}
};
