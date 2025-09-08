import { createTheme } from '@mantine/core';

export const theme = createTheme({
  colors: {
    aqua: [
      '#fff',
      '#daf5f7',
      '#c5eef2',
      '#aee6ec',
      '#97dee7', // base color
      '#80d6e2',
      '#69cddc',
      '#52c5d7',
      '#3bbdd1',
      '#24b5cc',
    ],
    beige: [
      '#fefaf5',
      '#fdf2e6',
      '#fcead7',
      '#fbe2c8',
      '#f9d9b8',
      '#ebcbae', // base color
      '#e0b296',
      '#d5a77e',
      '#c99966',
      '#bf8c4e',
    ],
    brown: [
      '#f5f4f4',
      '#e8e5e5',
      '#dbd7d7',
      '#cdc9c9',
      '#c0bcbb',
      '#b3afae',
      '#a69997',
      '#998784',
      '#8f8787',
      '#827474', // base color
    ],
  },

  primaryColor: 'brown',
  fontFamily: 'Inter, sans-serif',
  headings: { fontFamily: 'Playfair Display, serif' },
});
