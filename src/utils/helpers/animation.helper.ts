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
};

export const animateHelper = (variant: IAnimateVariants) => animateObject[variant];
