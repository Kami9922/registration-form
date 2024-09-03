import React, { useRef, useState } from "react";
import styles from "./form.module.css";

const Form = () => {
	const [errorEmail, setErrorEmail] = useState(null);
	const [errorPassword, setPassword] = useState(null);
	const [errorRepassword, setRepassword] = useState(null);
	const [regButton, setRegButton] = useState(false);

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

	const sendData = (dataForm) => {
		console.log(dataForm);
	};

	const { getState, updateState } = useStore();

	const onSubmit = (event) => {
		event.preventDefault();
		sendData(getState());
	};

	const { email, password, repassword } = getState();

	const submitButtonRef = useRef(null);

	let error = null;

	const onEmailChange = ({ target }) => {
		updateState(target.name, target.value);

		if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(target.value)) {
			error = "Введите корректный email";
		}
		if (target.value.length > 20) {
			error = "Email не может содержать больше 20 символов";
		}

		setErrorEmail(error);
	};
	const onPassChange = ({ target }) => {
		updateState(target.name, target.value);

		if (!/^[\w_]*$/.test(target.value)) {
			error = "Неверный пароль. Допустимые символы: буквы, цифры и нижнее подчёркивание";
		}
		if (target.value.length < 3) {
			error = "В пароле не может быть меньше 3 символов";
		}
		if (target.value.length > 20) {
			error = "В пароле не может быть больше 20 символов";
		}

		setPassword(error);
	};

	const onRepassChange = ({ target }) => {
		updateState(target.name, target.value);

		let error = null;

		if (target.value !== password) {
			error = "Пароли не совпадают";
		}

		setRepassword(error);

		if (target.value.length === password.length) {
			setTimeout(() => {
				submitButtonRef.current?.focus();
			}, 0);
		}
	};

	const onClickButton = () => setRegButton(true);

	return (
		<div>
			<form className={styles.form} onSubmit={onSubmit}>
				{regButton && (errorEmail || errorPassword || errorRepassword) && (
					<div>{errorEmail || errorPassword || errorRepassword}</div>
				)}
				<span>Email</span>
				<input
					name="email"
					type="text"
					value={email}
					onChange={onEmailChange}
					placeholder="Введите email"
				/>
				<span>Пароль</span>
				<input
					name="password"
					type="password"
					value={password}
					onChange={onPassChange}
					placeholder="Введите пароль"
				/>
				<span>Повтор пароля</span>
				<input
					name="repassword"
					type="password"
					value={repassword}
					onChange={onRepassChange}
					placeholder="Повторите пароль"
				/>
				<div>
					<button
						type="submit"
						disabled={regButton && (errorEmail || errorPassword || errorRepassword)}
						ref={submitButtonRef}
						onClick={onClickButton}
					>
						Зарегистрироваться
					</button>
				</div>
			</form>
		</div>
	);
};

export default Form;
