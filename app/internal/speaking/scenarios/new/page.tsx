'use client';

import AudioRecorder from '@/shared/components/AudioRecorder/AudioRecorder';
import Loading from '@/shared/components/Loading/Loading';
import PageTransition from '@/shared/components/PageTransition/PageTransition';
import RouteGuard from '@/shared/guards/RouteGuard';
import { scenariosService } from '@/shared/services/scenarios/ScenariosService';
import { Scenario } from '@/shared/services/scenarios/ScenariosService.model';
import { speakingService } from '@/shared/services/speaking/SpeakingService';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function NewSpeaking() {
  const [audio, setAudio] = useState<any>(null);
  const [scenario, setScenario] = useState<Scenario>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const scenarioId = searchParams?.get('id');
  const [duration, setDuration] = useState<number>(0);

  const [answer, setAnswer] = useState<string>('');
  const [loadingAnswer, setLoadingAnswer] = useState<boolean>(false);

  const variants = {
    hidden: { opacity: 0, x: 0, y: 40 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  };
  const transition = { duration: 0.6, ease: 'easeInOut' };

  let startTime: Date;
  let stopTime: Date;

  function startRecording() {
    startTime = new Date();
  }

  function stopRecording() {
    stopTime = new Date();
    setDuration((stopTime.getTime() - startTime.getTime()) / 1000);
  }

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

  async function sendFeedback({
    title,
    prompt,
  }: {
    title: string;
    prompt: string;
  }) {
    let formData = new FormData();
    formData.append('audio', audio, 'audio.mp3');
    formData.append('duration', duration.toFixed(2));
    formData.append('context', prompt);
    formData.append('title', title);

    setLoading(true);

    try {
      const response = await speakingService.newSpeakingRealTime(formData);

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

    // speakingService
    //   .newSpeaking(formData)
    //   .then(() => {
    //     toast.success('Análise solicitada com sucesso!');
    //   })
    //   .finally(() => setLoading(false))
    //   .catch((err) => {
    //     toast.error(err.response.data.message);
    //   });
  }

  function reset() {
    setAnswer('');
  }

  function goBack() {
    router.back();
  }

  return (
    <PageTransition>
      <RouteGuard>
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
              <AudioRecorder
                loading={loading || loadingAnswer}
                setAudioFile={setAudio}
                onStartRecording={startRecording}
                onStopRecording={stopRecording}
                handleSubmit={() => sendFeedback(scenario)}
                handleReset={reset}
              />
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

                <div className="card w-full bg-base-100 shadow-lg mb-4 mt-4 cursor-pointer">
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
