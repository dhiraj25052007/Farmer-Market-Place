const router = require('express').Router();

router.get('/:farmerId', (req, res) => { 
    res.json(
        { 
            productsListed: 12,
            totalRevenue: 1024,
            totalOrders: 48, expiringSoon: 3 
        }
    ); 
}
);
module.exports = router;
