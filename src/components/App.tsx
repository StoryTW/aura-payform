import clsx from 'clsx';

import reactLogo from '@/assets/images/react.svg';

import styles from './App.module.scss';

import viteLogo from '/vite.svg';

function App() {
  return (
    <div className={styles.root}>
      <div className={styles.imgContainer}>
        <a href='https://vite.dev' target='_blank'>
          <img src={viteLogo} className={styles.logo} alt='Vite logo' />
        </a>

        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className={clsx(styles.logo, styles.react)} alt='React logo' />
        </a>
      </div>

      <div className={styles.badgeWrapper}>
        <a href='https://github.com/StoryTW/vite-template-by-story' target='_blank'>
          <img
            src='https://img.shields.io/badge/github-repo-blue?logo=github&labelColor=white&color=blue&logoColor=000000'
            alt='github-badge'
          />
        </a>

        <img
          src='https://img.shields.io/badge/version-1.0.0-white?labelColor=FFFFFF&color=green&style=flat'
          alt='version-badge'
        />
      </div>

      <h1 className={styles.title}>Vite Template by Story</h1>

      <div className={styles.stack}>
        <a href='https://reactjs.org/'>
          <img src='https://img.shields.io/static/v1?label=React&message=19.2.1&style=for-the-badge&labelColor=FFFFFF&logo=react&color=61DAFB' />
        </a>
        <a href='https://www.typescriptlang.org/'>
          <img src='https://img.shields.io/static/v1?label=TypeScript&message=5.9.3&style=for-the-badge&labelColor=FFFFFF&logo=typescript&color=3178C6' />
        </a>
        <a href='https://vite.dev/'>
          <img src='https://img.shields.io/static/v1?label=Vite&message=7.1.4&style=for-the-badge&labelColor=FFFFFF&logo=vite&color=646CFF' />
        </a>
        <a href='https://sass-lang.com/'>
          <img src='https://img.shields.io/static/v1?label=SASS&message=1.97.3&style=for-the-badge&labelColor=FFFFFF&logo=sass&color=BF3F7F' />
        </a>
      </div>
    </div>
  );
}

export default App;
