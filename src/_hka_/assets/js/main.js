'use strict';

let _hka_ = ( ( $ ) => {
	let $body = $( 'body' ),
		$window = $( window );

	return {
		init() {
			this.mobileMenu();
		},
		mobileMenu() {
			if ( 992 <= $window.width() ) {
				return;
			}

			let $menuToggle = $( '.menu-toggle' );

			$menuToggle.on( 'click', ( e ) => {
				$( e.currentTarget ).toggleClass( 'is-active' );
				$body.toggleClass( 'menu-open' );
			});

			$( '#page' ).on( 'click', ( e ) => {
				if ( ! $( e.target ).closest( '.menu-toggle' ).length &&
					! $( e.target ).closest( '#primary-menu' ).length &&
					$menuToggle.hasClass( 'is-active' ) &&
					$body.hasClass( 'menu-open' ) ) {
					$menuToggle.removeClass( 'is-active' );
					$body.removeClass( 'menu-open' );

					e.preventDefault();
				}
			});

			// Add arrows to all items have sub-menu.
			$( '#primary-menu' ).find( 'li:has(ul)' ).each( ( index, el ) => {
				let $el = $( el ),
					link = $el.find( '>a' ).clone();

				if ( link.length ) {
					$el.prepend( '<span class="open-child">open</span>' );
					$el.find( '>ul' ).prepend( '<li class="menu-item-back">' + link.wrap( '<div>' ).parent().html() + '</a></li>' );
				}
			});

			// Open sub-menu.
			$( '.open-child' ).on( 'click', ( e ) => {
				let $parent = $( e.currentTarget ).parent();

				if ( $parent.hasClass( 'open' ) ) {
					$parent.removeClass( 'open' );
				} else {
					$parent.parent().find( '>li.open' ).removeClass( 'open' );
					$parent.addClass( 'open' );
				}

				$( '#primary-menu' ).parent().scrollTop( 0 );
			});

			// Go back.
			$( '.menu-item-back' ).on( 'click', ( e ) => {
				let $grand = $( e.currentTarget ).parent().parent();

				if ( $grand.hasClass( 'open' ) ) {
					$grand.removeClass( 'open' );
				}
			});
		}
	};
})( jQuery );

jQuery( document ).ready( () => _hka_.init() );
