'use client';

import TextField from '@/components/TextField/TextField';
import AudioRecorder from '@/shared/components/AudioRecorder/AudioRecorder';
import PageTransition from '@/shared/components/PageTransition/PageTransition';
import RouteGuard from '@/shared/guards/RouteGuard';
import { speakingService } from '@/shared/services/speaking/SpeakingService';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function NewSpeaking() {
  const [audio, setAudio] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  let startTime: Date;
  let stopTime: Date;
  let duration = 0;

  function startRecording() {
    startTime = new Date();
  }

  function stopRecording() {
    stopTime = new Date();
    duration = (stopTime.getTime() - startTime.getTime()) / 1000;
  }

  function sendFeedback({
    title,
    context,
  }: {
    title: string;
    context: string;
  }) {
    let formData = new FormData();
    formData.append('audio', audio, 'audio.mp3');
    formData.append('context', context);
    formData.append('duration', duration.toString());
    formData.append('title', title);

    setLoading(true);
    speakingService
      .newSpeaking(formData)
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
        <section className="grid">
          <header className={'flex justify-between w-full'}>
            <div className={'prose max-w-full w-full'}>
              <h1 className={' prose-h1 pb-1 mb-1'}>
                Speaking - Solicitar Análise
              </h1>
              <h6>
                Para solicitar uma nova análise, digite o contexto (em inglês)
                no campo abaixo e clique no microfone para gravar.
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

          <main className={'mt-4'}>
            <Formik
              initialValues={{ title: '', context: '' }}
              onSubmit={(values) => sendFeedback(values)}
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                resetForm,
              }) => (
                <>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      name="title"
                      label="Título"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                      placeholder={'Feedback 1'}
                      className={'col-span-10'}
                    />
                    <TextField
                      name="context"
                      label="Contexto"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.context}
                      placeholder={'In a meeting with my boss....'}
                      className={'col-span-10'}
                    />

                    <AudioRecorder
                      loading={loading}
                      setAudioFile={setAudio}
                      onStartRecording={startRecording}
                      onStopRecording={stopRecording}
                      handleSubmit={handleSubmit}
                      handleReset={resetForm}
                    />
                  </form>
                </>
              )}
            </Formik>
          </main>
        </section>
      </RouteGuard>
    </PageTransition>
  );
}
