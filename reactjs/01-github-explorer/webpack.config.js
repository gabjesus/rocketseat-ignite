const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.jsx'), // path.resolve coloca o caminho correto independente de sistema operacional, aqui é referenciado o arquivo inicio da aplicação
    output: {
        path: path.resolve(__dirname, 'dist'), // caminho do arquivo de saída da aplicação
        filename: 'bundle.js' // Nome do arquivo de saída
    },
    resolve: {
        extensions: ['.js', '.jsx'] // Quais extensões serão interpretadas
    },
    module: {
        rules: [
            {
                test: /\.jsx$/, // RegExp para verificar se o arquivo termina da forma correta, $ significa terminar, ponto por padrão é qualquer caractere, entao pra validar ponto mesmo seria \.
                exclude: /node_modules/, // Desconsiderar tudo que estiver no node_modules
                use: 'babel-loader' // Integração entre babel e webpack
            }
        ]
    }
};