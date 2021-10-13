import { Tooltip } from '@material-ui/core';
import moreOutlined from '@iconify/icons-ant-design/more-outlined';
import { getIcon } from '../../layouts/dashboard/SidebarConfig';

const tooltip = (value) => (
  <Tooltip title={value || ''} placement="right">
    <span>{value}</span>
  </Tooltip>
);

export const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 100
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 250,
    renderCell: ({ value }) => tooltip(value)
  },
  {
    field: 'content',
    headerName: 'Content',
    width: 450,
    renderCell: ({ value }) => tooltip(value)
  },
  {
    field: 'voteUp',
    headerName: 'Vote Up',
    type: 'number',
    width: 160,
    filterable: false,
    renderCell: ({ value }) => tooltip(value)
  },
  {
    field: 'voteDown',
    headerName: 'Vote Down',
    type: 'number',
    width: 160,
    filterable: false,
    renderCell: ({ value }) => tooltip(value)
  },
  {
    field: 'viewCount',
    headerName: 'View Count',
    type: 'number',
    width: 160,
    filterable: false,
    renderCell: ({ value }) => tooltip(value)
  },
  {
    field: 'author',
    headerName: 'Author',
    width: 160,
    renderCell: ({ value }) => tooltip(value)
  },
  {
    field: 'category',
    headerName: 'Category',
    width: 160,
    renderCell: ({ value }) => tooltip(value)
  },
  {
    field: 'image',
    headerName: 'Image',
    width: 160,
    renderCell: ({ value }) => <img alt="img" src={value} />
  },
  {
    field: 'created',
    headerName: 'Created at',
    width: 200,
    renderCell: ({ value }) => tooltip(value)
  }
];
