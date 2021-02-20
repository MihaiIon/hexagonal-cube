module.exports = {
  presets: [['@babel/env']],
  plugins: [
    ['@babel/plugin-proposal-class-properties'],
    [
      'babel-plugin-module-resolver',
      {
        root: ['./src'],
        alias: {
          '@constants': './src/constants',
          '@errors': './errors.js',
          '@methods': './src/methods',
        },
      },
    ],
  ],
};
