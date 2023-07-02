import TextField from '@/components/TextField/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function NewWritingPage() {
  return (
    <>
      <header className={'shadow-md h-20 m-[-2rem] mb-0 bg-white'}></header>
      <section className={'pt-8 grid'}>
        <header className={'flex justify-between'}>
          <div className={'prose'}>
            <h1 className={'mb-0'}>New Writing page</h1>
            <p>Para solicitar uma nova análise, preencha os campos abaixo:</p>
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
            placeholder={'Digite um titulo para identificar o feedback'}
            label={'Titulo'}
            className={'col-span-10'}
          />

          <TextField
            placeholder={'A meeting with my boss'}
            label={'Contexto'}
            className={'col-span-10'}
          />
          <div className={'form-control col-span-10 p-1'}>
            <label className={'label'}>
              <span className={'label-text'}>Texto</span>
            </label>
            <textarea
              className={'textarea textarea-bordered h-32 resize-none'}
              placeholder={'Good morning boss, I wanted to let you know ...'}
            ></textarea>
          </div>
        </form>
        <button
          className={'btn w-full btn-primary justify-self-end mt-8 md:w-fit'}
        >
          Analisar
        </button>
      </section>
    </>
  );
}
