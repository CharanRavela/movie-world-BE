"use strict"

const Joi = require('@hapi/joi');

/***********************************************************************ADMIN STARTS****************************************************************************************/


const admin_login = data => {
    const schema = Joi.object().keys({

        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(12).required()


    });
    return schema.validate(data);
};

const admin_details = data => {

    const schema = Joi.object().keys({

        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(12).required()

    });
    return schema.validate(data);
};

const get_availability = {

    params : (data)=>{
        const schema = Joi.object().keys({
            m_ID : Joi.string().alphanum().required(),
            t_ID : Joi.string().alphanum().required(),
        });
        return schema.validate(data);
    }

};

/***********************************************************************ADMIN ENDS****************************************************************************************/

/***********************************************************************CLIENT STARTS****************************************************************************************/


const user_signup = data=> {
    const schema = Joi.object().keys({

        name: Joi.string().required(),
        email: Joi.string().email().required(),
        mobile: Joi.string().length(10).required(),
        password: Joi.string().min(6).max(12).required()

    });
    return  schema.validate(data);

};

const user_login = data => {
    const schema = Joi.object().keys({

        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(12).required()


    });
    return schema.validate(data);
};

const user_movie_search = {
    params : (data)=>{
        const schema = Joi.object().keys({
            m_ID : Joi.string().alphanum().required(),
        });
        return schema.validate(data);
    }

}

const user_theatre_search = {
    params : (data)=>{
        const schema = Joi.object().keys({
            t_ID : Joi.string().alphanum().required(),
        });
        return schema.validate(data);
    }

}

const booking_check = data => {
    const schema = Joi.object().keys({
        user_booking_email: Joi.string().email().required(),
        movie_id: Joi.string().required(),
        theatre_id: Joi.string().required(),
        screen_id: Joi.string().required(),
        no_of_seats_booked: Joi.number().required(),
        date: Joi.date().required(),
        time: Joi.string().required()
    });
    return schema.validate(data);
}

/***********************************************************************CLIENT ENDS****************************************************************************************/

/***********************************************************************MOVIE STARTS****************************************************************************************/


const movie_details = data=> {
    const schema = Joi.object().keys({
        
        name: Joi.string().required(),
        language: Joi.string().required(),
        release_date: Joi.date().required(),
        cast: Joi.array().required()

    });
    return schema.validate(data);
};


/***********************************************************************MOVIE ENDS****************************************************************************************/

/***********************************************************************Theatre STARTS****************************************************************************************/


const theatre_details = data=> {
    const schema = Joi.object().keys({
        
        name: Joi.string().required(),
        details: Joi.array().required(),
        address: Joi.string().required()

    });
    return schema.validate(data);
};

const theatre_movies_details = data=> {
    const schema = Joi.object().keys({
        
        movie_id: Joi.string().required(),
        theatre_id: Joi.string().required(),
        details: Joi.array().required()

    });
    return schema.validate(data);
};

/***********************************************************************Theatre ENDS****************************************************************************************/

module.exports = {

/***********************************************************************ADMIN STARTS****************************************************************************************/


    admin_login: admin_login,
    admin_details: admin_details,
    get_availability: get_availability,

/***********************************************************************ADMIN ENDS****************************************************************************************/
/***********************************************************************CLIENT STARTS****************************************************************************************/

    user_signup: user_signup,
    user_login: user_login,
    booking_check: booking_check,
    user_movie_search: user_movie_search,
    user_theatre_search: user_theatre_search,

/***********************************************************************CLIENT ENDS****************************************************************************************/
/***********************************************************************MOVIE STARTS****************************************************************************************/

    movie_details: movie_details,

/***********************************************************************MOVIE ENDS****************************************************************************************/
/***********************************************************************Theatre STARTS****************************************************************************************/

    theatre_details: theatre_details,
    theatre_movies_details: theatre_movies_details

/***********************************************************************Theatre ENDS****************************************************************************************/

}