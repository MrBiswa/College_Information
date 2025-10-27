import React, { useEffect, useMemo, useState } from 'react';
import { Typography, Box, Paper, Stack, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Select, InputLabel, FormControl, Chip, CircularProgress, Tooltip, IconButton } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { fetchTemplates, createTemplate, updateTemplate, deleteTemplate } from '../api/templates';
import { Delete, Edit, Add } from '@mui/icons-material';

const categories = ['electrical', 'mechanical', 'thermal', 'fluid_flow', 'electro_technical'];
const products = ['leather', 'shoe', 'electrical', 'toys', 'mechanical', 'thermal', 'electronics', 'other'];

const TestTemplates: React.FC = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState<any>({
    name: '',
    description: '',
    testingCategory: '',
    productCategory: '',
    productSubCategory: '',
    reportSections: [],
    isActive: true,
    isCustom: false,
  });

  const load = async () => {
    setLoading(true);
    try {
      const list = await fetchTemplates();
      setRows(list);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const columns: GridColDef[] = useMemo(
    () => [
      { field: 'name', headerName: 'Name', flex: 1.2, minWidth: 160 },
      { field: 'testingCategory', headerName: 'Category', flex: 0.8, minWidth: 140 },
      { field: 'productCategory', headerName: 'Product', flex: 0.8, minWidth: 140 },
      {
        field: 'isActive',
        headerName: 'Active',
        width: 100,
        renderCell: (p: GridRenderCellParams) => (p.value ? <Chip label="Yes" color="success" size="small" /> : <Chip label="No" size="small" />),
      },
      {
        field: 'actions',
        headerName: 'Actions',
        sortable: false,
        filterable: false,
        width: 120,
        renderCell: (params: GridRenderCellParams) => (
          <Stack direction="row" spacing={1}>
            <Tooltip title="Edit">
              <IconButton color="primary" onClick={() => onEdit(params.row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton color="error" onClick={() => onDelete(String(params.row.id))}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Stack>
        ),
      },
    ],
    []
  );

  const onEdit = (row: any) => {
    setEditing(row);
    setForm({ ...row });
    setOpen(true);
  };

  const onDelete = async (id: string) => {
    if (!window.confirm('Delete this template?')) return;
    await deleteTemplate(id);
    await load();
  };

  const onCreate = () => {
    setEditing(null);
    setForm({
      name: '',
      description: '',
      testingCategory: '',
      productCategory: '',
      productSubCategory: '',
      reportSections: [],
      isActive: true,
      isCustom: false,
    });
    setOpen(true);
  };

  const handleSubmit = async () => {
    const payload = {
      ...form,
      reportSections: form.reportSections?.length ? form.reportSections : [
        { id: 'sec-1', title: 'Default Section', order: 1, isRequired: true, parameters: [] },
      ],
    };
    if (editing) {
      await updateTemplate(String(editing.id), payload);
    } else {
      await createTemplate(payload);
    }
    setOpen(false);
    await load();
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Test Templates
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        Manage master test templates and customize report formats.
      </Typography>

      <Stack direction="row" justifyContent="flex-end" sx={{ mb: 1 }}>
        <Button variant="contained" startIcon={<Add />} onClick={onCreate}>New Template</Button>
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

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editing ? 'Edit Template' : 'Create Template'}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Name" fullWidth value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <TextField label="Description" fullWidth multiline value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <FormControl fullWidth>
                <InputLabel>Testing Category</InputLabel>
                <Select label="Testing Category" value={form.testingCategory} onChange={(e) => setForm({ ...form, testingCategory: e.target.value })}>
                  {categories.map((c) => (
                    <MenuItem key={c} value={c}>{c}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Product Category</InputLabel>
                <Select label="Product Category" value={form.productCategory} onChange={(e) => setForm({ ...form, productCategory: e.target.value })}>
                  {products.map((p) => (
                    <MenuItem key={p} value={p}>{p}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
            <TextField label="Product Subcategory" fullWidth value={form.productSubCategory} onChange={(e) => setForm({ ...form, productSubCategory: e.target.value })} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>{editing ? 'Save' : 'Create'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TestTemplates;