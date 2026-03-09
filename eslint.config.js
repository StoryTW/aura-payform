import storyConfig from '@storytw/eslint-config';

export default storyConfig({
  stylistic: [
    true,
    {
      rules: {
        '@stylistic/member-delimiter-style': 'warn',
        '@stylistic/multiline-ternary': ['warn', 'always'],
      },
    },
  ],
});
