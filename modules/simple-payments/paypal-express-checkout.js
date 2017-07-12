/**
 * This PaypalExpressCheckout global is included by wp_enqueue_script( 'paypal-express-checkout' );
 * It handles communication with Paypal Express checkout and public-api.wordpress.com for the purposes
 * of simple-payments module.
 */

/* global paypal */
/* exported PaypalExpressCheckout */
var PaypalExpressCheckout = {
	constants: {
		createPaymentEndpoint: '', //TODO: point to the actual endpoint
		executePaymentEndpoint: '', //TODO: point to the actual endpoint
	},
	renderButton: function( id ) {
		paypal.Button.render( {
			commit: true,
			payment: function() {
				return paypal.request.post( PaypalExpressCheckout.constants.createPaymentEndpoint ).then( function( data ) {
					return data.id;
				} );
			},
			onAuthorize: function( data ) {
				return paypal.request.post( PaypalExpressCheckout.constants.executePaymentEndpoint, {
					paymentID: data.paymentID,
					payerID: data.payerID
				} ).then( function( payment ) {
					// TODO: handle success, errors, messaging, etc, etc.
					console.log( 'payment: ', payment );
					alert( 'success!' );
				} );
			}

		}, id );
	}
};
