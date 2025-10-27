import React, { useEffect, useMemo, useState } from 'react';
import { Typography, Box, Paper, FormControl, InputLabel, Select, MenuItem, IconButton, Stack, Chip, Tooltip, CircularProgress } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Delete, AssignmentInd, CheckCircle } from '@mui/icons-material';
import { fetchSamples, assignSample, updateSampleStatus, deleteSample, SampleStatus } from '../api/samples';
import { fetchEmployees } from '../api/users';
import { useAuth } from '../contexts/AuthContext';

const statusColors: Record<string, 'default' | 'success' | 'warning' | 'info'> = {
  submitted: 'info',
  assigned: 'warning',
  in_progress: 'warning',
  testing_complete: 'info',
  report_generated: 'info',
  completed: 'success',
  cancelled: 'default',
};

const SampleManagement: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);

  const load = async () => {
    setLoading(true);
    try {
      const [samplesData, employeeList] = await Promise.all([
        fetchSamples(),
        fetchEmployees(),
      ]);
      setRows(samplesData);
      setEmployees(employeeList);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleAssign = async (sampleId: string, employeeId: string) => {
    await assignSample(sampleId, employeeId);
    await load();
  };

  const handleStatus = async (sampleId: string, status: SampleStatus) => {
    await updateSampleStatus(sampleId, status);
    await load();
  };

  const handleDelete = async (sampleId: string) => {
    if (!window.confirm('Delete this sample?')) return;
    await deleteSample(sampleId);
    await load();
  };

  const columns: GridColDef[] = useMemo(
    () => [
      { field: 'sampleNumber', headerName: 'Sample #', flex: 1, minWidth: 140 },
      { field: 'clientName', headerName: 'Client', flex: 1, minWidth: 140 },
      { field: 'productName', headerName: 'Product', flex: 1, minWidth: 160 },
      { field: 'productCategory', headerName: 'Category', flex: 1, minWidth: 120 },
      {
        field: 'status',
        headerName: 'Status',
        flex: 1,
        minWidth: 160,
        renderCell: (params: GridRenderCellParams) => (
          <Stack direction="row" spacing={1} alignItems="center" sx={{ width: '100%' }}>
            <Chip label={params.value} color={statusColors[String(params.value)]} size="small" />
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel id={`status-${params.id}`}>Update</InputLabel>
              <Select
                labelId={`status-${params.id}`}
                label="Update"
                value={''}
                onChange={(e) => handleStatus(String(params.row.id), e.target.value as SampleStatus)}
              >
                {Object.values(SampleStatus).map((s) => (
                  <MenuItem key={s} value={s}>{s}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        ),
      },
      {
        field: 'assigned_employee_id',
        headerName: 'Assigned To',
        flex: 1,
        minWidth: 220,
        renderCell: (params: GridRenderCellParams) => (
          <Stack direction="row" spacing={1} alignItems="center" sx={{ width: '100%' }}>
            <Chip
              label={
                employees.find((e) => e.id === params.value)?.firstName
                  ? `${employees.find((e) => e.id === params.value).firstName} ${employees.find((e) => e.id === params.value).lastName}`
                  : 'Unassigned'
              }
              variant="outlined"
              size="small"
            />
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel id={`assign-${params.id}`}>Assign</InputLabel>
              <Select
                labelId={`assign-${params.id}`}
                label="Assign"
                value={''}
                onChange={(e) => handleAssign(String(params.row.id), String(e.target.value))}
              >
                {employees.map((emp) => (
                  <MenuItem key={emp.id} value={emp.id}>
                    {emp.firstName} {emp.lastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        ),
      },
      {
        field: 'actions',
        headerName: 'Actions',
        sortable: false,
        filterable: false,
        width: 120,
        renderCell: (params: GridRenderCellParams) => (
          <Stack direction="row" spacing={1}>
            <Tooltip title="Mark Completed">
              <IconButton color="success" onClick={() => handleStatus(String(params.row.id), SampleStatus.completed)}>
                <CheckCircle />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton color="error" onClick={() => handleDelete(String(params.row.id))}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Stack>
        ),
      },
    ],
    [employees]
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Sample Management
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        Manage test samples, assign employees, and track progress.
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

export default SampleManagement;