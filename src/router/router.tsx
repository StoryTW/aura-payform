import { createBrowserRouter, Outlet } from 'react-router';

import { RootLayout } from '@/layout/RootLayout/RootLayout';
import { NotFoundPage } from '@/pages/NotFoundPage/NotFoundPage';
import { SelectPaymentMethodPage } from '@/pages/SelectPaymentMethodPage/SelectPaymentMethodPage';

export const router = createBrowserRouter([
  {
    path: ':invoiceId',
    children: [
      {
        index: true,
        element: (
          <RootLayout variant='invoice'>
            <SelectPaymentMethodPage />
          </RootLayout>
        ),
      },

      {
        path: 'status',
        element: (
          <RootLayout variant='status'>
            <Outlet />
          </RootLayout>
        ),
        children: [
          {
            index: true,
            lazy: () => import('@/pages/StatusPage/StatusPage'),
          },
        ],
      },

      {
        path: '*',
        element: (
          <RootLayout variant='error'>
            <NotFoundPage />
          </RootLayout>
        ),
      },
    ],
  },

  {
    path: '*',
    element: (
      <RootLayout variant='error'>
        <NotFoundPage />
      </RootLayout>
    ),
  },
]);
