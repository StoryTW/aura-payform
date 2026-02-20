import { createBrowserRouter } from 'react-router';

import { MainLayout } from '@/layout/MainLayout/MainLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    // path: 'invoice/:invoiceId/*',
    // Component: App,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <div>sda</div>,
      },
      // {
      //   path: ':method',
      //   lazy: () => import()
      // },
      // {
      //   path: 'status',
      //   lazy: () => import()
      // }
    ],
  },
]);
