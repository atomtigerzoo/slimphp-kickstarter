<?php

return [
	'settings' => [
        'determineRouteBeforeAppMiddleware' => true,
		'displayErrorDetails' => require('config/slim-error.conf.php'), // set to false in production
		'addContentLengthHeader' => false, // Allow the web server to send the content-length header
		// Renderer settings
		'renderer' => [
			'template_path' => __DIR__ . '/templates/',
		],
        // Database
        'db' => require('config/database.conf.php'),
        // Piwik ID
        'piwik_site_id' => null,
        // In production?
        'app_in_production' => require('config/production.conf.php'),
	],
    'appdata' => [
        // Add static attributes/data/etc here if you like
        'somekey' => [
            1 => [
                'someattr' => true
            ]
        ]
    ]
];
