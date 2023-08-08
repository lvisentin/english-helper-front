'use client';

import PhoneInput from '@/components/PhoneInput/PhoneInput';
import RadioButton from '@/components/RadioButton/RadioButton';
import TextField from '@/components/TextField/TextField';
import eyeSlashSvgSrc from '@/resources/svg/eye-slash.svg';
import eyeSvgSrc from '@/resources/svg/eye.svg';
import LoadingButton from '@/shared/components/LoadingButton/LoadingButton';
import PageTransition from '@/shared/components/PageTransition/PageTransition';
import TermsAndConditionsModal from '@/shared/components/TermsAndConditionsModal/TermsAndConditionsModal';
import { userService } from '@/shared/services/user/UserService';
import { SignupSchema } from '@/shared/validators/SignUp.validator';
import {
  faAt,
  faLock,
  faPhone,
  faUser,
  faUserFriends,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import styles from './SignUp.module.scss';

export default function SignUpPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const { push } = useRouter();

  function signUp(
    name: string,
    email: string,
    password: string,
    phoneNumber: string,
    referralCode: string
  ) {
    setLoading(true);

    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');

    userService
      .signUp(name, email, password, cleanedPhoneNumber, referralCode)
      .then(() => {
        toast.success('Conta criada com sucesso!');
        import('react-facebook-pixel')
          .then((x) => x.default)
          .then((ReactPixel) => {
            ReactPixel.track('Lead');
          });
        push('/login');
      })
      .catch(({ response: { data } }) => toast.error(data.message))
      .finally(() => setLoading(false));
  }

  return (
    <>
      <TermsAndConditionsModal></TermsAndConditionsModal>
      <PageTransition
        className={
          'prose prose-a:no-underline card bg-base-100 rounded-md w-full max-w-xl sm:p-6 sm:shadow-md sm:border-[1px] sm:border-gray-200 mx-auto my-auto'
        }
      >
        <div>
          <h2 className={'text-center mt-0'}>Crie sua conta</h2>
          <p className={'text-center'}>
            Já tem uma conta?{' '}
            <span className={'prose-a:hover:underline'}>
              <Link href={'/login'} className={'text-primary'}>
                Faça login aqui
              </Link>
            </span>
          </p>
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              phoneNumber: '',
              referralCode: '',
              confirmPassword: '',
              acceptTerms: false,
            }}
            validationSchema={SignupSchema}
            onSubmit={({
              name,
              email,
              password,
              phoneNumber,
              referralCode,
              confirmPassword,
            }) => {
              if (password !== confirmPassword) {
                console.log('senhas divcrgentes');
                return;
              }

              signUp(name, email, password, phoneNumber, referralCode);
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              touched,
              isValid,
            }) => (
              <form
                className={'grid grid-cols-10 gap-x-4 gap-y-0'}
                onSubmit={handleSubmit}
              >
                <TextField
                  name="name"
                  placeholder={'Nome'}
                  label={'Nome'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  errors={touched.name ? errors.name : null}
                  leadingIcon={
                    <FontAwesomeIcon
                      icon={faUser}
                      className={`w-4 h-4 min-w-4 ${styles.svg}`}
                    />
                  }
                  className={`col-span-10 ${styles.formControl}`}
                />

                <PhoneInput
                  name="phoneNumber"
                  placeholder={'Seu telefone com DDD'}
                  label={'Telefone'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  mask="(99) 9 9999-9999"
                  maskChar={null}
                  value={values.phoneNumber}
                  errors={touched.phoneNumber ? errors.phoneNumber : null}
                  leadingIcon={
                    <FontAwesomeIcon
                      icon={faPhone}
                      className={`w-4 h-4 min-w-4 ${styles.svg}`}
                    />
                  }
                  className={`col-span-10 ${styles.formControl}`}
                ></PhoneInput>

                <TextField
                  name="referralCode"
                  placeholder={'Digite aqui seu código de indicação'}
                  label={'Código de indicação (opcional)'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.referralCode}
                  errors={touched.referralCode ? errors.referralCode : null}
                  leadingIcon={
                    <FontAwesomeIcon
                      icon={faUserFriends}
                      className={`w-4 h-4 min-w-4 ${styles.svg}`}
                    />
                  }
                  className={`col-span-10 ${styles.formControl}`}
                />
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
                  className={`col-span-10 ${styles.formControl}`}
                />

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

                <RadioButton
                  name="acceptTerms"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.acceptTerms}
                  label={
                    <>
                      Eu concordo com os{' '}
                      <span className={'prose-a:hover:underline'}>
                        <button
                          onClick={() => {
                            //@ts-ignore
                            window.tec_modal!.show();
                          }}
                          className={'text-primary'}
                          type="button"
                        >
                          Termos e condições
                        </button>
                      </span>
                    </>
                  }
                  className={'col-span-10 mt-2'}
                />

                <LoadingButton
                  disabled={!touched.email || !isValid}
                  className={'btn btn-primary mt-6 w-full col-span-10 border-0'}
                  loading={loading}
                  type="submit"
                >
                  Criar conta
                </LoadingButton>
              </form>
            )}
          </Formik>
        </div>
      </PageTransition>
    </>
  );
}
