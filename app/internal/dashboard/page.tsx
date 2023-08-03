'use client';

import Loading from '@/shared/components/Loading/Loading';
import PageTransition from '@/shared/components/PageTransition/PageTransition';
import RouteGuard from '@/shared/guards/RouteGuard';
import { scenariosService } from '@/shared/services/scenarios/ScenariosService';
import { Scenario } from '@/shared/services/scenarios/ScenariosService.model';
import { userService } from '@/shared/services/user/UserService';
import { UserWithoutSensitiveInfo } from '@/shared/services/user/UserService.model';
import { AxiosResponse } from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function Dashboard() {
  const [userData, setUserData] = useState<UserWithoutSensitiveInfo>();
  const [userStats, setUserStats] = useState<any>();
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  function getScenarios() {
    setLoading(true);
    scenariosService
      .getScenarios()
      .then(({ data }: AxiosResponse<Scenario[]>) => {
        setScenarios(data);
      })
      .finally(() => setLoading(false));
  }

  function getUserData() {
    const userDataResponse = userService.getUserData();
    if (userDataResponse) {
      setUserData(userDataResponse);
    }
  }

  function getUserStats() {
    userService.getUserStats().then(({ data }) => {
      setUserStats(data);
    });
  }

  useEffect(() => {
    getScenarios();
    getUserData();
    getUserStats();
  }, []);

  return (
    <PageTransition>
      <RouteGuard>
        <main className="prose w-full max-w-full">
          <div className="header">
            <h2 className="mt-0">Welcome, {userData?.name}!</h2>
            <div className="cards flex align-items-center gap-10">
              <div className="card w-56 bg-base-100 shadow-lg">
                <div className="card-body p-6">
                  <h2 className="card-title m-0">
                    {userStats?.completedFeedbacksCount}
                  </h2>
                  <p className="m-0">Cenários praticados</p>
                </div>
              </div>
              <div className="card w-56 bg-base-100 shadow-lg">
                <div className="card-body p-6">
                  <h2 className="card-title m-0">{userStats?.sumWordsCount}</h2>
                  <p className="m-0">Palavras analisadas</p>
                </div>
              </div>
            </div>
          </div>
          <div className="content">
            <h2 className="mt-5">Praticar cenários</h2>
            <div className="scenarios">
              {loading ? (
                <Loading />
              ) : (
                scenarios.length > 0 &&
                scenarios.map((scenario, key) => (
                  <Link
                    key={key}
                    href={{
                      pathname: `/internal/writing/scenarios/new`,
                      query: `id=${scenario._id}`,
                    }}
                    className="no-underline font-normal"
                  >
                    <div className="card w-full bg-base-100 shadow-lg mb-4 cursor-pointer">
                      <div className="card-body p-6">
                        <h2 className="card-title m-0">{scenario.title}</h2>
                        <p className="m-0">{scenario.text}</p>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </main>
      </RouteGuard>
    </PageTransition>
  );
}

export default Dashboard;
