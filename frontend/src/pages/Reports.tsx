import React, { useEffect, useMemo, useState } from 'react';
import { Typography, Box, Paper, Stack, Button, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem, CircularProgress, Tooltip, IconButton } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { fetchReports, createReport, updateReportStatus } from '../api/reports';
import { fetchSamples } from '../api/samples';
import { fetchEmployees } from '../api/users';
import { useAuth } from '../contexts/AuthContext';
import { Add, Visibility } from '@mui/icons-material';

const statuses = ['draft', 'in_review', 'approved', 'published', 'rejected'];

const Reports: React.FC = () => {
  const { user } = useAuth();
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [samples, setSamples] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [filters, setFilters] = useState<{ status?: string; preparedById?: string }>({});
  const [newReport, setNewReport] = useState<{ sampleId: string; preparedById: string }>({ sampleId: '', preparedById: '' });

  const load = async () => {
    setLoading(true);
    try {
      const [list, sampleList, employeeList] = await Promise.all([
        fetchReports(filters),
        fetchSamples({ status: 'testing_complete' }),
        fetchEmployees(),
      ]);
      setRows(list);
      setSamples(sampleList);
      setEmployees(employeeList);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters)]);

  const columns: GridColDef[] = useMemo(
    () => [
      { field: 'reportNumber', headerName: 'Report #', flex: 1, minWidth: 140 },
      { field: 'title', headerName: 'Title', flex: 1.2, minWidth: 180 },
      { field: 'status', headerName: 'Status', flex: 0.8, minWidth: 140 },
      { field: 'prepared_by_id', headerName: 'Prepared By', flex: 1, minWidth: 160 },
      {
        field: 'actions',
        headerName: 'Actions',
        sortable: false,
        filterable: false,
        width: 220,
        renderCell: (params: GridRenderCellParams) => (
          <Stack direction="row" spacing={1}>
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel id={`status-${params.id}`}>Set Status</InputLabel>
              <Select
                labelId={`status-${params.id}`}
                label="Set Status"
                value={''}
                onChange={async (e) => {
                  await updateReportStatus(String(params.row.id), { status: String(e.target.value), userId: user?.id });
                  await load();
                }}
              >
                {statuses.map((s) => (
                  <MenuItem key={s} value={s}>{s}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Tooltip title="View">
              <IconButton color="primary" onClick={() => alert('Implement detailed view as needed')}>
                <Visibility />
              </IconButton>
            </Tooltip>
          </Stack>
        ),
      },
    ],
    [user]
  );

  const openCreate = () => {
    setNewReport({ sampleId: '', preparedById: user?.id || '' });
    setOpen(true);
  };

  const handleCreate = async () => {
    if (!newReport.sampleId || !newReport.preparedById) return;
    await createReport(newReport.sampleId, newReport.preparedById);
    setOpen(false);
    await load();
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        View and generate test reports based on completed samples.
      </Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }} alignItems="center">
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            value={filters.status || ''}
            onChange={(e) => setFilters({ ...filters, status: e.target.value || undefined })}
          >
            <MenuItem value="">All</MenuItem>
            {statuses.map((s) => (
              <MenuItem key={s} value={s}>{s}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 220 }}>
          <InputLabel>Prepared By</InputLabel>
          <Select
            label="Prepared By"
            value={filters.preparedById || ''}
            onChange={(e) => setFilters({ ...filters, preparedById: (e.target.value as string) || undefined })}
          >
            <MenuItem value="">All</MenuItem>
            {employees.map((emp) => (
              <MenuItem key={emp.id} value={emp.id}>{emp.firstName} {emp.lastName}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box flexGrow={1} />
        <Button variant="contained" startIcon={<Add />} onClick={openCreate}>Create Report</Button>
      </Stack>

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

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create Report</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Sample</InputLabel>
              <Select
                label="Sample"
                value={newReport.sampleId}
                onChange={(e) => setNewReport({ ...newReport, sampleId: e.target.value as string })}
              >
                {samples.map((s) => (
                  <MenuItem key={s.id} value={s.id}>{s.sampleNumber} - {s.productName}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Prepared By</InputLabel>
              <Select
                label="Prepared By"
                value={newReport.preparedById}
                onChange={(e) => setNewReport({ ...newReport, preparedById: e.target.value as string })}
              >
                {employees.map((emp) => (
                  <MenuItem key={emp.id} value={emp.id}>{emp.firstName} {emp.lastName}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Reports;