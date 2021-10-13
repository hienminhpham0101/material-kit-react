import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import { Icon } from '@iconify/react';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import infoFill from '@iconify/icons-eva/info-fill';

export const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'posts',
    path: '/dashboard/posts',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'about',
    path: '/dashboard/about',
    icon: getIcon(infoFill)
  }
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: getIcon(fileTextFill)
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: getIcon(lockFill)
  // },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon(personAddFill)
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon(alertTriangleFill)
  // }
];

export default sidebarConfig;
