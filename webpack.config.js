// server 코드와 연관시키지 않고, 100% client code!
// Client code, such as html,css,img,js etc, is what users download when they go to our page.
// 즉 babel-node를 사용할 수 없으므로, 구버전의 자바스크립트 사용이 요구됨

const path = require("path"); //path는 Node.js에 기본적으로 설치된 패키지
const autoprefixer = require("autoprefixer");
const ExtractCSS = require("extract-text-webpack-plugin");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js"); //__dirname: 현재 프로젝트 디렉토리 이름, 어디에서든 접근가능한 Node.js 전역변수
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
  entry: ["@babel/polyfill", ENTRY_FILE],
  mode: MODE,
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.(scss)$/,
        use: ExtractCSS.extract([
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              plugins() {
                return [autoprefixer({ browsers: "cover 99.5%" })];
              },
            },
          },
          {
            loader: "sass-loader",
          },
        ]),
      },
    ],
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js",
  },
  plugins: [new ExtractCSS("styles.css")],
};

module.exports = config;
