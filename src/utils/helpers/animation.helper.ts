type IAnimateVariants = keyof typeof animateObject;

const animateObject = {
  select: {
    close: {
      height: 0,
    },
    open: {
      height: 'auto',
    },
  },
  validationHint: {
    hide: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
  },
  dropdown: {
    hide: {
      height: 0,
      overflow: 'hidden',
    },
    show: {
      height: 'auto',
    },
  },
};

export const animateHelper = (variant: IAnimateVariants) => animateObject[variant];
