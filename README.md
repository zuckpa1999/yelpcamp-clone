# yelpcamp Clone

## Web development ##

# models (M from MVC)
- campground.js : A database schema (mongoose) for Campground
- review.js : A database schema (mongoose) for Review
- export the models for each database schema for app.js to use

# public
- js/validateForms.js: form validation ?

# routes
- /campgrounds.js
- /reviews.js
- handle HTTP requests from client side
    - GET / PUT / POST / DELETE
    -  handling error by ExpressError
    - perform validation for PUT and GET method
    - Import Database from Model
    - ? more

# seeds
-  cities.js
    - JSON - config file that provid info to create initial DB
-   seedHelpers.js
    - provide config info for 
        - places
        - descriptions
-   index.js
    - add config info from cities.js and seedHelpers.js to mongoDB by mongoose 
    - Cities
        -   location:
            title: 
            image: 
            description: 
            price


# utils
- catchAsyc.js
    - helper function to catch async 
- ExpressError.js
    - handle error receive 2 params
        - statusCode
        - Message

# views (V from MVC)
- template engine : ejs
- campgrounds (HTML)
    - edit.ejs
    - index.ejs 
    - new.ejs 
    - show.ejs  
- partials (part of the HTML that are being used throughout many pages)
    -flash.ejs
    -footer.ejs
    -navbar.ejs
- layouts (building block / Structure of the View)
    - boilerplates.ejs

- home.ejs : home apge
- error.ejs : template backbone file for when errors pop up

# app.js (C - Controller from MVC)


# schemas.js
- A middleware for validating express inputs using Joi schemas
