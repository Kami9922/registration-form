import React, { useState } from "react";
import styles from "./form.module.css";

const Form = () => {
	const initialState = {
		email: "",
		password: "",
		repassword: "",
	};

	const useStore = () => {
		const [state, setState] = useState(initialState);

		return {
			getState: () => state,
			updateState: (fieldName, newValue) => {
				setState({ ...state, [fieldName]: newValue });
			},
		};
	};

	// const [email, setEmail] = useState("");
	// const [password, setPassword] = useState("");
	// const [repassword, setRepassword] = useState("");

	const sendData = (dataForm) => {
		console.log(dataForm);
	};

	const { getState, updateState } = useStore();

	const onSubmit = (event) => {
		event.preventDefault();
		sendData(getState());
	};

	const { email, password, repassword } = getState();

	const onChange = ({ target }) => updateState(target.name, target.value);

	return (
		<div>
			<form className={styles.form} onSubmit={onSubmit}>
				{/* {(loginError || passError || rePassError) && (
					<div>{loginError || passError || rePassError}</div>
				)} */}
				<span>Email</span>
				<input name="email" type="email" value={email} onChange={onChange} />
				<span>Пароль</span>
				<input name="password" type="password" value={password} onChange={onChange} />
				<span>Повтор пароля</span>
				<input name="repassword" type="password" value={repassword} onChange={onChange} />
				<div>
					<button
						type="submit"
						// ref={submitButtonRef}
						// disabled={loginError || passError || rePassError}
					>
						Зарегистрироваться
					</button>
				</div>
			</form>
		</div>
	);
};

export default Form;
