'use client';
import TextField from '@/components/TextField/TextField';
import LoadingButton from '@/shared/components/LoadingButton/LoadingButton';
import PageTransition from '@/shared/components/PageTransition/PageTransition';
import RouteGuard from '@/shared/guards/RouteGuard';
import { assistantService } from '@/shared/services/assistant/AssistantService';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik } from 'formik';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function AssistantPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>('');

  const variants = {
    hidden: { opacity: 0, x: 0, y: 40 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  };
  const transition = { duration: 0.6, ease: 'easeInOut' };
  let i = 0;
  const speed = 25;

  function typeWriter() {
    if (i < answer.length) {
      document.getElementById('chat-answer')!.innerHTML += answer.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }

  function askAssistant(input: string) {
    setLoading(true);
    assistantService
      .ask(input)
      .then(({ data: { answer } }) => {
        setAnswer(answer);
      })
      .catch(() => toast.error('Ocorreu um erro, tente novamente'))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    if (answer) {
      typeWriter();
    }
  }, [answer]);

  return (
    <PageTransition>
      <RouteGuard>
        <section>
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
          <Formik
            initialValues={{ input: '' }}
            onSubmit={({ input }) => askAssistant(input)}
          >
            {({ values, handleBlur, handleChange, handleSubmit }) => (
              <>
                <form
                  className={'flex flex-col items-end pt-4'}
                  onSubmit={handleSubmit}
                >
                  <TextField
                    name="input"
                    className={'w-full p-0'}
                    placeholder={'Digite sua pergunta sobre o idioma inglês'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.input}
                  />
                  <LoadingButton
                    loading={loading}
                    type="submit"
                    className={
                      'btn w-full btn-primary justify-self-end mt-8 md:w-fit'
                    }
                  >
                    Perguntar
                  </LoadingButton>
                </form>
              </>
            )}
          </Formik>
          {answer && (
            <motion.div
              variants={variants}
              initial="hidden"
              animate="enter"
              exit="exit"
              transition={transition}
            >
              <div className="chat chat-start mt-8">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img src="https://placehold.it/50x50" />
                  </div>
                </div>
                <div className="chat-header w-full flex justify-between mb-1">
                  Assistente English Helper
                  <time className="text-xs opacity-50">12:45</time>
                </div>
                <div
                  className="chat-bubble w-full max-w-full"
                  id="chat-answer"
                ></div>
              </div>
            </motion.div>
          )}
        </section>
      </RouteGuard>
    </PageTransition>
  );
}
