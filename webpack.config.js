var webpack = require('webpack');
module.exports = {
    module: {
        loaders: [
            { 
                test: /\.vue$/, 
                loader: 'vue'
            },
            { 
                test: /\.js$/, 
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            { 
                test: /\.scss$/, 
                loaders: ["style", "css", "sass"] 
            }
        ]
    },
    // vue-loader 配置
    vue:{ 
        loaders: "vue-loader",  //加载css配置模块
        // Autoprefixer是一个基于PostCSS的智能添加CSS前缀的插件
        postcss: [
            require('autoprefixer')({ 
                browsers: ['last 5 versions']
            })
        ]
    },
    babel: {
        "presets": ['es2015',"stage-0"],
        "plugins": ["transform-runtime"]
    },
    plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: '"production"'
          }
        }),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        })
    ]
}