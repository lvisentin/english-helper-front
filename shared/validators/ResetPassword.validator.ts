import * as Yup from 'yup';

export const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'A senha deve conter no mínimo 8 caracteres')
    .required('Por favor, digite uma senha.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'As senhas não coincidem')
    .required('Por favor, confirme sua senha.'),
});
