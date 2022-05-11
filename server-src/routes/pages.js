const router = require("express").Router();

const {
    addPage,
    UpdatePage,
    singlePage,
    allPages,
    deletePage
} = require('../controllers/baseOperations/Pages');

// roles
router.route('/create-page').post( addPage);
router.route('/show-pages').get( allPages);
router.route('/single-page/:id').get( singlePage);
router.route('/update-page/:id').post( UpdatePage);
router.route('/delete-page/:id').get( deletePage);

module.exports = router;