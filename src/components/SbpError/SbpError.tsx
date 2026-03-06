import { Alert } from '@/base-ui/Alert/Alert';
import { ButtonBack } from '@/components/ButtonBack/ButtonBack';

import styles from './SbpError.module.scss';

interface ISbpError {
  message: string;
}

export const SbpError = ({ message }: ISbpError) => {
  return (
    <div>
      <ButtonBack />

      <div className={styles.title}>Ошибка</div>

      <Alert variant='error' text={message} />
    </div>
  );
};
