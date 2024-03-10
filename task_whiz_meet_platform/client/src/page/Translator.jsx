import React from "react";

export default function Translator() {
	const data = "How%20are%20you%3F";
	return (
		// <iframe
		// 	src="https://research.sign.mt/"
		// 	title="Translator"
		// 	className="w-full h-full"
		// ></iframe>
		<div>
			<iframe
				className="w-[32rem] h-[32rem] mx-auto"
				// src="https://sign.mt/?embed=&amp;spl=en&amp;sil=ase&amp;text=Hello%20world!"
				src={`https://sign.mt/?embed=&amp;spl=en&amp;sil=ase&amp;text=${data}`}
				allow="camera;microphone"
				title="sign.mt translation demo"
			></iframe>
		</div>
	);
}
