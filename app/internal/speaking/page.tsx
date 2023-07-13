'use client';

import { Feedback } from '@/shared/models/feedbacks/feedback.model';
import { speakingService } from '@/shared/services/speaking/SpeakingService';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { useEffect, useState } from 'react';
import styles from './SpeakingDashboard.module.scss';

const SpeakingDashboard = () => {
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

  const [feedbackData, setFeedbackData] = useState<Feedback[]>([]);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      speakingService.getSpeakings().then(({ data }) => {
        console.log('data', data);
        const { feedbacks } = data;
        setFeedbackData(feedbacks);
        console.log('feedbacks', feedbacks);
      });
    }
  }, []);

  return (
    <>
      <section className={'grid'}>
        <header className={'flex justify-between'}>
          <div className={'prose'}>
            <h1 className={'mb-0 prose-h1'}>Speaking - Análises Recebidas</h1>
          </div>
        </header>
        {feedbackData.length > 0 && (
          <DataGrid
            className={`${styles.dataGrid} h-fit mt-6`}
            getRowId={(row) => row._id}
            rows={feedbackData}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            disableColumnSelector
            disableRowSelectionOnClick
            pageSizeOptions={[5, 10]}
          />
        )}
      </section>
    </>
  );
};

export default SpeakingDashboard;
