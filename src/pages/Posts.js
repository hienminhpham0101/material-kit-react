import { NetworkStatus, useMutation, useQuery } from '@apollo/client';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import { Button, Dialog, IconButton, Typography, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton
} from '@material-ui/data-grid';
import { Box } from '@material-ui/system';
import * as React from 'react';
import FailToFetch from '../components/FailToFetch';
import AddNewPostForm from '../components/posts/addNewPostForm';
import { columns } from '../components/posts/columns';
import ConfirmDialog from '../components/posts/confirmDialog';
import CustomNoRowsOverlay from '../components/posts/customNoRowsOverlay';
import { getIcon } from '../layouts/dashboard/SidebarConfig';
import { GET_POSTS, GET_POST_BY_ID } from '../services/posts/queries.post';
import { fDate } from '../utils/formatTime';

export default function Posts() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));
  const [openAddNewPostForm, setOpenAddNewPostForm] = React.useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [dataForm, setDataForm] = React.useState();

  const handleCloseAddNewPostForm = () => {
    setOpenAddNewPostForm(false);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const onFinish = () => {
    setSelectedRows([]);
  };

  const CustomToolbar = () => (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      {selectedRows.length > 0 ? (
        <IconButton color="primary" aria-label="delete" onClick={() => setOpenConfirmDialog(true)}>
          {getIcon(trash2Outline)}
        </IconButton>
      ) : null}
    </GridToolbarContainer>
  );

  const {
    loading,
    error,
    data: dataPost,
    networkStatus
  } = useQuery(GET_POSTS, {
    notifyOnNetworkStatusChange: true
  });

  const handleGetPostById = (id) => {
    getPostById({
      variables: {
        id
      }
    })
      .then((result) => {
        const { data } = result;
        if (data) {
          setOpenAddNewPostForm(true);
          setDataForm(data.getPostById);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [getPostById] = useMutation(GET_POST_BY_ID);

  const actionColumn = React.useMemo(
    () => ({
      field: 'Action',
      width: 200,
      filterable: false,
      renderCell: ({ id }) => (
        <div>
          <Button variant="contained" onClick={() => handleGetPostById(id)} sx={{ mr: 1 }}>
            Edit
          </Button>
          <Button
            onClick={() => {
              setSelectedRows([+id]);
              setOpenConfirmDialog(true);
            }}
            variant="outlined"
            color="error"
          >
            Remove
          </Button>
        </div>
      )
    }),
    []
  );

  React.useEffect(() => {
    columns.push(actionColumn);
  }, [dataPost, actionColumn]);

  if (error) return FailToFetch(error);
  if (networkStatus === NetworkStatus.refetch) return 'Refetching!';

  const rows =
    dataPost &&
    dataPost.posts.map((item) => ({
      id: item.id,
      title: item.title,
      content: item.content,
      voteUp: item.voteUp,
      voteDown: item.voteDown,
      viewCount: item.viewCount,
      author: item.ownerUserId.username,
      image: item.image,
      category: item.categoryId.name,
      created: fDate(item.createdAt)
    }));

  return (
    <Box sx={{ mx: 5 }} style={{ height: '100%' }}>
      <Box display="flex" justifyContent="space-between">
        <Typography component="span" variant="h4" style={{ marginBottom: '1rem' }}>
          Posts
        </Typography>
        <Button
          variant="outlined"
          style={{ marginBottom: '1rem' }}
          onClick={() => setOpenAddNewPostForm(true)}
        >
          New Post
        </Button>
      </Box>
      <div style={{ height: '100%' }}>
        {loading ? (
          <span>Loading ...</span>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            checkboxSelection
            disableSelectionOnClick
            components={{
              Toolbar: CustomToolbar,
              NoRowsOverlay: CustomNoRowsOverlay
            }}
            onSelectionModelChange={(ids) => {
              const selectedRowsId = ids.map((x) => +x);
              setSelectedRows(selectedRowsId);
            }}
          />
        )}
      </div>

      <Dialog
        fullScreen={fullScreen}
        open={openAddNewPostForm}
        fullWidth
        maxWidth="lg"
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            setOpenAddNewPostForm(false);
          }
        }}
      >
        <AddNewPostForm initialValues={dataForm} handleClose={handleCloseAddNewPostForm} />
      </Dialog>
      <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
        <ConfirmDialog
          selectedRows={selectedRows}
          handleClose={handleCloseConfirmDialog}
          onFinish={onFinish}
        />
      </Dialog>
    </Box>
  );
}
