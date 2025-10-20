const schemaUtilsEntryPath = require.resolve("schema-utils");
const schemaUtils = require("schema-utils/dist/index.js");
const validateImpl = typeof schemaUtils === "function" ? schemaUtils : schemaUtils.validate;

if (typeof validateImpl !== "function") {
  throw new Error(
    "schema-utils compatibility shim could not locate a validate function."
  );
}

const compat = (...args) => validateImpl(...args);
compat.validate = compat;
compat.ValidationError = schemaUtils.ValidationError;

const schemaModule = require.cache[schemaUtilsEntryPath];

if (schemaModule) {
  schemaModule.exports = compat;
} else {
  require.cache[schemaUtilsEntryPath] = {
    id: schemaUtilsEntryPath,
    filename: schemaUtilsEntryPath,
    loaded: true,
    exports: compat,
    paths: module.paths,
  };
}

const babelLoaderPath = require.resolve("babel-loader");
const babelLoader = require(babelLoaderPath);

module.exports = babelLoader;
module.exports.default = babelLoader;
module.exports.custom = babelLoader.custom;