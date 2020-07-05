var mongoose = require('mongoose');
const Schema = mongoose.Schema;

/***********************************************************************ADMIN STARTS****************************************************************************************/

const admin_login = new Schema({

    email:{
        type: String,
        required: true
    }

});
admin_login.set('timestamps', true);

const admin_details = new Schema({

    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }

});
admin_login.set('timestamps', true);

module.exports = mongoose.model('admin_login', admin_login, 'admins_activity');
module.exports = mongoose.model('admin_details', admin_details, 'admins');

/***********************************************************************ADMIN ENDS****************************************************************************************/

/***********************************************************************CLIENT STARTS****************************************************************************************/

const user_login = new Schema({
    
    email:{
        type: String,
        required: true
    }

});
user_login.set('timestamps', true);

const user_signup = new Schema({

    
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }

});
user_signup.set('timestamps', true);

const user_booking = new Schema({
    user_booking_email:{
        type: String,
        required: true
    },
    theatre_id:{
        type: String,
        required: true
    },
    movie_id:{
        type: String,
        required: true
    },
    screen_id:{
        type: String,
        required: true
    },
    no_of_seats_booked:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    time:{
        type: String,
        required: true
    }
});
user_booking.set('timestamps', true);

module.exports = mongoose.model('user_login', user_login, 'users_activity');
module.exports = mongoose.model('user_signup', user_signup, 'users');
module.exports = mongoose.model('booking', user_booking, 'booking_activity')

/***********************************************************************CLIENT ENDS****************************************************************************************/

/***********************************************************************Movie Starts****************************************************************************************/

const movie_details = new Schema({

    name:{
        type: String,
        required: true
    },
    language:{
        type: String,
        required: true
    },
    release_date:{
        type: Date,
        required: true
    },
    cast:{
        type: Array,
        required: true
    }

});
movie_details.set('timestamps', true);

module.exports = mongoose.model('movie_details', movie_details, 'movies');

/***********************************************************************Movie ENDS****************************************************************************************/

/***********************************************************************Theatre Starts****************************************************************************************/

const theatre_details = new Schema({

    name:{
        type: String,
        required: true
    },
    details:[{
        screen: String,
        no_of_seats: Number
    }],
    address:{
        type: String,
        required: true
    }

});
theatre_details.set('timestamps', true);

const theatre_movies_details = new Schema({
    
    movie_id:{
        type: String,
        required: true
    },
    theatre_id:{
        type: String,
        required: true
    },
    details:[{
        no_of_seats: Number,
        no_of_seats_booked: { type: Number, default: 0},
        screen: { type: String, required: true},
        time: { type: String, required: true},
    }]

});
theatre_movies_details.set('timestamps', true);

module.exports = mongoose.model('theatre_details', theatre_details, 'theatres');
module.exports = mongoose.model('theatre_movies_details', theatre_movies_details, 'theatre_movies_schedule');

/***********************************************************************Theatre ENDS****************************************************************************************/
