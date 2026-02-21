type IAnimateVariants = keyof typeof animateObject;

const animateObject = {
  select: {
    close: {
      opacity: 0,
      height: 0,
    },
    open: {
      opacity: 1,
      height: 'auto',
    },
  },
};

export const animateHelper = (variant: IAnimateVariants) => animateObject[variant];
