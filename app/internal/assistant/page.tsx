'use client';
import TextField from '@/components/TextField/TextField';
import LoadingButton from '@/shared/components/LoadingButton/LoadingButton';
import PageTransition from '@/shared/components/PageTransition/PageTransition';
import RouteGuard from '@/shared/guards/RouteGuard';
import { assistantService } from '@/shared/services/assistant/AssistantService';
import { Formik } from 'formik';
import { motion } from 'framer-motion';
import { useState } from 'react';
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

  async function askAssistant(input: string) {
    setAnswer('');
    setLoading(true);
    try {
      const response = await assistantService.askRealTime(input);
      setLoading(false);
      const reader = response.body?.getReader();
      const decoder = new TextDecoder('utf-8');

      if (reader) {
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          const chunk = decoder.decode(value);
          const lines = chunk.replace('data: "', '').replaceAll('\\', '');
          setAnswer(lines);
        }
      }
    } catch (err) {
      toast.error('Ocorreu um erro, tente novamente');
    }
  }

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
                    disabled={loading}
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
          {answer.length > 0 && (
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
                <div className="chat-bubble w-full max-w-full" id="chat-answer">
                  {answer}
                </div>
              </div>
            </motion.div>
          )}
        </section>
      </RouteGuard>
    </PageTransition>
  );
}
