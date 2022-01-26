const isEmpty = require( './is-empty' );
const Validator = require( 'validator' );

module.exports = function validateRegisterInput( data ){
    
    let errors = { };
    
    data.name = !isEmpty( data.fullName ) ? data.fullName : '';
    data.email = !isEmpty( data.email ) ? data.email : '';
    data.password = !isEmpty( data.password ) ? data.password : '';
    data.phone = !isEmpty( data.phone ) ? data.phone : '';
    data.username = !isEmpty(data.username) ? data.username : '';

    if( !Validator.isLength( data.username, { min: 3, max: 30 }) ){
        errors.username = 'username must be between 3 and 30 characters!';
    }
    
    if( Validator.isEmpty( data.username ) ){
        errors.username = 'username field is required!';
    }

    if( !Validator.isLength( data.fullName, { min: 5, max: 40 }) ){
        errors.fullName = 'Full Name must be between 2 and 30 characters!';
    }
    
    if( Validator.isEmpty( data.fullName ) ){
        errors.fullName = 'Full Name field is required!';
    }
    if( !Validator.isLength( data.phone, { min: 5, max: 16 }) ){
        errors.phone = 'Phone must be between 2 and 30 characters!';
    }
    
    if( Validator.isEmpty( data.phone ) ){
        errors.phone = 'Phone field is required!';
    }

    if( Validator.isEmpty( data.email ) ){
        errors.email = 'Email field is required!';
    }
    
    if( !Validator.isEmail( data.email ) ){
        errors.email = 'Email is invalid!';
    }
    
    if( Validator.isEmpty( data.password ) ){
        errors.password = 'Password field is required!';
    }
    
    if( !Validator.isLength( data.password, { min: 6, max: 30 }) ){
        errors.password = 'Password must be at least 6 characters!';
    }

    
    return {
        errors,
        isValid: isEmpty( errors )
    };
}