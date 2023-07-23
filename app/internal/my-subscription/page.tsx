'use client';

import PageTransition from '@/shared/components/PageTransition/PageTransition';
import RouteGuard from '@/shared/guards/RouteGuard';
import { subscriptionService } from '@/shared/services/subscription/SubscriptionService';
import {
  SubscriptionPlan,
  UserSubscription,
} from '@/shared/services/subscription/SubscriptionService.model';
import { secondsToMinutes } from '@/shared/utils/SecondsToMinutes';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
export default function MySubscription() {
  const [loading, setLoading] = useState<boolean>(false);

  const [subscriptionPlans, setSubscriptionPlans] =
    useState<SubscriptionPlan[]>();
  const [userSubscription, setUserSubscription] = useState<UserSubscription>();

  function getUserSubscriptionStatus() {
    subscriptionService.getSubscriptionStatus().then(({ data }) => {
      setUserSubscription(data);
      setLoading(false);
    });
  }

  function getAllPlans() {
    subscriptionService.getAllPlans().then(({ data }) => {
      setSubscriptionPlans(data);
      getUserSubscriptionStatus();
    });
  }

  function subscribe(stripeProductId: string) {
    console.log(stripeProductId);
  }

  useEffect(() => {
    setLoading(true);
    getAllPlans();
  }, []);

  return (
    <PageTransition>
      <RouteGuard>
        <>
          <section className={'grid'}>
            <header className={'flex justify-between pb-6'}>
              <div className={'prose'}>
                <h1 className={'mb-0 pb-1'}>Minha Assinatura</h1>
              </div>
            </header>
          </section>

          <main>
            {loading ? (
              <div className="flex items-center justify-center h-full mt-8">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : (
              subscriptionPlans &&
              subscriptionPlans.map((plan, key) => (
                <div
                  key={key}
                  className="card w-full bg-base-100 shadow-lg mb-4 "
                >
                  <div
                    className={`${
                      userSubscription?.plan.stripeProductId ===
                      plan.stripeProductId
                        ? 'border-green-500 border-2'
                        : 'border-2 border-transparent hover:border-green-200 cursor-pointer'
                    } card-body flex flex-row items-center justify-between p-6 transition-all`}
                  >
                    {userSubscription?.plan.stripeProductId ===
                      plan.stripeProductId && (
                      <div className="badge badge-accent absolute right-0 top-0 text-white p-3">
                        Ativo
                      </div>
                    )}

                    <div className="content">
                      <h2 className="card-title m-0">
                        {plan.name} - {plan.recurrence}
                      </h2>
                      <ul className="benefits">
                        <li>
                          <FontAwesomeIcon icon={faCheck} />
                          <span className="ml-2">
                            Audios de até{' '}
                            {secondsToMinutes(plan.maxAudioDuration)} minutos
                          </span>
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faCheck} />
                          <span className="ml-2">
                            Todos os cenários disponíveis
                          </span>
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faCheck} />
                          <span className="ml-2">
                            {plan.maxTotalWords} palavras
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="actions">
                      <div className="old-pricing text-right">
                        <span className="text-sm">de</span>
                        <span className="price ml-2 line-through text-sm">
                          R$39,90
                        </span>
                      </div>
                      <div className="new-pricing text-right">
                        <span className="text-sm">por</span>
                        <span className="new-price font-bold ml-2 text-xl">
                          R$29,90
                        </span>
                      </div>
                      {userSubscription &&
                      userSubscription?.plan.stripeProductId ===
                        plan.stripeProductId ? (
                        <button
                          disabled
                          className="btn btn-primary w-full mt-2"
                        >
                          Plano Ativo
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary w-full mt-2"
                          onClick={() => subscribe(plan.stripeProductId)}
                        >
                          Assinar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </main>
        </>
      </RouteGuard>
    </PageTransition>
  );
}
