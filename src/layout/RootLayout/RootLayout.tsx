import type { ReactNode } from 'react';
import { Outlet } from 'react-router';
import clsx from 'clsx';

import { CardForm } from '@/components/CardForm/CardForm';
import { InvoiceInfoView } from '@/components/InvoiceInfoView/InvoiceInfoView';
import { ViewWrapper } from '@/components/ViewWrapper/ViewWrapper';
import { Footer } from '@/layout/Footer/Footer';
import { Header } from '@/layout/Header/Header';

import styles from './RootLayout.module.scss';

type LayoutVariantType = 'invoice' | 'status' | 'error';

interface IRootLayout {
  variant?: LayoutVariantType;
  children?: ReactNode;
}

export const RootLayout = ({ variant = 'invoice', children }: IRootLayout) => {
  return (
    <>
      <Header />

      <main className={clsx(styles.main, styles[variant])}>
        <ViewWrapper>
          {children ?? <Outlet />}
          <CardForm />
        </ViewWrapper>

        {variant === 'invoice' && <InvoiceInfoView />}
      </main>

      <Footer />
    </>
  );
};
