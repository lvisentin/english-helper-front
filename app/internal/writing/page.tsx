'use client';

import RouteGuard from '@/shared/guards/RouteGuard';
import Link from 'next/link';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import styles from '@/app/internal/speaking/SpeakingDashboard.module.scss';
import { useEffect, useState } from 'react';
import { Feedback } from '@/shared/models/feedbacks/feedback.model';
import { writingService } from '@/shared/services/writing/WritingService';
import HelpButton from '@/components/HelpButton/HelpButton';

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

export default function WritingPage() {
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
    <RouteGuard>
      <>
        <section className={'pt-8 grid'}>
          <header className={'flex justify-between pb-6'}>
            <div className={'prose'}>
              <h1 className={'mb-0 pb-1'}>Writing - Análises recebidas</h1>
            </div>

            <button className={'btn btn-primary'}>
              <Link href={'/writing/new'}>Solicitar análise</Link>
            </button>
          </header>
          <div className={'pb-20'}>
            {loadingData ? (
              <span className="loading loading-dots loading-lg"></span>
            ) : (
              <DataGrid
                localeText={{
                  MuiTablePagination: {
                    labelDisplayedRows: ({ from, to }) =>
                      `Mostrando de ${from} até ${to}`,
                    labelRowsPerPage: 'Resultados por página',
                  },
                }}
                className={`${styles.dataGrid} h-fit mt-6`}
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
      </>
    </RouteGuard>
  );
}
