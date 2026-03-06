import { createBrowserRouter } from 'react-router';

import { InvoiceDataLayout } from '@/layout/InvoiceDataLayout/InvoiceDataLayout';
import { PaymentLayout } from '@/layout/PaymentLayout/PaymentLayout';
import { StatusLayout } from '@/layout/StatusLayout/StatusLayout';
import { SelectPaymentMethodPage } from '@/pages/SelectPaymentMethodPage/SelectPaymentMethodPage';

import { RouteErrorBoundary } from './RouteErrorBoundary/RouteErrorBoundary';

export const router = createBrowserRouter([
  {
    path: ':invoiceId',
    element: <InvoiceDataLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        element: <PaymentLayout />,
        children: [
          { index: true, element: <SelectPaymentMethodPage /> },
          {
            path: ':method',
            lazy: () => import('@/pages/MethodPage/MethodPage'),
          },
        ],
      },
      {
        path: 'status',
        element: <StatusLayout />,
        children: [
          {
            index: true,
            lazy: () => import('@/pages/StatusPage/StatusPage'),
          },
        ],
      },
    ],
  },
]);
