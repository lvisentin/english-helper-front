'use client';

import Loading from '@/shared/components/Loading/Loading';
import PageTransition from '@/shared/components/PageTransition/PageTransition';
import RouteGuard from '@/shared/guards/RouteGuard';
import { Feedback } from '@/shared/models/feedbacks/feedback.model';
import { speakingService } from '@/shared/services/speaking/SpeakingService';
import { GetSpeakingByIdResponse } from '@/shared/services/speaking/SpeakingService.model';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AxiosResponse } from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styles from './SpeakingDetails.module.scss';

export default function SpeakingDetails() {
  const [feedbackData, setFeedbackData] = useState<Feedback>();
  const router = useRouter();
  const [language, setLanguage] = useState<'pt' | 'en'>('en');
  const searchParams = useSearchParams();
  const speakingId = searchParams?.get('id');
  const [translateLoading, setTranslateLoading] = useState<boolean>(false);
  const [translateDone, setTranslateDone] = useState<boolean>(false);
  const [translateAnswer, setTranslateAnswer] = useState<string>('');

  function getFeedbackData() {
    speakingService
      .getSpeakingById(speakingId!)
      .then(
        ({ data: { feedback } }: AxiosResponse<GetSpeakingByIdResponse>) => {
          setFeedbackData(feedback);
        }
      );
  }

  function goBack() {
    router.back();
  }

  function toggleLanguage() {
    const newLang = language === 'pt' ? 'en' : 'pt';
    setLanguage(newLang);
    if (newLang === 'pt' && !translateDone && !feedbackData?.portugueseOutput) {
      translateSpeaking();
      return;
    }
  }

  async function translateSpeaking() {
    setTranslateLoading(true);

    try {
      const response = await speakingService.translateSpeaking(speakingId!);
      const reader = response.body?.getReader();
      const decoder = new TextDecoder('utf-8');
      setTranslateLoading(false);

      if (reader) {
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          const chunk = decoder.decode(value);
          const lines = chunk
            .replace('data: "', '')
            .replaceAll(/\\(")/g, '$1')
            .replaceAll('\\n', '\n');

          const hasDone = lines.includes('[DONE]');
          if (!hasDone) {
            setTranslateAnswer(lines);
          } else {
            setTranslateDone(true);
          }
        }
      }
    } catch (err) {
      toast.error('Ocorreu um erro, tente novamente');
    }
  }

  useEffect(() => {
    getFeedbackData();
  }, []);

  useEffect(() => {
    if (translateAnswer.length > 0) {
      document.getElementById('answerElement')!.innerHTML = translateAnswer;
    }
  }, [translateAnswer]);

  return (
    <PageTransition>
      <RouteGuard>
        <section className={'h-full'}>
          {feedbackData ? (
            <>
              <header className={'flex justify-between w-full'}>
                <div className={'prose w-full max-w-full'}>
                  <h1 className={'prose-h1 pb-1 mb-1'}>{feedbackData.title}</h1>
                  <h5 className="prose-h5">{feedbackData.context}</h5>
                </div>
                <button
                  className={
                    'btn btn-sm btn-ghost text-xs md:text-sm lg:btn-md'
                  }
                  onClick={goBack}
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                  Voltar
                </button>
              </header>

              <main className={'mt-4'}>
                <div className="output flex items-start justify-between gap-8">
                  <aside className="min-w-1/2 w-1/2">
                    <div className="card w-full bg-base-100 shadow-lg mb-4">
                      <div className="card-body p-6">
                        <h2 className="card-title m-0">O que você enviou</h2>
                        <p className="m-0">{feedbackData.input}</p>
                      </div>
                    </div>
                  </aside>
                  <aside className="min-w-1/2 w-1/2">
                    <div className="card w-full bg-base-100 shadow-lg mb-4">
                      <div className="card-body p-6">
                        <h2 className="card-title m-0">Nosso feedback</h2>
                        <div className="languages absolute top-4 right-4">
                          <span
                            onClick={toggleLanguage}
                            className={`${
                              language === 'pt' ? 'font-bold' : ''
                            } language hover:text-gray-400 mr-4 cursor-pointer transition-all`}
                          >
                            pt-br
                          </span>
                          <span
                            onClick={toggleLanguage}
                            className={`${
                              language === 'en' ? 'font-bold' : ''
                            } language hover:text-gray-400 cursor-pointer transition-all`}
                          >
                            en-us
                          </span>
                        </div>
                        {language === 'en' ? (
                          <p
                            className={`${styles.outputText} m-0 pr-4 whitespace-pre-line`}
                          >
                            {feedbackData.output}
                          </p>
                        ) : feedbackData.portugueseOutput ? (
                          <p
                            className={`${styles.outputText} m-0 pr-4 whitespace-pre-line`}
                          >
                            {feedbackData.portugueseOutput}
                          </p>
                        ) : translateDone ? (
                          <p
                            className={`${styles.outputText} m-0 pr-4 whitespace-pre-line`}
                          >
                            {translateAnswer}
                          </p>
                        ) : translateLoading ? (
                          <Loading />
                        ) : (
                          <p
                            id="answerElement"
                            className="whitespace-pre-line"
                          ></p>
                        )}
                      </div>
                    </div>
                  </aside>
                </div>
              </main>
            </>
          ) : (
            <Loading />
          )}
        </section>
      </RouteGuard>
    </PageTransition>
  );
}
