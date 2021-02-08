var express = require('express');
var router = express.Router();
const rpc = require('../RPC');

/* GET home page. */
router.get('/', async function (req, res, next) {
    let status = {};
    try {
        status = await rpc('get_status');
    } catch (err) {
        console.log(err);
    }
    return res.render('index', {
        status
    });
});

module.exports = router;
