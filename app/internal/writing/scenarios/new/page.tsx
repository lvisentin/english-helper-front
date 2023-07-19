'use client';

import TextField from '@/components/TextField/TextField';
import LoadingButton from '@/shared/components/LoadingButton/LoadingButton';
import PageTransition from '@/shared/components/PageTransition/PageTransition';
import { scenariosService } from '@/shared/services/scenarios/ScenariosService';
import { Scenario } from '@/shared/services/scenarios/ScenariosService.model';
import { writingService } from '@/shared/services/writing/WritingService';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function NewWriting() {
  const [audio, setAudio] = useState<any>(null);
  const [scenario, setScenario] = useState<Scenario>({
    id: '',
    slug: '',
    text: '',
    title: '',
    type: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const scenarioId = searchParams?.get('id');

  useEffect(() => {
    if (scenarioId) {
      getScenario();
    }
  }, []);

  function getScenario() {
    scenariosService.getScenarioById(scenarioId!).then(({ data }) => {
      setScenario(data);
    });
  }

  function sendFeedback(title: string, input: string) {
    setLoading(true);
    writingService
      .newWriting(scenario.text, input, title)
      .then(() => {
        toast.success('Análise solicitada com sucesso!');
      })
      .finally(() => setLoading(false))
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }

  function goBack() {
    router.back();
  }

  return (
    <PageTransition>
      {scenario ? (
        <section className="grid">
          <header className={'flex justify-between w-full'}>
            <div className={'prose max-w-full w-full'}>
              <h1 className={' prose-h1 pb-1 mb-1'}>{scenario.title}</h1>
              <h5 className="prose-h5">{scenario.text}</h5>
            </div>
            <button
              className={'btn btn-sm btn-ghost text-xs md:text-sm lg:btn-md'}
              onClick={goBack}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Voltar
            </button>
          </header>

          <main className={'mt-4'}>
            <Formik
              initialValues={{ title: '', input: '' }}
              onSubmit={({ title, input }) => sendFeedback(title, input)}
            >
              {({ values, handleChange, handleBlur, handleSubmit }) => (
                <form
                  className={'flex flex-col justify-end items-end gap-y-2'}
                  onSubmit={handleSubmit}
                >
                  <TextField
                    name="title"
                    placeholder={'Digite um titulo para identificar o feedback'}
                    label={'Titulo'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    className={'w-full'}
                  />

                  <div className={'form-control w-full'}>
                    <label className={'label'}>
                      <span className={'label-text'}>Texto</span>
                    </label>
                    <textarea
                      className={
                        'textarea textarea-bordered h-32 resize-none w-full'
                      }
                      name="input"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.input}
                      placeholder={
                        'Good morning boss, I wanted to let you know ...'
                      }
                    ></textarea>
                  </div>
                  <LoadingButton
                    loading={loading}
                    className={
                      'btn w-full btn-primary justify-self-end mt-8 md:w-fit'
                    }
                    type="submit"
                  >
                    Solicitar análise
                  </LoadingButton>
                </form>
              )}
            </Formik>
          </main>
        </section>
      ) : (
        <div className="flex items-center justify-center h-full">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
    </PageTransition>
  );
}
