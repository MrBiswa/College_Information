import React, { useEffect, useMemo, useState } from 'react';
import { Typography, Box, Paper, Stack, Chip, IconButton, Tooltip, CircularProgress, Switch } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { CheckCircle, Block } from '@mui/icons-material';
import { fetchEmployees, activateUser, deactivateUser } from '../api/users';

const EmployeeManagement: React.FC = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const list = await fetchEmployees();
      setRows(list);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleToggleActive = async (userId: string, isActive: boolean) => {
    if (isActive) {
      await deactivateUser(userId);
    } else {
      await activateUser(userId);
    }
    await load();
  };

  const columns: GridColDef[] = useMemo(
    () => [
      { field: 'firstName', headerName: 'First Name', flex: 1, minWidth: 120 },
      { field: 'lastName', headerName: 'Last Name', flex: 1, minWidth: 120 },
      { field: 'email', headerName: 'Email', flex: 1.2, minWidth: 180 },
      { field: 'role', headerName: 'Role', flex: 0.8, minWidth: 120 },
      {
        field: 'testingCategories',
        headerName: 'Categories',
        flex: 1.4,
        minWidth: 200,
        renderCell: (params: GridRenderCellParams) => (
          <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap' }}>
            {(params.value || []).map((c: string) => (
              <Chip key={c} label={c} size="small" />
            ))}
          </Stack>
        ),
      },
      {
        field: 'isActive',
        headerName: 'Active',
        width: 120,
        renderCell: (params: GridRenderCellParams) => (
          <Switch
            checked={Boolean(params.value)}
            onChange={() => handleToggleActive(String(params.row.id), Boolean(params.value))}
          />
        ),
      },
    ],
    []
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Employee Management
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        Manage lab employees, their testing categories, and workload.
      </Typography>

      <Paper sx={{ height: 600, width: '100%', p: 1 }}>
        {loading ? (
          <Stack alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
            <CircularProgress />
          </Stack>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.id}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }}
          />
        )}
      </Paper>
    </Box>
  );
};

export default EmployeeManagement;