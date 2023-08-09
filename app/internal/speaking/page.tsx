'use client';

import { Feedback } from '@/shared/models/feedbacks/feedback.model';
import { speakingService } from '@/shared/services/speaking/SpeakingService';
import { GridColDef, GridRowId } from '@mui/x-data-grid';

import DataTable from '@/components/DataTable/DataTable';
import Loading from '@/shared/components/Loading/Loading';
import PageTransition from '@/shared/components/PageTransition/PageTransition';
import RouteGuard from '@/shared/guards/RouteGuard';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './SpeakingDashboard.module.scss';

const SpeakingDashboard = (props: any, ref: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { push } = useRouter();
  const [feedbackData, setFeedbackData] = useState<Feedback[]>([]);
  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Título',
      headerClassName: styles.dataGridHeader,
      flex: 1,
      minWidth: 200,
      filterable: false,
    },
    {
      field: 'context',
      headerName: 'Contexto',
      headerClassName: styles.dataGridHeader,
      flex: 1,
      minWidth: 200,
      filterable: false,
    },
    {
      field: 'status',
      headerName: 'Status',
      headerClassName: styles.dataGridHeader,
      flex: 1,
      minWidth: 200,
      filterable: false,
    },
    {
      field: 'createdAt',
      headerName: 'Data',
      headerClassName: styles.dataGridHeader,
      flex: 1,
      minWidth: 200,
      filterable: false,

      valueGetter: ({ row }) =>
        new Intl.DateTimeFormat('pt-BR', {
          dateStyle: 'short',
          timeStyle: 'short',
        }).format(new Date(row.createdAt)),
    },
  ];

  function goToNew() {
    push('/internal/speaking/scenarios');
  }

  function goToDetails(feedbackId: GridRowId) {
    push(`/internal/speaking/details?id=${feedbackId}`);
  }

  function getFeedbacks() {
    setLoading(true);
    speakingService
      .getSpeakings()
      .then(({ data }) => {
        const { feedbacks } = data;
        setFeedbackData(feedbacks);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    getFeedbacks();

    setInterval(() => {
      speakingService.getSpeakings().then(({ data }) => {
        const { feedbacks } = data;
        setFeedbackData(feedbacks);
      });
    }, 8000);
  }, []);

  return (
    <PageTransition className="h-full">
      <RouteGuard>
        <section className={'h-full'}>
          <header className={'flex justify-between w-full'}>
            <div className={'prose'}>
              <h1 className={'mb-0 prose-h1 pb-1'}>
                Speaking - Análises Recebidas
              </h1>
            </div>
            <button className={'btn btn-primary'} onClick={goToNew}>
              Solicitar nova análise
            </button>
          </header>
          {loading ? (
            <Loading />
          ) : feedbackData.length > 0 ? (
            <DataTable
              columns={columns}
              onRowClick={goToDetails}
              data={feedbackData}
              classes={{
                sortIcon: styles.dataGridIcon,
              }}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <span>Por enquanto você não solicitou nenhuma análise.</span>
            </div>
          )}
        </section>
      </RouteGuard>
    </PageTransition>
  );
};

export default SpeakingDashboard;
