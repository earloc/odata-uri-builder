module.exports = function (config) {
    config.set({
        frameworks: ["jasmine", "karma-typescript"],
        files: [
            { pattern: "./lib/**/*.ts" },
            { pattern: "./tests/**/*.ts" },
        ],
        preprocessors: {
            "./lib/**/*.ts": ["karma-typescript"],
            "./tests/**/*.ts": ["karma-typescript"]
        },
        karmaTypescriptConfig: {
            tsconfig: "./tsconfig.tests.json"
        },
        reporters: ["progress", "kjhtml"],
        browsers: ["Chrome"],
        autoWatch: true,
        client:{
            clearContext: false // leave Jasmine Spec Runner output visible in browser
          },
    });
};