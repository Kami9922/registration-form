import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./form.module.css";

const Form = () => {
	const fieldsScheme = yup.object().shape({
		email: yup
			.string()
			.email("Введите корректный email")
			.max(50, "В email должно быть меньше 50 символов"),
		password: yup
			.string()
			.matches(
				/^[\w_]*$/,
				"В пароле должны использоваться буквы, цифры или нижнее подчёркивание",
			)
			.max(20, "В пароле должно быть меньше 20 символов")
			.min(5, " В пароле должно быть больше 5 символов"),
		repassword: yup
			.string()
			.matches(
				/^[\w_]*$/,
				"В пароле должны использоваться буквы, цифры или нижнее подчёркивание",
			)
			.oneOf([yup.ref("password"), null], "Пароли не совпадают")
			.max(20, "В пароле должно быть меньше 20 символов")
			.min(5, "В пароле должно быть больше 5 символов"),
	});

	const {
		register,
		handleSubmit,
		watch,

		formState: { errors },
	} = useForm({
		defaultValues: {},
		resolver: yupResolver(fieldsScheme),
	});

	const submitButtonRef = useRef(null);
	const password = watch("password");

	const handleRepasswordChange = ({ target }) => {
		const repasswordValue = target.value;
		if (repasswordValue.length === password.length) {
			submitButtonRef.current?.focus();
		}
	};

	const onSubmit = (formData) => {
		console.log(formData);
	};

	const loginError = errors.email?.message;
	const passError = errors.password?.message;
	const rePassError = errors.repassword?.message;

	return (
		<div>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				{(loginError || passError || rePassError) && (
					<div>{loginError || passError || rePassError}</div>
				)}
				<span>Email</span>
				<input name="email" type="text" {...register("email")} />
				<span>Пароль</span>
				<input name="password" type="password" {...register("password")} />
				<span>Повтор пароля</span>
				<input
					name="repassword"
					type="password"
					{...register("repassword")}
					onChange={handleRepasswordChange}
				/>
				<div>
					<button
						type="submit"
						ref={submitButtonRef}
						disabled={loginError || passError || rePassError}
					>
						Зарегистрироваться
					</button>
				</div>
			</form>
		</div>
	);
};

export default Form;
