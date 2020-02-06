
module.exports = {
    parallel: true,
    chainWebpack: (config) => {
        config.module.rule('worker')
        .test(/\.Worker\.js$/i)
        .use('worker-loader')
        .loader('worker-loader');
    },
    publicPath: process.env.NODE_ENV === 'production'
    ? '/image-filters/'
    : '/',
};
