import Link from 'next/link';
import Image from 'next/image';
import lockSvgSrc from '@/resources/svg/lock.svg';
import eyeSvgSrc from '@/resources/svg/eye.svg';
import eyeSlashSvgSrc from '@/resources/svg/eye-slash.svg';
import loginImgSrc from '@/resources/a-dude.png';
import TextField from '@/components/TextField/TextField';
import RadioButton from '@/components/RadioButton/RadioButton';
import LoginSplitLayout from '@/components/layouts/login/LoginSplitLayout';

export default function SignUpPage() {
  return (
    <LoginSplitLayout>
      <div
        className={
          'prose prose-a:no-underline card bg-base-100 rounded-md w-full max-w-xl sm:p-6 sm:shadow-md sm:border-[1px] sm:border-gray-200'
        }
      >
        <h2 className={'text-center mt-0'}>Crie sua conta</h2>
        <p className={'text-center'}>
          Já tem uma conta?{' '}
          <span className={'prose-a:hover:underline'}>
            <Link href={'/login'} className={'text-primary'}>
              Faça login aqui
            </Link>
          </span>
        </p>
        <form className={'grid grid-cols-10 gap-x-4 gap-y-2'}>
          <TextField
            placeholder={'Primeiro nome'}
            label={'Primeiro nome'}
            leadingIcon={
              <Image
                src={lockSvgSrc}
                alt={'ad'}
                className={'w-6 h-6 min-w-6'}
              />
            }
            className={'col-span-6'}
          />
          <div className="form-control col-span-4">
            <label className="label">
              <span className="label-text">Sobrenome</span>
            </label>
            <input
              type="text"
              autoComplete="nope"
              placeholder="Sobrenome"
              className="input input-bordered"
            />
          </div>

          <TextField
            placeholder={'Seu telefone com DDD'}
            label={'Telefone'}
            leadingIcon={
              <Image src={lockSvgSrc} alt={'ad'} className={'w-6 h-6'} />
            }
            className={'col-span-10'}
          />
          <TextField
            placeholder={'Digite aqui seu código de indicação'}
            label={'Código de indicação (opcional)'}
            leadingIcon={
              <Image src={lockSvgSrc} alt={'ad'} className={'w-6 h-6'} />
            }
            className={'col-span-10'}
          />
          <TextField
            placeholder={'exemplo@email.com'}
            label={'Email'}
            leadingIcon={
              <Image src={lockSvgSrc} alt={'ad'} className={'w-6 h-6'} />
            }
            className={'col-span-10'}
          />

          <TextField
            placeholder={'Sua senha'}
            label={'Senha'}
            helperText={
              'Sua senha deve conter no mínimo uma letra maíuscula, uma letra minúscula, 1 número, 1 símbolo e ter no mínimo 8 caracteres.'
            }
            leadingIcon={
              <Image src={lockSvgSrc} alt={'ad'} className={'w-6 h-6'} />
            }
            trailingIcon={{
              type: 'toggle',
              initialIcon: (
                <Image
                  src={eyeSvgSrc}
                  alt={'ad'}
                  className={'w-6 h-6 swap-on'}
                />
              ),
              secondIcon: (
                <Image
                  src={eyeSlashSvgSrc}
                  alt={'ad'}
                  className={'w-6 h-6 swap-off'}
                />
              ),
            }}
            className={'col-span-10'}
          />

          <TextField
            placeholder={'Confirmar senha'}
            label={'Confirmar senha'}
            leadingIcon={
              <Image src={lockSvgSrc} alt={'ad'} className={'w-6 h-6'} />
            }
            trailingIcon={{
              type: 'toggle',
              initialIcon: (
                <Image
                  src={eyeSvgSrc}
                  alt={'ad'}
                  className={'w-6 h-6 swap-on'}
                />
              ),
              secondIcon: (
                <Image
                  src={eyeSlashSvgSrc}
                  alt={'ad'}
                  className={'w-6 h-6 swap-off'}
                />
              ),
            }}
            className={'col-span-10'}
          />

          <RadioButton
            label={
              <>
                Eu concordo com os{' '}
                <span className={'prose-a:hover:underline'}>
                  <Link href={'#'} className={'text-primary'}>
                    Termos e condições
                  </Link>
                </span>
              </>
            }
            className={'col-span-10 mt-2'}
          />
        </form>

        <button className={'btn btn-primary mt-6'}> Criar conta</button>
      </div>
      <div className={'prose h-fit'}>
        <Image src={loginImgSrc} alt={'ad'} className={'w-full'} />
        <h1 className={'text-white text-center'}>
          Bem vindo ao English Helper
        </h1>
        <p className={'text-white text-center'}>
          Estamos aqui para ajudar você a alcançar uma comunicação mais
          <span className={'text-yellow-400'}> precisa e impactante</span>,
          elevando seu vocabulário e aperfeiçoando sua gramática.
        </p>
      </div>
    </LoginSplitLayout>
  );
}
