'use client';

import AudioRecorder from '@/shared/components/AudioRecorder/AudioRecorder';
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

  function sendFeedback(title: string, context: string) {
    setLoading(true);
    speakingService
      .newSpeaking(context, title, audio)
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
                handleSubmit={() => sendFeedback(scenario.title, scenario.text)}
              />
            </main>
          </section>
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
      </RouteGuard>
    </PageTransition>
  );
}
