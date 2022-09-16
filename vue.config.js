/**
 * Based on @vue/cli-service": "^4.5.13",
 *  Which webpack version is "webpack": "^4.0.0"
 *
 *  根据package.json中的 dependencies 依赖自动生成CDN导入HTML模板
 *  为Vue做的多页面配置，pages结构需为: Test目录下 => Test.html, Test.js, Test.vue;
 *
 *  Designed && written by YOUJUN
 *  Contact me => QQ: 824000803  :)
 */

// const fsPromises = require("fs").promises;
const fs = require("fs");
const path = require("path");

const webpack = require("webpack");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const productionGzipExtensions = ["js", "css"];
const buildPageSync = () => {
    let pages = {};
    let pagesPath = path.join(__dirname, "/src/pages");

    let files = fs.readdirSync(pagesPath);

    for (let file of files) {
        let filePath = path.join(pagesPath, file);
        let page = {};
        let stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            let entry = path.posix.join("src/pages", file, file.concat(".js"));
            page.entry = entry;
            page.template = path.posix.join(
                "src/pages",
                file,
                file.concat(".html")
            );
            if (process.env.NODE_ENV === "development") {
                page.filename = file.concat(".html");
            } else {
                page.filename = "../vue-pages/".concat(file, ".html");
            }
            // page.filename = file.concat('.html');
            pages[file] = page;
        }
    }

    return pages;
};

const cdnBaseHttp = "https://cdn.jsdelivr.net/npm";

let externalConfig = [
    { name: "vue", scope: "Vue", js: "vue.min.js" },
    // { name: "vue-router", scope: "VueRouter", js: "vue-router.min.js" },
    // { name: "vuex", scope: "Vuex", js: "vuex.min.js" },
    { name: "axios", scope: "axios", js: "axios.min.js" },
    // {name : 'axios', scope: 'axios', js: 'axios.min.js', includes:['test']}
];

//不支持高版本node
let getModulesVersion = () => {
    let mvs = {};
    let regexp = /^npm_package_.{0,3}dependencies_/gi;
    for (let m in process.env) {
        if (regexp.test(m)) {
            mvs[m.replace(regexp, "").replace(/_/g, "-")] = process.env[
                m
            ].replace(/(~|\^)/g, "");
        }
    }

    return mvs;
};

//兼容高版本node
let getDependenciesVersion = () => {
    let mvs = {};

    let json = JSON.parse(fs.readFileSync("./package.json", "utf8"));
    let dependencies = json.dependencies;
    for (let key in dependencies) {
        mvs[key] = dependencies[key].replace(/(~|\^)/g, "");
    }

    return mvs;
};

let getExternalModules = (config) => {
    let externals = {};
    let dependencieModules = getDependenciesVersion();
    config.forEach((item) => {
        if (item.name in dependencieModules) {
            let version = dependencieModules[item.name];

            item.css =
                item.css &&
                `${cdnBaseHttp}/${item.name}@${version}/${item.css}`;
            item.js = item.js && `${cdnBaseHttp}/${item.name}@${version}`;

            externals[item.name] = item.scope;
        } else {
            throw new Error("相关依赖未安装，请先执行npm install " + item.name);
        }
    });

    return externals;
};

let externalModules = getExternalModules(externalConfig);

console.log("externalConfig ===>", externalConfig);

console.log("externalModules ====>", externalModules);

let pageConstruction = buildPageSync();

delete require.cache[module.id];

let publicPath = process.env.NODE_ENV === 'development' ? '/' : "/fm_monitor/static/src/";

module.exports = function() {
    return {
        publicPath,
        outputDir: "./../vue-public",
        assetsDir: "static",
        filenameHashing: true,
        pages: pageConstruction,
        devServer: {
            port: 8080,
            hotOnly: true,
            open: false, //是否自动打开浏览器
            proxy: {
                "/datav": {
                    target: process.env.VUE_APP_PROXY_BASE_URL,
                    // pathRewrite: {
                    //     ["^" + "/datav"]: "",
                    // },
                    ws: true,
                    secure: false,
                    changOrigin: true, //是否开启代理
                    pathRewrite: {
                        //  /api开头的请求会去到target下请求
                        "^/datav": "", //   替换/api 为空字符
                    },
                },
            },
        },
        productionSourceMap: true, //开启后出错的时候，除错工具将直接显示原始代码，而不是转换后的代码。关闭可以减少打包体积
        configureWebpack: {
            plugins: [
                // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
                // 配置compression-webpack-plugin压缩
                // new CompressionWebpackPlugin({
                //     algorithm: 'gzip',
                //     test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                //     threshold: 10240,
                //     minRatio: 0.8
                // })
            ],

            externals: externalModules,

            resolve: {
                alias: {
                    "@": path.resolve(__dirname, "src"),
                    "@assets": path.resolve(__dirname, "src/assets"),
                    "@components": path.resolve(__dirname, "src/components"),
                    "@views": path.resolve(__dirname, "src/views"),
                    "@store": path.resolve(__dirname, "src/store"),
                },
            },
        },

        chainWebpack: (config) => {
            const entry = Object.keys(pageConstruction);
            console.log("entry===>", entry);
            for (const iterator of entry) {
                let cdnConfig = externalConfig.reduce(
                    (total, currentValue, index, arr) => {
                        console.log("total", total);
                        if (
                            !currentValue.includes ||
                            currentValue.length === 0 ||
                            currentValue.includes.includes(iterator)
                        ) {
                            total.push(currentValue);
                        }
                        return total;
                    },
                    []
                );

                config
                    .plugin(`html-${iterator}`) //自定义插件名称用于移除
                    .tap((args) => {
                        //动态修改plugin传参
                        console.log("args", args);
                        args[0].cdnConfig = cdnConfig;
                        return args;
                    });
            }

            config.when(process.env.NODE_ENV === "development", (config) =>
                config.plugin("webpack-bundle-analyzer").use(
                    new BundleAnalyzerPlugin({
                        analyzerPort: "auto",
                    })
                )
            );

            //优化moment 去掉国际化内容；
            //我都不知道哪来的moment
            config.plugin("ignore").use(
                new webpack.IgnorePlugin({
                    resourceRegExp: /^\.\/locale$/,
                    contextRegExp: /moment$/,
                })
            );

            config //打包时生成.gz文件
                .plugin("compression-webpack-plugin")
                .use(require("compression-webpack-plugin"), [
                    {
                        algorithm: "gzip",
                        test: new RegExp(
                            "\\.(" + productionGzipExtensions.join("|") + ")$"
                        ),
                        threshold: 10240,
                        minRatio: 0.8,
                    },
                ])
                .tap((options) => {
                    console.log("options===>", options);
                    return options;
                });

            config.optimization //去除生产环境console;
                .minimize(true)
                .minimizer("terser")
                .tap((args) => {
                    let { terserOptions } = args[0];
                    console.log("terserOptions", terserOptions);
                    terserOptions.compress.drop_console = true;
                    terserOptions.compress.drop_debugger = true;
                    return args;
                });

            // config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log'];
        },

        css: {
            loaderOptions: {
                // 给 less-loader 传递 Less.js 相关选项
                less: {
                    // `globalVars` 定义全局对象，可加入全局变量
                    globalVars: {
                        // primary: '#333'
                    },
                },
            },
        },
    };
};
