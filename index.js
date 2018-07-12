const { send } = require("micro");
const get = require("micro-get");
const cors = require("micro-cors")();
const { parse } = require("url");

const en = require("./dataset/en.json");

function log(req) {
  console.log(
    `${req.method} ${req.url} from ${req.headers["x-forwareded-from"]}`
  );
}

async function main(req, res) {
  log(req);

  const { pathname } = parse(req.url);

  switch (pathname) {
    case "/en": {
      res.setHeader(
        "Cache-Control",
        "public, immutable, s-maxage=31536000, max-age=0"
      );
      return send(res, 200, { data: { languages: en } });
    }
    case "/": {
      res.setHeader("Cache-Control", "public, s-maxage=31536000, max-age=0");
      return send(res, 200, { data: { languages: en } });
    }
    default: {
      res.setHeader("Cache-Control", "private, max-age=0");
      return send(res, 404, {
        error: {
          code: "not_found",
          message: `The URL ${pathname} could not be found.`,
          pathname
        }
      });
    }
  }
}

module.exports = cors(get(main));
