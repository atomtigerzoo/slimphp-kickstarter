<?php

// Set include path
$include_path = __DIR__ . '/../';

// Autoload
require $include_path . 'vendor/autoload.php';

session_start();

// Load settings
$settings = require $include_path . 'app/settings.php';

// Instantiate the app
$app = new \Slim\App($settings);

// Set up dependencies
require $include_path . 'app/dependencies.php';

// Register middleware
require $include_path . 'app/middleware.php';

// Register routes
require $include_path . 'app/routes.php';

// Run app
$app->run();
