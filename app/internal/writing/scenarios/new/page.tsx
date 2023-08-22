'use client';

import TextField from '@/components/TextField/TextField';
import Loading from '@/shared/components/Loading/Loading';
import LoadingButton from '@/shared/components/LoadingButton/LoadingButton';
import PageTransition from '@/shared/components/PageTransition/PageTransition';
import RouteGuard from '@/shared/guards/RouteGuard';
import { scenariosService } from '@/shared/services/scenarios/ScenariosService';
import { Scenario } from '@/shared/services/scenarios/ScenariosService.model';
import { writingService } from '@/shared/services/writing/WritingService';
import { ScenarioWritingFeedbackValidator } from '@/shared/validators/FeedbackValidator';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik } from 'formik';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function NewWriting() {
  const [scenario, setScenario] = useState<Scenario>({
    _id: '',
    title: '',
    type: '',
    text: '',
    prompt: '',
    createdAt: '',
    updatedAt: '',
  });
  const [answer, setAnswer] = useState<string>('');
  const [loadingAnswer, setLoadingAnswer] = useState<boolean>(false);

  const variants = {
    hidden: { opacity: 0, x: 0, y: 40 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  };
  const transition = { duration: 0.6, ease: 'easeInOut' };
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const scenarioId = searchParams?.get('id');

  useEffect(() => {
    if (scenarioId) {
      getScenario();
    }
  }, []);

  useEffect(() => {
    if (answer.length > 0) {
      document.getElementById('answerElement')!.innerHTML = answer;
    }
  }, [answer]);

  function getScenario() {
    scenariosService.getScenarioById(scenarioId!).then(({ data }) => {
      setScenario(data);
    });
  }

  async function sendFeedback(title: string, input: string) {
    setLoading(true);
    try {
      const response = await writingService.newWritingRealTime(
        scenario.prompt,
        input,
        title
      );

      setLoading(false);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder('utf-8');

      if (reader) {
        // eslint-disable-next-line no-constant-condition
        while (true) {
          setLoadingAnswer(true);
          const { done, value } = await reader.read();
          if (done) {
            setLoadingAnswer(false);
            break;
          }
          const chunk = decoder.decode(value);
          const lines = chunk
            .replace('data: "', '')
            .replaceAll(/\\(")/g, '$1')
            .replaceAll('\\n', '\n');

          const hasDone = lines.includes('[DONE]');
          if (!hasDone) {
            setAnswer(lines);
          } else {
            setLoadingAnswer(false);
          }
        }
      }
    } catch (err) {
      toast.error('Ocorreu um erro, tente novamente');
    }
  }

  function goBack() {
    router.back();
  }

  return (
    <PageTransition>
      <RouteGuard>
        {scenario._id ? (
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
                validateOnChange={true}
                validateOnBlur={true}
                validationSchema={ScenarioWritingFeedbackValidator}
                initialValues={{ title: '', input: '' }}
                onSubmit={({ title, input }) => sendFeedback(title, input)}
              >
                {({
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isValid,
                  touched,
                  errors,
                  setFieldTouched,
                }) => (
                  <form
                    className={'flex flex-col justify-end items-end gap-y-2'}
                    onSubmit={handleSubmit}
                  >
                    <TextField
                      name="title"
                      placeholder={
                        'Digite um titulo para identificar o feedback'
                      }
                      label={'Titulo'}
                      onChange={(e) => {
                        setFieldTouched('title', true, true);
                        handleChange(e);
                      }}
                      errors={touched.title ? errors.title : null}
                      onBlur={handleBlur}
                      disabled={loading || loadingAnswer}
                      value={values.title}
                      className={'w-full'}
                    />

                    <div className={'form-control w-full'}>
                      <label className={'label'}>
                        <span className={'label-text'}>Texto</span>
                      </label>
                      <textarea
                        className={
                          'textarea textarea-bordered h-32 resize-none w-full text-base'
                        }
                        name="input"
                        onChange={(e) => {
                          setFieldTouched('input', true, true);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        disabled={loading || loadingAnswer}
                        value={values.input}
                        placeholder={
                          'Good morning boss, I wanted to let you know ...'
                        }
                      ></textarea>
                      {touched.input && errors.input && (
                        <label className={'label-text'}>
                          <span className={`label-text-alt error text-error`}>
                            {errors.input}
                          </span>
                        </label>
                      )}
                    </div>
                    <LoadingButton
                      loading={loading}
                      disabled={!isValid || !touched.input}
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

            {answer.length > 0 && (
              <motion.div
                variants={variants}
                initial="hidden"
                animate="enter"
                exit="exit"
                transition={transition}
              >
                {/* <div className="chat chat-start mt-8">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img src="https://placehold.it/50x50" />
                  </div>
                </div>
                <div className="chat-header w-full flex justify-between mb-1">
                  Assistente English Helper
                  <time className="text-xs opacity-50">12:45</time>
                </div>
                <div className="chat-bubble w-full max-w-full" id="chat-answer">
                  <p id="answerElement" className="whitespace-pre-line"></p>
                </div>
              </div> */}

                <div className="card w-full bg-base-100 shadow-lg mb-4 mt-4">
                  <div className="card-body p-6">
                    <h2 className="card-title m-0">Aqui está sua resposta:</h2>
                    <p id="answerElement" className="whitespace-pre-line"></p>
                  </div>
                </div>
              </motion.div>
            )}
          </section>
        ) : (
          <Loading />
        )}
      </RouteGuard>
    </PageTransition>
  );
}
