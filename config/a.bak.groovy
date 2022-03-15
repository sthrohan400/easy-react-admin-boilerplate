{
    test: lessRegex,
    exclude: lessModuleRegex,
    use: getStyleLoaders({
            importLoaders: 1,// 值是1
            modules: true, // 增加这个可以通过模块方式来访问css
            sourceMap: isEnvProduction
            ? shouldUseSourceMap
            : isEnvDevelopment
        },
        "less-loader"
    ),
    sideEffects: true
}, 
// 这个测试删了也不影响
{
    test: lessModuleRegex,
    use: getStyleLoaders({
            importLoaders: 1,
            sourceMap: isEnvProduction && shouldUseSourceMap,
            modules: true,
            getLocalIdent: getCSSModuleLocalIdent
        },
        "less-loader"
    )
},