const breakpoints = {
  xsmall: 360,
  small: 450,
  medium: 600,
  semiLarge: 768,
  large: 800,
  xlarge: 1024,
};

export const devices = {
  xsmall: `(min-width: ${breakpoints.xsmall}px)`,
  small: `(min-width: ${breakpoints.small}px)`,
  medium: `(min-width: ${breakpoints.medium}px)`,
  semiLarge: `(min-width: ${breakpoints.semiLarge}px)`,
  large: `(min-width: ${breakpoints.large}px)`,
  xlarge: `(min-width: ${breakpoints.xlarge}px)`,
};
