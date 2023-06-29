import { EyeSVG } from '@/resources/svg/EyeSVG';
import { EyeSlashSVG } from '@/resources/svg/EyeSlashSVG';
import { LockSVG } from '@/resources/svg/LockSVG';
import { MailSVG } from '@/resources/svg/MailSVG';
import Link from 'next/link';
import styles from './Login.module.scss';
export default function LoginPage() {
  return (
    <>
      <main className={'flex justify-center'}>
        <div className={'flex justify-center items-center h-screen sm:w-1/2'}>
          <div
            className={
              'prose prose-a:no-underline card bg-base-100 rounded-md px-6 py-12 sm:shadow-md sm:border-[1px] sm:border-gray-200'
            }
          >
            <h2 className={'text-center mt-0'}>Bem vindo de volta!</h2>
            <p className={'text-center'}>
              Novo aqui?
              <span className={'prose-a:hover:underline'}>
                <Link href={'#'} className={'text-primary'}>
                  Crie uma conta
                </Link>
              </span>
            </p>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <label className="input-group">
                <span>
                  <MailSVG className={styles.svg} />
                </span>
                <input
                  type="text"
                  placeholder="Seu email"
                  className="input input-bordered flex-grow"
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Senha</span>
              </label>
              <label className="input-group">
                <span>
                  <LockSVG className={styles.svg} />
                </span>
                <input
                  type="password"
                  placeholder="Sua senha"
                  className="input input-bordered flex-grow"
                />

                <span>
                  <label className={'swap'}>
                    <input type={'checkbox'} />
                    <EyeSVG className={`swap-on ${styles.svg}`} />
                    <EyeSlashSVG className={`swap-off ${styles.svg}`} />
                  </label>
                </span>
              </label>
            </div>
            <p className={'text-right my-4'}>
              <span className={'prose-a:no-underline prose-a:hover:underline'}>
                <Link href={'#'}>Esqueceu sua senha?</Link>
              </span>
            </p>

            <button className={'btn btn-primary'}> Entrar</button>
          </div>
        </div>
        <div
          className={'hidden lg:block lg:w-1/2 lg:h-screen lg:bg-indigo-950'}
        ></div>
      </main>
    </>
  );
}
