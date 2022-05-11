import React from "react";

function FunctionedBtn({ func, id, btnTxt, btnClass }) {
	// console.log(func, id, btnTxt);
	return (
		<button onClick={() => func(id)} className={`btn ${btnClass}`}>
			{btnTxt}
		</button>
	);
}

export default FunctionedBtn;
