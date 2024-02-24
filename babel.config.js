module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['.'],
        alias: {
          '@assets': './src/assets',
          '@config': './src/config',
          '@module': './src/module',
          '@store': './src/store',
          '@navigation': './src/navigation',
        },
      },
    ],
  ],
};
