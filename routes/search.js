var express = require('express');
var router = express.Router();
const rpc = require('../RPC');

/* GET search page. */
router.get('/:hash', async function (req, res, next) {
    let item;
    const {hash} = req.params;
    try {
        item = await rpc('get_raw_block', {hash});
        if (item && item.result) {
            return res.render('search_block', {
                hash,
                result: item.result,
            });
        }
        item = await rpc('get_raw_transaction', {hash});
        if (item && item.result) {
            return res.render('search_transaction', {
                hash,
                result: item.result,
            });
        }
    } catch (err) {
        console.log(err);
    }

    // Nothing found
    return res.render('index', {not_found: true});
});

module.exports = router;
