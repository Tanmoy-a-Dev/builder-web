const router = require("express").Router();


// ** */ importing required controllers **
// users
const { addUser, updateUser, singleUser, allUsers, deleteUser, updatePassword, updateProfile } = require('../controllers/baseOperations/User');
// roles
const { addRole, UpdateRole, deleteRole, allRoles, singleRole } = require('../controllers/baseOperations/Roles');
// userInfo
const { getUser } = require("../controllers/private") 
// dashboard
const { getDashboard } = require('../controllers/baseOperations/Dashboard');
// tables
const { createTable, getTables, dropTable } = require('../controllers/baseOperations/Tables');

// middlewares
const { protect } = require("../middlewares/auth");
const upload = require('../config/profileImgUploader');

// dashboard
router.route('/get-dashboard-data').get(protect, getDashboard);

// tables
router.route('/create-table').post(protect, createTable);
router.route('/get-tables').get(protect, getTables);
router.route('/drop-table/:id').delete(dropTable);

// users
router.route("/").get(protect, getUser);
router.route("/create-user").post(protect, upload.single("profileImage"), addUser);
router.route("/update-user/:id").put(protect, upload.single("profileImage"), updateUser);
router.route("/update-profile/:id").put(protect, upload.single("profileImage"), updateProfile);
router.route('/get-user/:id').get(protect, singleUser);
router.route('/show-users').get(protect, allUsers);
router.route('/delete-user/:id').delete(protect, deleteUser);
router.route('/update-password/:id').put(protect, updatePassword);


// roles
router.route('/create-role').post(protect, addRole);
router.route('/show-roles').get(protect, allRoles);
router.route('/get-role/:id').get(protect, singleRole);
router.route('/update-role/:id').put(protect, UpdateRole);
router.route('/delete-role/:id').delete(protect, deleteRole);

module.exports = router;