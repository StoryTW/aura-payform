import { Outlet } from 'react-router';

import { ViewWrapper } from '@/components/ViewWrapper/ViewWrapper';
import { Footer } from '@/layout/Footer/Footer';
import { Header } from '@/layout/Header/Header';

import styles from './StatusLayout.module.scss';

export const StatusLayout = () => {
  return (
    <>
      <Header />

      <main className={styles.main}>
        <ViewWrapper>
          <Outlet />
        </ViewWrapper>
      </main>

      <Footer />
    </>
  );
};
