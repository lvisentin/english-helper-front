import Link from 'next/link';
import Image from 'next/image';
import mailSvgSrc from '@/resources/svg/mail.svg';
import lockSvgSrc from '@/resources/svg/lock.svg';
import eyeSlashSvgSrc from '@/resources/svg/eye-slash.svg';
import eyeSvgSrc from '@/resources/svg/eye.svg';
import loginImgSrc from '@/resources/a-dude.png';
import LoginSplitLayout from '@/components/layouts/login/LoginSplitLayout';
import TextField from '@/components/TextField/TextField';

export default function LoginPage() {
  return (
    <LoginSplitLayout>
      <div
        className={
          'prose prose-a:no-underline card bg-base-100 rounded-md w-full max-w-xl sm:p-6 sm:shadow-md sm:border-[1px] sm:border-gray-200'
        }
      >
        <h2 className={'text-center mt-0'}>Bem vindo de volta!</h2>
        <p className={'text-center'}>
          Novo aqui?{' '}
          <span className={'prose-a:hover:underline'}>
            <Link href={'/sign-up'} className={'text-primary'}>
              {' '}
              Crie uma conta
            </Link>
          </span>
        </p>

        <form className={'grid grid-cols-10 gap-x-4 gap-y-2'}>
          <TextField
            placeholder={'Seu email'}
            label={'Email'}
            leadingIcon={
              <Image
                src={mailSvgSrc}
                alt={'icone representando uma carta'}
                className={'w-6 h-6 max-w-6'}
              />
            }
            className={'col-span-10'}
          />
          <TextField
            placeholder={'Sua senha'}
            label={'Senha'}
            leadingIcon={
              <Image
                src={lockSvgSrc}
                alt={'icone representando um cadeado'}
                width={24}
                className={'w-6 h-6'}
              />
            }
            trailingIcon={{
              type: 'toggle',
              initialIcon: (
                <Image
                  src={eyeSvgSrc}
                  alt={'icone representando um olho humano'}
                  className={'w-6 h-6 swap-on'}
                />
              ),
              secondIcon: (
                <Image
                  src={eyeSlashSvgSrc}
                  alt={'icone representando um olho humano riscado'}
                  className={'w-6 h-6 swap-off'}
                />
              ),
            }}
            className={'col-span-10'}
          />
        </form>

        <p className={'text-right my-4'}>
          <span className={'prose-a:no-underline prose-a:hover:underline'}>
            <Link href={'#'}>Esqueceu sua senha?</Link>
          </span>
        </p>

        <button className={'btn btn-primary mt-6'}>Entrar</button>
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
