import * as Yup from 'yup';

export const FullWritingFeedbackValidator = Yup.object().shape({
  title: Yup.string().required('Por favor, digite um título'),
  context: Yup.string().required('Por favor, digite um contexto.'),
  input: Yup.string().required('Por favor, digite algo para ser analisado.'),
});

export const ScenarioWritingFeedbackValidator = Yup.object().shape({
  title: Yup.string().required('Por favor, digite um título'),
  input: Yup.string().required('Por favor, digite algo para ser analisado.'),
});

export const FullSpeakingFeedbackValidator = Yup.object().shape({
  title: Yup.string().required('Por favor, digite um título'),
  context: Yup.string().required('Por favor, digite um contexto.'),
});
