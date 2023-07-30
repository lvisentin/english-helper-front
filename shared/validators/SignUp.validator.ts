import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, 'Nome pequeno demais')
    .max(50, 'Nome grande demais')
    .required('Por favor, digite seu nome.'),
  email: Yup.string()
    .email('Por favor, digite um email válido')
    .required('Por favor, digite seu email'),
  password: Yup.string()
    .min(8, 'A senha deve conter no mínimo 8 caracteres')
    .required('Por favor, digite uma senha.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'As senhas não coincidem')
    .required('Por favor, confirme sua senha.'),
  phoneNumber: Yup.string().required('Por favor, digite um telefone'),
  acceptTerms: Yup.bool().required(),
});
