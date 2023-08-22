'use client';
import TextField from '@/components/TextField/TextField';
import LoadingButton from '@/shared/components/LoadingButton/LoadingButton';
import PageTransition from '@/shared/components/PageTransition/PageTransition';
import RouteGuard from '@/shared/guards/RouteGuard';
import { writingService } from '@/shared/services/writing/WritingService';
import { FullWritingFeedbackValidator } from '@/shared/validators/FeedbackValidator';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik } from 'formik';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
export default function NewWritingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>('');
  const [loadingAnswer, setLoadingAnswer] = useState<boolean>(false);

  const variants = {
    hidden: { opacity: 0, x: 0, y: 40 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  };
  const transition = { duration: 0.6, ease: 'easeInOut' };

  async function sendFeedback(title: string, context: string, input: string) {
    setLoading(true);

    try {
      const response = await writingService.newWritingRealTime(
        context,
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

  useEffect(() => {
    if (answer.length > 0) {
      document.getElementById('answerElement')!.innerHTML = answer;
    }
  }, [answer]);

  function goBack() {
    router.back();
  }

  return (
    <PageTransition>
      <RouteGuard>
        <section className={'grid'}>
          <header className={'flex justify-between'}>
            <div className={'prose'}>
              <h1 className={'mb-0 pb-1'}> Writing - Solicitar Análise</h1>
              <h6>
                Para solicitar uma nova análise, preencha os campos abaixo.
              </h6>
            </div>
            <button
              className={'btn btn-sm btn-ghost text-xs md:text-sm lg:btn-md'}
              onClick={goBack}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Voltar
            </button>
          </header>

          <Formik
            initialValues={{ title: '', context: '', input: '' }}
            validationSchema={FullWritingFeedbackValidator}
            onSubmit={({ title, context, input }) =>
              sendFeedback(title, context, input)
            }
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              isValid,
              touched,
              errors,
            }) => (
              <form
                className={'flex flex-col justify-end items-end gap-y-2 pt-4'}
                onSubmit={handleSubmit}
              >
                <TextField
                  name="title"
                  placeholder={'Digite um titulo para identificar o feedback'}
                  label={'Titulo'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={touched.title ? errors.title : null}
                  value={values.title}
                  disabled={loading || loadingAnswer}
                  className={'w-full'}
                />

                <TextField
                  name="context"
                  placeholder={'A meeting with my boss'}
                  label={'Contexto'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.context}
                  errors={touched.context ? errors.context : null}
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
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.input}
                    disabled={loading || loadingAnswer}
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

              <div className="card w-full bg-base-100 shadow-lg mb-4 mt-4 cursor-pointer">
                <div className="card-body p-6">
                  <h2 className="card-title m-0">Aqui está sua resposta:</h2>
                  <p id="answerElement" className="whitespace-pre-line"></p>
                </div>
              </div>
            </motion.div>
          )}
        </section>
      </RouteGuard>
    </PageTransition>
  );
}
