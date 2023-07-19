'use client';
import TextField from '@/components/TextField/TextField';
import PageTransition from '@/shared/components/PageTransition/PageTransition';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function AssistantPage() {
  return (
    <PageTransition>
      <section className={'grid'}>
        <header className={'flex justify-between'}>
          <div className={'prose'}>
            <h1 className={'mb-0'}>Assistente</h1>
            <p>
              Gostaria de fazer uma pergunta? Preencha o campo abaixo e clique
              em perguntar
            </p>
          </div>
          <button
            className={'btn btn-sm btn-ghost text-xs md:text-sm lg:btn-md'}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Voltar
          </button>
        </header>

        <form className={'grid grid-cols-10 gap-y-2 pt-4'}>
          <TextField
            name="question"
            placeholder={'Digite sua pergunta sobre o idioma inglês'}
            className={'col-span-10'}
          />
        </form>
        <button
          className={'btn w-full btn-primary justify-self-end mt-8 md:w-fit'}
        >
          Perguntar
        </button>
      </section>
    </PageTransition>
  );
}
