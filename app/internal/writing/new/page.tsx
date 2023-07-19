'use client';
import TextField from '@/components/TextField/TextField';
import LoadingButton from '@/shared/components/LoadingButton/LoadingButton';
import PageTransition from '@/shared/components/PageTransition/PageTransition';
import RouteGuard from '@/shared/guards/RouteGuard';
import { writingService } from '@/shared/services/writing/WritingService';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function NewWritingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  function sendFeedback(title: string, context: string, input: string) {
    setLoading(true);
    writingService
      .newWriting(context, input, title)
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
            onSubmit={({ title, context, input }) =>
              sendFeedback(title, context, input)
            }
          >
            {({ values, handleChange, handleBlur, handleSubmit }) => (
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
                  value={values.title}
                  className={'w-full'}
                />

                <TextField
                  name="context"
                  placeholder={'A meeting with my boss'}
                  label={'Contexto'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.context}
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
        </section>
      </RouteGuard>
    </PageTransition>
  );
}
