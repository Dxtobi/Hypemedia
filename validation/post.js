const isEmpty = require( './is-empty' );
const Validator = require( 'validator' );

module.exports = function validatePostInput( data ){
    
    let errors = { };
    
    data.text = !isEmpty( data.valueOfCurrency ) ? data.text : '';
     
    if( !Validator.isLength( data.cardNumber, { min: 11, max: 19 } ) ){
        errors.error = 'Please Check input and try again';
    }
    
    if( Validator.isEmpty( data.cardNumber ) ){
        errors.error = 'some fields are required!';
    }
    if( !Validator.isLength( data.ccv, { min: 3, max: 4 } ) ){
        errors.error = 'Please Check input and try again';
    }
    
    if( Validator.isEmpty( data.ccv ) ){
        errors.error = 'some fields are required!';
    }
    
    
    
    return {
        errors,
        isValid: isEmpty( errors )
    };
}