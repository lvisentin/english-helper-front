'use client';

import PageTransition from '@/shared/components/PageTransition/PageTransition';
import RouteGuard from '@/shared/guards/RouteGuard';
import { scenariosService } from '@/shared/services/scenarios/ScenariosService';
import { Scenario } from '@/shared/services/scenarios/ScenariosService.model';
import { AxiosResponse } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NewWriting() {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const { push } = useRouter();

  function goToCustom() {
    push('/internal/writing/new');
  }

  function getScenarios() {
    scenariosService
      .getScenarios()
      .then(({ data }: AxiosResponse<Scenario[]>) => {
        setScenarios(data);
      });
  }

  useEffect(() => {
    getScenarios();
  }, []);

  return (
    <PageTransition>
      <RouteGuard>
        <section className="grid">
          <header className={'flex justify-between w-full'}>
            <div className={'prose'}>
              <h1 className={'mb-0 prose-h1 pb-1'}>
                Writing - Selecionar cenário
              </h1>
            </div>
            <button className={'btn btn-primary'} onClick={goToCustom}>
              Não encontrei o que queria
            </button>
          </header>

          <main className={'mt-8'}>
            <div className="scenarios">
              {scenarios.length > 0 ? (
                scenarios.map((scenario, key) => (
                  <Link
                    key={key}
                    href={{
                      pathname: `/internal/writing/scenarios/new`,
                      query: `id=${scenario.id}`,
                    }}
                  >
                    <div className="card w-full bg-base-100 shadow-lg mb-4 cursor-pointer">
                      <div className="card-body p-6">
                        <h2 className="card-title m-0">{scenario.title}</h2>
                        <p className="m-0">{scenario.text}</p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="flex items-center justify-center h-full">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              )}
            </div>
          </main>
        </section>
      </RouteGuard>
    </PageTransition>
  );
}
