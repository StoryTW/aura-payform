import { createBrowserRouter } from 'react-router';

import { RootLayout } from '@/layout/RootLayout/RootLayout';
import { SelectPaymentMethodPage } from '@/pages/SelectPaymentMethodPage/SelectPaymentMethodPage';

export const router = createBrowserRouter([
  {
    path: '/',
    // path: 'invoice/:invoiceId/*',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <SelectPaymentMethodPage />,
      },
      // {
      //   path: ':method',
      //   lazy: () => import()
      // },
      {
        path: 'status',
        lazy: () => import('@/pages/StatusPage/StatusPage'),
      },
    ],
  },
]);
