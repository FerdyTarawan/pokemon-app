import { Theme } from 'styled-system';

const breakpoints = ['480px', '960px', '1366px', '1920px'];
const colors = {
  black: '#000000',
  blue: '#007bc1',
  concrete: '#f2f2f2',
  grey: '#e5e5e5',
  red: '#c30822',
  white: '#FFFFFF',
};
const fontSizes = [12, 14, 16, 20, 24, 32];
const fontWeights = {
  bold: 700,
  medium: 500,
  regular: 400,
};
const radii = { ...[0, 4, 8, 16, 32, 36], round: 1024 };
const space = [0, 4, 8, 16, 32, 64];

const theme: Theme = {
  breakpoints,
  colors,
  fontSizes,
  fontWeights,
  radii,
  space,
};

export default theme;
