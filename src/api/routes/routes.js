"use strict"

const express = require('express');
const router = express.Router();

const contoller = require('../controllers/controllers')

/***********************************************************************ADMIN STARTS****************************************************************************************/


//Login 
router.route("/admin/login").post(contoller.admin_login);

//Add new admin 
router.route("/admin/add_admin").post(contoller.add_admin);

//get theatre seats details
router.route("/admin/get_availability/:t_ID/:m_ID").get(contoller.get_seats);

/***********************************************************************ADMIN ENDS****************************************************************************************/

/***********************************************************************CLIENT STARTS****************************************************************************************/

//signup
router.route("/signup").post(contoller.add_user);

//Login
router.route("/login").post(contoller.user_login);

//movie search
router.route("/movie_search/:m_ID").get(contoller.movie_search);

//theatre search
router.route("/theatre_search/:t_ID").get(contoller.theatre_search);


//booking
router.route("/booking").post(contoller.booking);


/***********************************************************************CLIENT ENDS****************************************************************************************/

/***********************************************************************MOVIE STARTS****************************************************************************************/

//Add Movie
router.route("/admin/add_movie").post(contoller.add_movie);

/***********************************************************************MOVIE ENDS****************************************************************************************/


/***********************************************************************Theatre STARTS****************************************************************************************/

//Add Movie
router.route("/admin/add_theatre").post(contoller.add_theatre);

//Add Movie playtime
router.route("/admin/add_playtime").post(contoller.add_playtime);

/***********************************************************************Theatre ENDS****************************************************************************************/

module.exports = router;