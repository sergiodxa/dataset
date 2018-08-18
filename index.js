const { send } = require("micro");
const cors = require("micro-cors")({ onlyAllow: ["GET"] });
const { parse } = require("url");
const { resolve } = require("path");

function setCache(res, { cached }) {
  if (cached) {
    res.setHeader(
      "Cache-Control",
      "public, immutable, s-maxage=31536000, max-age=0"
    );
  } else {
    res.setHeader("Cache-Control", "private, max-age=0");
  }
}

function getDataset(req) {
  const { pathname } = parse(req.url);

  try {
    const dataset = require(resolve("./dataset", `.${pathname}.json`));
    return { dataset, pathname };
  } catch (error) {
    if (
      error.code === "MODULE_NOT_FOUND" ||
      error.code === "ERR_MISSING_MODULE"
    ) {
      return { dataset: false, pathname };
    } else {
      throw error;
    }
  }
}

function main(req, res) {
  const { dataset, pathname } = getDataset(req, res);

  if (!dataset) {
    setCache(res, { cached: false });
    return send(res, 404, {
      contribute: "https://github.com/sergiodxa/dataset",
      error: {
        code: "not_found",
        message: `The URL ${pathname} could not be found.`,
        url: pathname
      }
    });
  }

  setCache(res, { cached: true });
  return send(res, 200, {
    [pathname.slice(1)]: dataset,
    contribute: "https://github.com/sergiodxa/dataset"
  });
}

function onlyGet(next) {
  return (req, res) => {
    if (req.method.toUpperCase() === "GET") return next(req, res);
    return send(res, 405, {
      error: {
        code: "invalid_method",
        message: `The method ${req.method} is not supported.`,
        method: req.method
      }
    });
  };
}

module.exports = cors(onlyGet(main));
