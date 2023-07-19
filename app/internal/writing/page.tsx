'use client';

import styles from '@/app/internal/speaking/SpeakingDashboard.module.scss';
import HelpButton from '@/components/HelpButton/HelpButton';
import PageTransition, {
  PageTransitionRef,
} from '@/shared/components/PageTransition/PageTransition';
import RouteGuard from '@/shared/guards/RouteGuard';
import { Feedback } from '@/shared/models/feedbacks/feedback.model';
import { writingService } from '@/shared/services/writing/WritingService';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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

export interface WritingProps {}

export default function WritingPage(
  props: WritingProps,
  ref: PageTransitionRef
) {
  const [writingFeedbacks, setWritingFeedbacks] = useState<Feedback[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      writingService
        .getWritings()
        .then(({ data }) => {
          const { feedbacks } = data;
          setWritingFeedbacks(feedbacks);
        })
        .catch((error) => {
          console.error('Service Error: ', error);
        })
        .finally(() => setLoadingData(false));
    }
  }, []);
  return (
    <PageTransition>
      <RouteGuard>
        <section className={'grid'}>
          <header className={'flex justify-between pb-6'}>
            <div className={'prose'}>
              <h1 className={'mb-0 pb-1'}>Writing - Análises recebidas</h1>
            </div>

            <button className={'btn btn-primary'}>
              <Link href={'/writing/new'}>Solicitar nova análise</Link>
            </button>
          </header>
          <div className={'pb-20'}>
            {loadingData ? (
              <div className="flex items-center justify-center h-full mt-8">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : (
              <DataGrid
                localeText={{
                  MuiTablePagination: {
                    labelDisplayedRows: ({ from, to }) =>
                      `Mostrando de ${from} até ${to}`,
                    labelRowsPerPage: 'Resultados por página',
                  },
                }}
                className={`${styles.dataGrid} h-fit`}
                getRowId={(row) => row._id}
                classes={{
                  sortIcon: styles.dataGridIcon,
                }}
                rows={writingFeedbacks}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                disableColumnSelector
                disableRowSelectionOnClick
                disableColumnMenu
                pageSizeOptions={[5, 10]}
              />
            )}
          </div>
          <HelpButton />
        </section>
      </RouteGuard>
    </PageTransition>
  );
}
