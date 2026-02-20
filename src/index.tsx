import '@/i18n/i18n';

import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

import { Providers } from '@/providers/Providers';
import { router } from '@/router/router';

import 'modern-normalize/modern-normalize.css';
import '@/assets/styles/index.scss';

createRoot(document.getElementById('root')!).render(
  <Providers>
    <RouterProvider router={router} />
  </Providers>,
);
