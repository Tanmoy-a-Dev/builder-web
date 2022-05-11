import React from "react";

function SignedBtn({
	sign = "plus",
	width = "40px",
	height = "40px",
	index = null,
	onClickFunc = function () {
		return;
	},
}) {
	return (
		<>
			{sign === "plus" && (
				<div className="col-sm-2">
					<svg
						width={width}
						height={height}
						onClick={onClickFunc}
						fill="currentColor"
						className="text-info bi bi-plus-circle-fill"
						viewBox="0 0 16 16">
						<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
					</svg>
				</div>
			)}

			{sign === "minus" && (
				<div className="col-sm-2">
					<svg
						width={width}
						height={height}
						onClick={() => onClickFunc(index)}
						fill="currentColor"
						className="text-warning bi bi-dash-circle-fill"
						viewBox="0 0 16 16">
						<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z" />
					</svg>
				</div>
			)}
		</>
	);
}

export default SignedBtn;
