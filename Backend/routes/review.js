const router = require('express').Router();
const reviews = { 'product1': [ 
    { user: 'Alice', rating: 4, comment: 'Great apples!' },
     { user: 'Bob', rating: 5, comment: 'Very fresh.' }
     ], 
     'product2': [
         { user: 'Tom', rating: 3, comment: 'Decent but not perfect.' }
         ] 
        };
router.get('/:productId', (req, res) => { res.json(reviews[req.params.productId] || []); });
module.exports = router;
