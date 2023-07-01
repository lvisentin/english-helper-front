import PrimaryLayout from '@/components/layouts/primary/PrimaryLayout';
import SidebarLayout from '@/components/layouts/sidebar/SidebarLayout';
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
      resizable: true,
    },
    {
      field: 'context',
      headerName: 'Contexto',
      headerClassName: styles.dataGridHeader,
      flex: 1,
      minWidth: 200,
      filterable: false,
      resizable: true,
    },
    {
      field: 'status',
      headerName: 'Status',
      headerClassName: styles.dataGridHeader,
      flex: 1,
      minWidth: 200,
      filterable: false,
      resizable: true,
    },
    {
      field: 'createdAt',
      headerName: 'Data',
      headerClassName: styles.dataGridHeader,
      flex: 1,
      minWidth: 200,
      filterable: false,
      resizable: true,
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
        const { feedbacks } = data;
        setFeedbackData(feedbacks);
        console.log('feedbacks', feedbacks);
      });
    }
  }, []);

  return (
    <div className={`${styles.content} prose`}>
      <h2>Speaking - Análises Recebidas</h2>
      {feedbackData.length > 0 && (
        <DataGrid
          className={`${styles.dataGrid}`}
          getRowId={(row) => row._id}
          rows={feedbackData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          disableColumnSelector
          pageSizeOptions={[5, 10]}
        />
      )}
    </div>
  );
};

export default SpeakingDashboard;

SpeakingDashboard.getLayout = (page) => {
  return (
    <PrimaryLayout>
      <SidebarLayout />
      {page}
    </PrimaryLayout>
  );
};
