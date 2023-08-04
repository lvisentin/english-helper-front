'use client';

import Loading from '@/shared/components/Loading/Loading';
import LoadingButton from '@/shared/components/LoadingButton/LoadingButton';
import PageTransition from '@/shared/components/PageTransition/PageTransition';
import RouteGuard from '@/shared/guards/RouteGuard';
import { subscriptionService } from '@/shared/services/subscription/SubscriptionService';
import {
  SubscriptionPlan,
  SubscriptionStatus,
  UserSubscription,
} from '@/shared/services/subscription/SubscriptionService.model';
import { recurrenceToString } from '@/shared/utils/RecurrenceToString';
import { secondsToMinutes } from '@/shared/utils/SecondsToMinutes';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function MySubscription() {
  const [loading, setLoading] = useState<boolean>(false);
  const [subscribeLoading, setSubscribeLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const [subscriptionPlans, setSubscriptionPlans] =
    useState<SubscriptionPlan[]>();
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [userSubscription, setUserSubscription] = useState<UserSubscription>();
  const [selectedPlan, setSelectedPlan] = useState<string>('');

  function getUserSubscriptionStatus() {
    subscriptionService
      .getSubscriptionStatus()
      .then(({ data }) => {
        setUserSubscription(data);
        setIsSubscribed(data.subscriptionStatus === SubscriptionStatus.active);
        setLoading(false);
      })
      .catch(() => toast.error('Ocorreu um erro, tente novamente mais tarde.'));
  }

  function getAllPlans() {
    subscriptionService
      .getAllPlans()
      .then(({ data }) => {
        console.log('data', data);
        setSubscriptionPlans(data);
        getUserSubscriptionStatus();
      })
      .catch(() => toast.error('Ocorreu um erro, tente novamente mais tarde.'));
  }

  function handleSubscribeClick(stripeProductId: string) {
    if (isSubscribed && userSubscription?.plan.recurrence === 'monthly') {
      showConfirmationModal(stripeProductId);
    } else {
      subscribe(stripeProductId);
    }
  }

  function subscribe(stripeProductId: string) {
    setSubscribeLoading(true);

    if (isSubscribed) {
      if (userSubscription?.plan.recurrence === 'yearly') {
        // @ts-ignore
        window.downgrade_dialog.showModal();
        setSubscribeLoading(false);
        return;
      } else {
        subscriptionService
          .changeSubscription(stripeProductId)
          .then(() => getAllPlans())
          .catch(() =>
            toast.error('Ocorreu um erro, tente novamente mais tarde.')
          )
          .finally(() => setSubscribeLoading(false));
      }
    } else {
      subscriptionService
        .subscribe(stripeProductId)
        .then(({ data: { url } }) => {
          window.location.href = url;
        })
        .catch(() =>
          toast.error('Ocorreu um erro, tente novamente mais tarde.')
        )
        .finally(() => setSubscribeLoading(false));
    }
  }

  function checkRouteParameters() {
    if (searchParams?.get('success') === 'true') {
      toast.success('Sua assinatura foi confirmada!', {
        className: 'text-sm',
      });
    }
    if (searchParams?.get('error') === 'true') {
      toast.error('Ocorreu um erro, tente novamente mais tarde', {
        className: 'text-sm',
      });
    }
  }

  function showConfirmationModal(stripeProductId: string) {
    setSelectedPlan(stripeProductId);
    //@ts-ignore
    window.upgrade_dialog.showModal();
  }

  function confirmSubscribe() {
    subscribe(selectedPlan);
  }

  function cancelSubscribe() {
    console.log('cancelsubs');
    setSelectedPlan('');
  }

  useEffect(() => {
    setLoading(true);
    getAllPlans();
    checkRouteParameters();
  }, []);

  return (
    <PageTransition>
      <RouteGuard>
        <>
          <dialog
            id="downgrade_dialog"
            className="modal modal-bottom sm:modal-middle"
          >
            <form method="dialog" className="modal-box prose">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
              <h2 className="text-center mt-4">Downgrade de plano</h2>
              <p>
                Para fazer um downgrade do plano você precisa entrar em contato
                com o suporte através do botão de ajuda no canto inferior da
                tela.
              </p>
              <div className="modal-actions text-center">
                <button className="btn btn-primary">Entendi</button>
              </div>
            </form>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>

          <dialog
            id="upgrade_dialog"
            className="modal modal-bottom sm:modal-middle"
          >
            <form method="dialog" className="modal-box prose">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
              <h2 className="text-center mt-4">Upgrade de plano</h2>
              <p>
                Tem certeza que gostaria de fazer o upgrade do seu plano? Iremos
                cobrar em seu cartão já salvo.
              </p>
              <div className="modal-actions text-center">
                <button
                  onClick={confirmSubscribe}
                  className="btn btn-primary mr-4"
                >
                  Entendi
                </button>
                <button onClick={cancelSubscribe} className="btn">
                  Cancelar
                </button>
              </div>
            </form>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
          <section className={'grid'}>
            <header className={'flex justify-between pb-6'}>
              <div className={'prose'}>
                <h1 className={'mb-0 pb-1'}>Minha Assinatura</h1>
              </div>
            </header>
          </section>

          <main>
            {userSubscription?.subscriptionStatus ===
              SubscriptionStatus.inactive && (
              <header className="prose w-full max-w-full">
                <h3 className="mb-8 text-center w-full font-normal">
                  Você está em Free Trial, seu trial acaba em:{' '}
                  {userSubscription.leftDays} dias.
                </h3>
              </header>
            )}
            {loading ? (
              <Loading />
            ) : (
              subscriptionPlans &&
              subscriptionPlans.map((plan, key) => (
                <div
                  key={key}
                  className="card w-full bg-base-100 shadow-lg mb-4 "
                >
                  <div
                    className={`${
                      isSubscribed &&
                      userSubscription?.plan.stripeProductId ===
                        plan.stripeProductId
                        ? 'border-green-500 border-2'
                        : 'border-2 border-transparent hover:border-green-200 cursor-pointer'
                    } card-body flex flex-row items-center justify-between p-6 transition-all`}
                  >
                    {isSubscribed &&
                      userSubscription?.plan.stripeProductId ===
                        plan.stripeProductId && (
                        <div className="badge badge-accent absolute right-0 top-0 text-white p-3">
                          Ativo
                        </div>
                      )}

                    <div className="content">
                      <h2 className="card-title m-0 mb-4">
                        {plan.name} - {recurrenceToString(plan.recurrence)}
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
                          {plan.oldPrice.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </span>
                      </div>
                      <div className="new-pricing text-right">
                        <span className="text-sm">por</span>
                        <span className="new-price font-bold ml-2 text-xl">
                          {plan.price.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </span>
                      </div>
                      {userSubscription &&
                      isSubscribed &&
                      userSubscription?.plan.stripeProductId ===
                        plan.stripeProductId ? (
                        <button
                          disabled
                          className="btn btn-primary w-full mt-2"
                        >
                          Plano Ativo
                        </button>
                      ) : (
                        <LoadingButton
                          className="btn btn-primary w-full mt-2"
                          onClick={() =>
                            handleSubscribeClick(plan.stripeProductId)
                          }
                          loading={subscribeLoading}
                        >
                          {userSubscription && isSubscribed
                            ? 'Mudar meu plano'
                            : 'Assinar'}
                        </LoadingButton>
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
