import { createBrowserRouter } from 'react-router';

import { ErrorLayout } from '@/layout/ErrorLayout/ErrorLayout';
import { InvoiceDataLayout } from '@/layout/InvoiceDataLayout/InvoiceDataLayout';
import { PaymentLayout } from '@/layout/PaymentLayout/PaymentLayout';
import { StatusLayout } from '@/layout/StatusLayout/StatusLayout';
import { NotFoundPage } from '@/pages/NotFoundPage/NotFoundPage';
import { SelectPaymentMethodPage } from '@/pages/SelectPaymentMethodPage/SelectPaymentMethodPage';

import { invoiceLoader } from './invoice.loader';

export const router = createBrowserRouter([
  {
    path: ':invoiceId',
    loader: invoiceLoader,
    element: <InvoiceDataLayout />,
    children: [
      {
        element: <PaymentLayout />,
        children: [
          { index: true, element: <SelectPaymentMethodPage /> },
          { path: ':method', lazy: () => import('@/pages/MethodPage/MethodPage') },
        ],
      },
      {
        path: 'status',
        element: <StatusLayout />,
        children: [{ index: true, lazy: () => import('@/pages/StatusPage/StatusPage') }],
      },
      {
        path: '*',
        // element: <ErrorLayout />,
        element: (
          <ErrorLayout>
            <NotFoundPage />
          </ErrorLayout>
        ),
        // children: [{ index: true, element: <NotFoundPage /> }],
      },
    ],
  },

  {
    path: '*',
    // element: <ErrorLayout />,
    element: (
      <ErrorLayout>
        <NotFoundPage />
      </ErrorLayout>
    ),
    // children: [{ index: true, element: <NotFoundPage /> }],
  },
]);
