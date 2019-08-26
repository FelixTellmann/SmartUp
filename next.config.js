const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');

module.exports = withSass(withCSS({
  webpack(config, { defaultLoaders }) {
    config.module.rules.push({
      test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
      },
    });
    
   /* config.module.rules.push({
      test: /\.css$/,
      use: [
        defaultLoaders.babel,
        {
          loader: require('styled-jsx/webpack').loader,
          options: {
            type: 'scoped',
          },
        },
      ],
    });*/
    
    return config;
  },
}));
