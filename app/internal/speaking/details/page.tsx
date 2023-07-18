'use client';

import { Feedback } from '@/shared/models/feedbacks/feedback.model';
import { speakingService } from '@/shared/services/speaking/SpeakingService';
import { GetSpeakingByIdResponse } from '@/shared/services/speaking/SpeakingService.model';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AxiosResponse } from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './SpeakingDetails.module.scss';

export default function SpeakingDetails() {
  const [feedbackData, setFeedbackData] = useState<Feedback>();
  const router = useRouter();
  const [language, setLanguage] = useState<'pt' | 'en'>('en');
  const searchParams = useSearchParams();
  const speakingId = searchParams?.get('id');

  function getFeedbackData() {
    speakingService
      .getSpeakingById(speakingId!)
      .then(
        ({ data: { feedback } }: AxiosResponse<GetSpeakingByIdResponse>) => {
          console.log(feedback);
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
  }

  useEffect(() => {
    getFeedbackData();
  }, []);

  return (
    <>
      <section className={'h-full'}>
        {feedbackData ? (
          <>
            <header className={'flex justify-between w-full'}>
              <div className={'prose w-full max-w-full'}>
                <h1 className={'prose-h1 pb-1 mb-1'}>{feedbackData.title}</h1>
                <h5 className="prose-h5">{feedbackData.context}</h5>
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
                      <p
                        className={`${styles.outputText} m-0 pr-4`}
                        dangerouslySetInnerHTML={{
                          __html:
                            language === 'en'
                              ? feedbackData.output
                              : feedbackData.portugueseOutput,
                        }}
                      ></p>
                    </div>
                  </div>
                </aside>
              </div>
            </main>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
      </section>
    </>
  );
}
