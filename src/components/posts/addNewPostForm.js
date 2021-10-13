import { useMutation, useQuery } from '@apollo/client';
import {
  Autocomplete,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField
} from '@material-ui/core';
import { Box } from '@material-ui/system';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { SnackBarContext } from '../../contexts/snackBarContext';
import { GET_CATEGORIES } from '../../services/categories/queries.categories';
import { CREATE_POST, GET_POSTS } from '../../services/posts/queries.post';
import { GET_TAGS } from '../../services/tags/queries.tags';
import FailToFetch from '../FailToFetch';

const Item = (props) => {
  const { ...other } = props;
  return (
    <Box
      sx={{
        pt: 1,
        mb: 1
      }}
      {...other}
    />
  );
};

export default function AddNewPostForm({ handleClose, initialValues }) {
  const { setSnackBar } = useContext(SnackBarContext);
  const [formState, setFormState] = React.useState({
    title: '',
    categoryId: initialValues?.categoryId || null,
    tagId: null,
    image: undefined,
    content: null
  });

  const [createPost] = useMutation(CREATE_POST, {
    refetchQueries: [GET_POSTS]
  });

  const { error: errorCategories, data: dataCategories } = useQuery(GET_CATEGORIES);
  const { error: errorTags, data: dataTags } = useQuery(GET_TAGS);

  if (errorCategories) return FailToFetch(errorCategories);
  if (errorTags) return FailToFetch(errorTags);

  const handleSubmit = (event) => {
    event.preventDefault();
    const variables = {
      ...formState,
      slug: formState.title
    };
    createPost({ variables })
      .then((result) => {
        const { data, message } = result;
        if (data) {
          setSnackBar({
            open: true,
            message: 'Created successfully !',
            type: 'success'
          });
          handleClose();
        } else {
          setSnackBar({
            open: true,
            message,
            type: 'error'
          });
        }
      })
      .catch((err) => {
        setSnackBar({
          open: true,
          message: err.message,
          type: 'error'
        });
      });
  };

  const handleChangeFormField = (event) => {
    const { name, value, files } = event.target;
    setFormState({
      ...formState,
      [name]: files ? URL.createObjectURL(files[0]) : value
    });
  };

  return (
    <>
      <DialogTitle>Add New Post</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Box>
            <Item>
              <FormControl fullWidth>
                <TextField
                  value={formState.title}
                  onChange={handleChangeFormField}
                  id="title"
                  name="title"
                  label="Title"
                  required
                />
              </FormControl>
            </Item>
            <Item>
              <FormControl fullWidth>
                <Autocomplete
                  name="categoryId"
                  options={dataCategories && dataCategories.categories}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, newValue) => {
                    setFormState({
                      ...formState,
                      categoryId: newValue ? +newValue.id : ''
                    });
                  }}
                  renderInput={(params) => (
                    <TextField {...params} required label="Category" variant="outlined" />
                  )}
                />
              </FormControl>
            </Item>
            <Item>
              <FormControl fullWidth>
                <Autocomplete
                  name="tagId"
                  options={dataTags && dataTags.tags}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, newValue) => {
                    setFormState({
                      ...formState,
                      tagId: newValue ? +newValue.id : ''
                    });
                  }}
                  renderInput={(params) => (
                    <TextField {...params} required label="Tag" variant="outlined" />
                  )}
                />
              </FormControl>
            </Item>
            <Item>
              <FormControl>
                <TextField
                  accept="image/*"
                  multiple
                  type="file"
                  onChange={handleChangeFormField}
                  required
                  name="image"
                />
                {formState.image && (
                  <img alt="img" src={formState.image} style={{ width: '50%', height: '50%' }} />
                )}
              </FormControl>
            </Item>
            <Item>
              <FormControl fullWidth>
                <TextField
                  id="content"
                  label="Content"
                  name="content"
                  multiline
                  rows={7}
                  variant="outlined"
                  required
                  onChange={handleChangeFormField}
                />
              </FormControl>
            </Item>
          </Box>
          <DialogActions>
            <Button autoFocus onClick={() => handleClose()} color="primary">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              onClick={() => handleClose}
              color="primary"
              autoFocus
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </>
  );
}

AddNewPostForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
  initialValues: PropTypes.object
};
