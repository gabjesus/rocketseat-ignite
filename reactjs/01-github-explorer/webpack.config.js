const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    entry: path.resolve(__dirname, 'src', 'index.tsx'), // path.resolve coloca o caminho correto independente de sistema operacional, aqui é referenciado o arquivo inicio da aplicação
    output: {
        path: path.resolve(__dirname, 'dist'), // caminho do arquivo de saída da aplicação
        filename: 'bundle.js' // Nome do arquivo de saída
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'] // Quais extensões serão interpretadas
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        hot: true
    },
    plugins: [
      isDevelopment && new ReactRefreshWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        })
    ].filter(Boolean), // Filtrando porque isDevelpoment quando for produção será false, e isto não é um plugin do webpack, resultando em erro.
    module: {
        rules: [
            {
                test: /\.(j|t)sx$/, // RegExp para verificar se o arquivo termina da forma correta, $ significa terminar, ponto por padrão é qualquer caractere, entao pra validar ponto mesmo seria \. (j|t) diz que pode ser um ou outro
                exclude: /node_modules/, // Desconsiderar tudo que estiver no node_modules
                use: {
                  loader: 'babel-loader',
                  options: {
                    plugins: [
                      isDevelopment && require.resolve('react-refresh/babel')
                    ].filter(Boolean)
                  }
                } // Integração entre babel e webpack
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
};