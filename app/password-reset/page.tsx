'use client';

import TextField from '@/components/TextField/TextField';
import eyeSlashSvgSrc from '@/resources/svg/eye-slash.svg';
import eyeSvgSrc from '@/resources/svg/eye.svg';
import LoadingButton from '@/shared/components/LoadingButton/LoadingButton';
import PageTransition from '@/shared/components/PageTransition/PageTransition';
import { userService } from '@/shared/services/user/UserService';
import { ResetPasswordSchema } from '@/shared/validators/ResetPassword.validator';
import { faAt, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import styles from './PasswordReset.module.scss';

function PasswordReset() {
  const [loading, setLoading] = useState<boolean>(false);
  const [mode, setMode] = useState<string>('email');
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const emailFormValidator = Yup.object().shape({
    email: Yup.string()
      .email('Por favor, digite um email válido')
      .required('Por favor, digite seu email'),
  });

  useEffect(() => {
    const token = searchParams?.get('token');
    if (token) setMode('reset');
  }, []);

  function sendEmail(email: string) {
    setLoading(true);

    userService
      .sendResetPasswordEmail(email)
      .then(() => toast.success('Email enviado!'))
      .catch(() => toast.error('Ocorreu um erro, tente novamente.'))
      .finally(() => setLoading(false));
  }

  function resetPassword(password: string, confirmPassword: string) {
    setLoading(true);
    const token = searchParams?.get('token');

    userService
      .resetPassword(token!, password, confirmPassword)
      .then(() => {
        toast.success('Sua senha foi redefinida');
        push('/login');
      })
      .catch(() => toast.error('Ocorreu um erro, tente novamente.'))
      .finally(() => setLoading(false));
  }

  return (
    <PageTransition
      className={
        'prose prose-a:no-underline card bg-base-100 rounded-md w-full max-w-xl sm:p-6 sm:shadow-md sm:border-[1px] sm:border-gray-200 mx-auto my-auto'
      }
    >
      {mode === 'email' ? (
        <>
          <h2 className={'text-center mt-0'}>Esqueceu sua senha?</h2>
          <p className={'text-center'}>
            Digite seu email no campo abaixo e receba um email com as intruções
            para seu reset de senha.
          </p>

          <Formik
            validationSchema={emailFormValidator}
            initialValues={{ email: '' }}
            onSubmit={(values) => sendEmail(values.email)}
          >
            {({
              handleBlur,
              handleChange,
              touched,
              errors,
              values,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit} className="flex flex-col">
                <TextField
                  name="email"
                  placeholder={'exemplo@email.com'}
                  label={'Email'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  errors={touched.email ? errors.email : null}
                  leadingIcon={
                    <FontAwesomeIcon
                      icon={faAt}
                      className={`w-4 h-4 min-w-4 ${styles.svg}`}
                    />
                  }
                  className={`p-0 ${styles.formControl}`}
                />

                <div className={'flex flex-col w-full col-span-10'}>
                  <LoadingButton
                    loading={loading}
                    disabled={loading}
                    className={`btn btn-primary mt-6`}
                    type="submit"
                  >
                    Enviar
                  </LoadingButton>
                  <p className={'text-center my-4'}>
                    <span
                      className={'prose-a:no-underline prose-a:hover:underline'}
                    >
                      <Link href={'/login'}>Voltar</Link>
                    </span>
                  </p>
                </div>
              </form>
            )}
          </Formik>
        </>
      ) : (
        <>
          <h2 className={'text-center mt-0'}>Redefinir senha</h2>
          <p className={'text-center'}>
            Digite sua senha no campo abaixo e confirme para redefinir sua
            senha.
          </p>

          <Formik
            initialValues={{ password: '', confirmPassword: '' }}
            validationSchema={ResetPasswordSchema}
            onSubmit={(values) =>
              resetPassword(values.password, values.confirmPassword)
            }
          >
            {({
              handleBlur,
              handleChange,
              touched,
              errors,
              values,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit} className="flex flex-col">
                <TextField
                  name="password"
                  placeholder={'Sua senha'}
                  label={'Senha'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  errors={touched.password ? errors.password : null}
                  leadingIcon={
                    <FontAwesomeIcon
                      icon={faLock}
                      className={`w-4 h-4 min-w-4 ${styles.svg}`}
                    />
                  }
                  trailingIcon={{
                    type: 'toggle',
                    initialIcon: (
                      <Image
                        src={eyeSvgSrc}
                        alt={'ad'}
                        className={`w-6 h-6 swap-on ${styles.svg}`}
                      />
                    ),
                    secondIcon: (
                      <Image
                        src={eyeSlashSvgSrc}
                        alt={'ad'}
                        className={`w-6 h-6 swap-off ${styles.svg}`}
                      />
                    ),
                  }}
                  className={`col-span-10 ${styles.formControl}`}
                />

                <TextField
                  name="confirmPassword"
                  placeholder={'Confirmar senha'}
                  label={'Confirmar senha'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                  errors={
                    touched.confirmPassword ? errors.confirmPassword : null
                  }
                  leadingIcon={
                    <FontAwesomeIcon
                      icon={faLock}
                      className={`w-4 h-4 min-w-4 ${styles.svg}`}
                    />
                  }
                  trailingIcon={{
                    type: 'toggle',
                    initialIcon: (
                      <Image
                        src={eyeSvgSrc}
                        alt={'ad'}
                        className={`w-6 h-6 swap-on ${styles.svg}`}
                      />
                    ),
                    secondIcon: (
                      <Image
                        src={eyeSlashSvgSrc}
                        alt={'ad'}
                        className={`w-6 h-6 swap-off ${styles.svg}`}
                      />
                    ),
                  }}
                  className={`col-span-10 ${styles.formControl}`}
                />

                <div className={'flex flex-col w-full col-span-10'}>
                  <LoadingButton
                    loading={loading}
                    disabled={loading}
                    className={`btn btn-primary mt-6`}
                    type="submit"
                  >
                    Enviar
                  </LoadingButton>
                  <p className={'text-center my-4'}>
                    <span
                      className={'prose-a:no-underline prose-a:hover:underline'}
                    >
                      <Link href={'/login'}>Voltar</Link>
                    </span>
                  </p>
                </div>
              </form>
            )}
          </Formik>
        </>
      )}
    </PageTransition>
  );
}

export default PasswordReset;
