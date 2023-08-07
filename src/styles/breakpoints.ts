const breakpoints = {
  xsmall: 22.5, //360,
  small: 28.125, // 450,
  medium: 37.5, // 600,
  semiLarge: 48, // 768,
  large: 50, // 800,
  xlarge: 64, // 1024,
};

export const devices = {
  xsmall: `(min-width: ${breakpoints.xsmall}rem)`,
  small: `(min-width: ${breakpoints.small}rem)`,
  medium: `(min-width: ${breakpoints.medium}rem)`,
  semiLarge: `(min-width: ${breakpoints.semiLarge}rem)`,
  large: `(min-width: ${breakpoints.large}rem)`,
  xlarge: `(min-width: ${breakpoints.xlarge}rem)`,
};
