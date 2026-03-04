import { Outlet } from 'react-router';

import { ViewWrapper } from '@/components/ViewWrapper/ViewWrapper';
import { Footer } from '@/layout/Footer/Footer';
import { Header } from '@/layout/Header/Header';

import styles from './ErrorLayout.module.scss';

export const ErrorLayout = ({ children }: any) => {
  return (
    <>
      <Header />

      <main className={styles.main}>
        <ViewWrapper>{children ?? <Outlet />}</ViewWrapper>
      </main>

      <Footer />
    </>
  );
};
