import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';

import { animateHelper } from '@/utils/helpers/animation.helper';

import styles from './LanguageSelect.module.scss';

import srcIconChevron from '/img/icon-arrow-down.svg';

type Language = {
  code: string;
  label: string;
  flag: string;
};

const languages: Language[] = [
  {
    code: 'ru',
    label: 'RU',
    flag: '/img/flags/ru.svg',
  },
  {
    code: 'en',
    label: 'EN',
    flag: '/img/flags/en.svg',
  },
];

export const LanguageSelect = () => {
  const { i18n } = useTranslation();

  const [open, setOpen] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  const current = languages.find((l) => l.code === i18n.language) || languages[0];

  const handleOpen = () => {
    setOpen((state) => !state);
  };

  const handleChangeLanguage = (code: string) => {
    i18n.changeLanguage(code);

    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={styles.root}>
      <button onClick={handleOpen} className={styles.trigger}>
        <img
          src={current.flag}
          alt={current.code}
          width={28}
          height={17}
          className={styles.flagIcon}
        />

        {current.label}

        <img
          src={srcIconChevron}
          width={24}
          height={24}
          alt='chevron'
          className={clsx(styles.chevron, {
            [styles.open]: open,
          })}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={animateHelper('select')}
            initial='close'
            animate='open'
            exit='close'
            transition={{ duration: 0.15 }}
            className={styles.dropdown}
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleChangeLanguage(lang.code)}
                className={clsx(styles.optionItem, {
                  [styles.selected]: lang.code === i18n.language,
                })}
              >
                <img
                  src={lang.flag}
                  alt={lang.code}
                  width={28}
                  height={17}
                  className={styles.flagIcon}
                />

                {lang.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
