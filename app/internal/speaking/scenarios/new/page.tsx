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

  function getScenario() {
    scenariosService.getScenarioById(scenarioId!).then(({ data }) => {
      setScenario(data);
    });
  }

  function sendFeedback({ title, text }: { title: string; text: string }) {
    let formData = new FormData();
    formData.append('audio', audio, 'audio.mp3');
    formData.append('duration', duration.toFixed(2));
    formData.append('context', text);
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
                loading={loading}
                setAudioFile={setAudio}
                onStartRecording={startRecording}
                onStopRecording={stopRecording}
                handleSubmit={() => sendFeedback(scenario)}
              />
            </main>
          </section>
        ) : (
          <Loading />
        )}
      </RouteGuard>
    </PageTransition>
  );
}
