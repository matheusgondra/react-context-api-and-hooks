import P from "prop-types";

export const Button = ({ text, onButtonClick, disabled }) => {
	return (
		<button disabled={disabled} style={{ fontSize: "60px" }} onClick={onButtonClick}>
			{text}
		</button>
	);
};

Button.propTypes = {
	text: P.string.isRequired,
	onButtonClick: P.func.isRequired,
	disabled: P.bool
};
