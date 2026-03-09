import storyConfig from '@storytw/eslint-config';

export default storyConfig({
  stylistic: [
    true,
    {
      rules: {
        '@stylistic/max-len': ['warn', {
          code: 200,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
        ],
        'max-len': 0,
        '@stylistic/member-delimiter-style': 'warn',
        '@stylistic/multiline-ternary': ['warn', 'always'],
      },
    },
  ],
});
