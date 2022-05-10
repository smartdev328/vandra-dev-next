const path = require('path');

module.exports = {
  loader: 'custom',
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  future: {
    webpack5: true,
  },
};
