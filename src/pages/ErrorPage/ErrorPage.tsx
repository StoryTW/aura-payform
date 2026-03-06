import { useTranslation } from 'react-i18next';

import { ViewWrapper } from '@/components/ViewWrapper/ViewWrapper';
import { Footer } from '@/layout/Footer/Footer';
import { Header } from '@/layout/Header/Header';

import styles from './ErrorPage.module.scss';

import srcIconEror from '/img/icon-global-error.svg';

interface IErrorPage {
  status: number;
  message?: string;
}

export const ErrorPage = ({ status, message }: IErrorPage) => {
  const { t } = useTranslation();

  const description = message ?? t('errorPage.pageNotFound');

  return (
    <>
      <Header />

      <main className={styles.main}>
        <ViewWrapper>
          <div className={styles.errorPage}>
            <img
              src={srcIconEror}
              alt='icon-404'
              width={120}
              height={120}
              className={styles.errorImg}
            />
            <h1 className={styles.title}>{t('errorPage.error')}</h1>
            <div className={styles.status}>{`${t('errorPage.status')} ${status}`}</div>
            <div className={styles.description}>{description}</div>
          </div>
        </ViewWrapper>
      </main>

      <Footer />
    </>
  );
};
