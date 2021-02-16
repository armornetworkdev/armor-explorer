var express = require('express');
var router = express.Router();
const rpc = require('../RPC');
const { timeDifference } = require('../helpers');

/* GET home page. */
router.get('/', async function (req, res, next) {
    let status = {};
    try {
        status = await rpc('get_status');
        if (status && status.result && status.result.top_block_timestamp) {
            status.result.top_block_timestamp = status.result.top_block_timestamp.toString() + ' - ' + timeDifference(status.result.top_block_timestamp);
        }
        if (status && status.result && status.result.top_block_timestamp_median) {
            status.result.top_block_timestamp_median = status.result.top_block_timestamp_median.toString() + ' - ' + timeDifference(status.result.top_block_timestamp_median);
        }
    } catch (err) {
        console.log(err);
    }
    return res.render('index', {
        status
    });
});

module.exports = router;
