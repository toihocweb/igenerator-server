const express = require("express");
const request = require("request-promise");
const fs = require("fs");
const cheerio = require("cheerio");
const router = express.Router();

router.post("/", (req, res, next) => {
  const { link } = req.body;

  const valid = /https:\/\/medium\.com\/.+/.test(link);

  if (!valid) {
    return res.status(400).json({
      success: false,
      message: "invalid link",
    });
  }

  const fileName = link.split("/").slice(-1)[0];

  fs.access(`public/${fileName}.html`, fs.F_OK, (err) => {
    if (!err) {
      return res.json({
        success: true,
        link: `http://45.76.178.238:5000/public/${fileName}.html`,
      });
    }
    request(link)
      .then((data) => {
        const $ = cheerio.load(data);
        $(".fq.as.ip.iq.ir.is").prepend(
          `<link rel="stylesheet" href="css/style.css" />`
        );
        fs.writeFile(
          `public/${fileName}.html`,
          $("section").eq(0).html(),
          () => {
            return res.json({
              success: true,
              link: `http://45.76.178.238:5000/public/${fileName}.html`,
            });
          }
        );
      })
      .catch((err) => {
        return res.json({
          success: false,
        });
      });
  });
});

module.exports = router;
