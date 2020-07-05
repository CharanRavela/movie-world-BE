'use strict'

var mongoose = require('mongoose');

const {

    admin_login,
    admin_details,
    user_login,
    user_signup,
    movie_details,
    theatre_details,
    theatre_movies_details,
    get_availability,
    user_movie_search,
    user_theatre_search,
    booking_check

} = require('../middlewares/middlewares');

const {

    encrypt,
    sendInvoice

} = require('../helpers/helpers');


/***********************************************************************ADMIN STARTS****************************************************************************************/

const adminDetails = mongoose.model('admin_details');
const adminLogin = mongoose.model('admin_login');

module.exports.add_admin = async( req, res) => {
    try{
        const validate = admin_details(req.body);
        validate.then( async (done) => {
            
            var document = new adminDetails({
                name: encrypt(done.name),
                email: encrypt(done.email),
                password: encrypt(done.password)
            });
            document.save( async (err, documment) => {
                if(err){
                    console.log(err);
                    return res.status(400).send({ success: false, message:"Admin not added.", error:"DB save error"});
                }
                else{
                    return res.status(200).send({ success: true, message: "Admin Added."});
                }
            });
        }).catch( async err => {
            console.log(err);
            return res.status(400).send({ success: false, message:"Bad Request", error:"Joi validation failed"});
        })
        
    }
    catch(error){

        console.log(error);
        return res.status(500).send({ success: false, message:"Server error"});

    }
};

module.exports.admin_login = async( req, res) => {
    try{
        const validate = admin_login(req.body);
        validate.then( async (done) => {
            await adminDetails.findOne({ 
                email: encrypt(done.email),
                password: encrypt(done.password)
            }).then( async (dbRes) => {
                if(dbRes != null){

                    var document = new adminLogin({
                        
                        email: encrypt(done.email)
                        
                    });
                    document.save( async ( err, element) => {
                        if(err){
                            console.log("Admin Login Activity Save Error");
                        }
                        else{
                            console.log("Admin Login Activity Saved.")
                        }
                    });
                    return res.status(200).send({ success: true, message:"Login Success"});
                }
                else{
                    console.log("No details found!");
                    return res.status(400).send({ success: false, message:"Login Failed", error:"admin not found."});
                }
            }).catch( async(err) => {
                console.log(err);
                return res.status(400).send({ success: false, message:"Bad Request", error:"DB Error."});
            })
        }).catch( async (err) => {
            console.log(err);
            return res.status(400).send({ success: false, message:"Bad Request", error:"Joi validation failed"});
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).send({ success: false, message:"Server Error"})
    }
};

module.exports.get_seats = async( req, res) => {
    try{
        const validate = get_availability.params(req.params);
        validate.then( async (done) => {
            await playtime.findOne({
                movie_id: done.m_ID,
                theatre_id: done.t_ID
            }).then( (dbRes) => {
                if(dbRes != null){
                    return res.status(200).send({ success: true, message:"Details Found...!", response: dbRes});
                }
                else{
                    console.log("No details found!");
                    return res.status(400).send({ success: false, message:"Details not found..!"});
                }
            }).catch( (err) => {
                console.log(err);
                return res.status(400).send({ success: false, message:"Bad Request", error:"DB Error."});
            })
        }).catch( async err => {
            console.log(err);
            return res.status(400).send({ success: false, message:"Bad Request", error:"Joi validation failed"});
        })
        
    }
    catch(error){

        console.log(error);
        return res.status(500).send({ success: false, message:"Server error"});

    }
};


/***********************************************************************ADMIN ENDS****************************************************************************************/

/***********************************************************************CLIENT STARTS****************************************************************************************/

const userSignup = mongoose.model('user_signup');
const userLogin = mongoose.model('user_login');
const book = mongoose.model('booking');

module.exports.add_user = async( req, res) => {
    try{
        
        const validate = user_signup(req.body);
        validate.then( async (done) => {

            var document = new userSignup({

                name: encrypt(done.name),
                email: encrypt(done.email),
                mobile: encrypt(done.mobile),
                password: encrypt(done.password)

            });

            document.save( async (err, element) => {

                if(err){
                    console.log(err);
                    return res.status(400).send({ success: false, message: "DB Server error", error: "DB Save Failed"});
                }
                else{

                    return res.status(200).send({ success: true, message: "User Signup Successfull!"});

                }

            });

        }).catch( async (err) => {

            console.log(err);
            return res.status(400).send({ success: false, message: "bad request", error: "Joi validation failed"});

        });

    }
    catch(error){
        console.log(error);
        return res.status(500).send({ success: false, message: "server error"});
    }
};

module.exports.user_login = async( req, res) => {
    try{

        const validate = user_login(req.body);
        validate.then( async (done) => {

            await userSignup.findOne({ 
                email: encrypt(done.email),
                password: encrypt(done.password)
            }).then( async (dbRes) => {
                if(dbRes != null){

                    var document = new userLogin({
                        
                        email: encrypt(done.email)
                        
                    });
                    document.save( async ( err, element) => {
                        if(err){
                            console.log("User Login Activity Save Error");
                        }
                        else{
                            console.log("User Login Activity Saved.")
                        }
                    });
                    return res.status(200).send({ success: true, message:"Login Success"});
                }
                else{
                    console.log("No details found!");
                    return res.status(400).send({ success: false, message:"Login Failed", error:"admin not found."});
                }
            }).catch( async(err) => {
                console.log(err);
                return res.status(400).send({ success: false, message:"Bad Request", error:"DB Error."});
            })

        }).catch( async (err) => {
            console.log(err);
        return res.status(400).send({ success: false, message: "Bad Request", error: "Joi validation error"});
            
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).send({ success: false, message: "server error"});
    }
};

module.exports.movie_search = async ( req, res) => {
    try{
        const validate = user_movie_search.params(req.params);
        validate.then( async (done) => {
            await playtime.find({
                movie_id: done.m_ID,
            }).then( (dbRes) => {
                if(dbRes != null){
                    return res.status(200).send({ success: true, message:"Details Found...!", response: dbRes});
                }
                else{
                    console.log("No details found!");
                    return res.status(400).send({ success: false, message:"Details not found..!"});
                }
            }).catch( (err) => {
                console.log(err);
                return res.status(400).send({ success: false, message:"Bad Request", error:"DB Error."});
            })
        }).catch( (err) => {
            console.log(err);
            return res.status(400).send({ success: false, message:"Bad Request", error:"DB Error."});
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).send({ success: false, message: "server error!"})
    }
};

module.exports.theatre_search = async ( req, res) => {
    try{
        const validate = user_theatre_search.params(req.params);
        validate.then( async (done) => {
            await playtime.find({
                theatre_id: done.t_ID,
            }).then( (dbRes) => {
                if(dbRes != null){
                    return res.status(200).send({ success: true, message:"Details Found...!", response: dbRes});
                }
                else{
                    console.log("No details found!");
                    return res.status(400).send({ success: false, message:"Details not found..!"});
                }
            }).catch( (err) => {
                console.log(err);
                return res.status(400).send({ success: false, message:"Bad Request", error:"DB Error."});
            })
        }).catch( (err) => {
            console.log(err);
            return res.status(400).send({ success: false, message:"Bad Request", error:"DB Error."});
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).send({ success: false, message: "server error!"})
    }
};

module.exports.booking = async ( req, res) => {
    try{
        let available = false;
        let booked ;
        const validate = booking_check(req.body);
        validate.then( async (done) => {

            await playtime.findOne({
                theatre_id: done.theatre_id,
                movie_id: done.movie_id,
                details: { $elemMatch: {_id: done.screen_id} }
            }).then(( dbRes ) =>{
                console.log(dbRes);
                dbRes.details.forEach(element => {
                    if(element._id == done.screen_id)
                    {
                        let availability = element.no_of_seats - element.no_of_seats_booked;
                        if( done.no_of_seats_booked <= availability){
                            available = true;
                             booked = element.no_of_seats_booked + done.no_of_seats_booked;
                        }
                        else{
                            available = false;
                        }
                    }
                });
                if( available ){
                    var document = new book ({
                        user_booking_email: encrypt(done.user_booking_email),
                        theatre_id: done.theatre_id,
                        movie_id: done.movie_id,
                        screen_id: done.screen_id,
                        no_of_seats_booked: done.no_of_seats_booked,
                        date: done.date,
                        time: done.time
                    });
                    document.save( async ( err, element) => {
                        if(err){
                            console.log("User booking Activity Save Error");
                            return res.status(400).send({ success:false, message: "Tickeyts not booked!", error: "DB save failed!"});
                        }
                        else{
                            await playtime.updateOne({
                                theatre_id: done.theatre_id,
                                movie_id: done.movie_id,
                                details: { $elemMatch: {_id: done.screen_id} }
                            },{
                                $set: {"details.$.no_of_seats_booked": booked }
                            }, (err, pass) =>{
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    // console.log(pass);
                                }
                            })
                            sendInvoice(element);
                            await console.log("User booking Activity Saved and sent an email.")
                            return res.status(200).send({ success:true, message: "Tickets booked!", response: element});
                        }
                    });
                }else{
                    return res.status(400).send({ success:false, message: "Bad request", error: "Tickets sold out"});
                }
            }).catch( (err) => {
                console.log(err);
                return res.status(400).send({ success:false, message: "Bad request", error: "Theatre not found!"});
            });

        }).catch( (err) => {
            console.log(err);
            return res.status(400).send({ success:false, message: "Bad request", error: "Joi validation failed"});
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).send({ success: false, message: "server error"});
    }
};

/***********************************************************************CLIENT ENDS****************************************************************************************/

/***********************************************************************MOVIE STARTS****************************************************************************************/

const movieDetails = mongoose.model('movie_details');

module.exports.add_movie = async( req, res) => {
    try{

        const validate = movie_details(req.body);
        validate.then( async (done) => {

            var document = new movieDetails({

                name: encrypt(done.name),
                language: encrypt(done.language),
                release_date: done.release_date,
                cast: done.cast

            });

            document.save( async (err, element) => {

                if(err){
                    console.log(err);
                    return res.status(400).send({ success: false, message: "DB Server error", error: "DB Save Failed"});
                }
                else{

                    return res.status(200).send({ success: true, message: "Movie Added."});

                }

            });

        }).catch( async (err) => {

            console.log(err);
            return res.status(400).send({ success: false, message: "bad request", error: "Joi validation failed"});

        });

    }
    catch(error){
        console.log(error);
        return res.status(500).send({ success: false, message: "server error"});
    }
};

/***********************************************************************MOVIE ENDS****************************************************************************************/


/***********************************************************************Theater STARTS****************************************************************************************/

const theaterDetails = mongoose.model('theatre_details');
const playtime = mongoose.model('theatre_movies_details');

module.exports.add_theatre = async( req, res) => {
    try{

        const validate = theatre_details(req.body);
        validate.then( async (done) => {

            var document = new theaterDetails({

                name: encrypt(done.name),
                address: encrypt(done.address),
                details: done.details

            });

            document.save( async (err, element) => {

                if(err){
                    console.log(err);
                    return res.status(400).send({ success: false, message: "DB Server error", error: "DB Save Failed"});
                }
                else{

                    return res.status(200).send({ success: true, message: "Theatre Added."});

                }

            });

        }).catch( async (err) => {

            console.log(err);
            return res.status(400).send({ success: false, message: "bad request", error: "Joi validation failed"});

        });

    }
    catch(error){
        console.log(error);
        return res.status(500).send({ success: false, message: "server error"});
    }
};

module.exports.add_playtime = async( req, res) => {
    try{

        const validate = theatre_movies_details(req.body);
        validate.then( async (done) => {

            var document = new playtime({

                movie_id: done.movie_id,
                theatre_id:  done.theatre_id,
                details: done.details

            });

            document.save( async (err, element) => {

                if(err){
                    console.log(err);
                    return res.status(400).send({ success: false, message: "DB Server error", error: "DB Save Failed"});
                }
                else{

                    return res.status(200).send({ success: true, message: "Playtime Added."});

                }

            });

        }).catch( async (err) => {

            console.log(err);
            return res.status(400).send({ success: false, message: "bad request", error: "Joi validation failed"});

        });

    }
    catch(error){
        console.log(error);
        return res.status(500).send({ success: false, message: "server error"});
    }
};

/***********************************************************************Theater ENDS****************************************************************************************/
