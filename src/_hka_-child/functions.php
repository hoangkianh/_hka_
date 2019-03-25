<?php
/**
 * _hka_ Child functions and definitions
 *
 * @package _hka_
 * */

/**
 * Enqueue scripts and styles
 */
function _hka__child_scripts() {
	wp_enqueue_style( '_hka_-style', get_template_directory_uri() . '/style.css', array(), _HKA__THEME_VERSION );
	wp_enqueue_style( '_hka_-child-style', get_stylesheet_directory_uri() . '/style.css', array( '_hka_-style' ), _HKA__THEME_VERSION );

	wp_enqueue_script(
		'_hka_-child-script',
		get_stylesheet_directory_uri() . '/script.js',
		array( 'jquery' ),
		_HKA__THEME_VERSION,
		true
	);

	$whitelist = array(
		'127.0.0.1',
		'::1',
	);

	if ( isset( $_SERVER['REMOTE_ADDR'] ) && isset( $_SERVER['SERVER_NAME'] ) && in_array( wp_unslash( $_SERVER['REMOTE_ADDR'] ), $whitelist, true ) ) {
		// Enqueue BS Script for Dev.
		$url      = sprintf( 'http://%s:3000/browser-sync/browser-sync-client.js', sanitize_text_field( wp_unslash( $_SERVER['SERVER_NAME'] ) ) );
		$response = wp_remote_get(
			$url,
			array(
				'timeout' => 20,
			)
		);

		if ( ! is_wp_error( $response ) ) {
			wp_enqueue_script( '__bs_script__', $url, array(), '1.0', true );
		}
	}
}
add_action( 'wp_enqueue_scripts', '_hka__child_scripts' );
