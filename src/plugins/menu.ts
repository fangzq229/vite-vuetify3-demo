export const menuConf = [
  {
    label: 'Home',
    path: '/',
    icon: 'home',
    children: [],
  },
  {
    label: 'Table',
    path: '/table',
    icon: 'apartment',
    value: 'table',
    children: [
      {
        label: 'Table List',
        path: '/table/list',
        icon: 'apartment',
        value: 'merchant',
      },
    ],
  },
  {
    label: 'Canvas',
    path: '/canvas',
    icon: 'apartment',
    value: 'canvas',
    children: [
      {
        label: 'canvas',
        path: '/canvas/index',
        icon: 'apartment',
        value: 'canvas',
      },
    ],
  },
];
