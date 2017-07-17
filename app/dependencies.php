<?php
// DIC configuration

$container = $app->getContainer();

// twig-view / Renderer
$container['view'] = function ($container) {
  $settings = $container->get('settings')['renderer'];
  
  $view = new \Slim\Views\Twig($settings['template_path'], [
    'cache' => false,
    'debug' => require('config/slim-error.conf.php'),
  ]);
  
  // Instantiate and add Slim specific extensions
  $basePath = rtrim(str_ireplace('index.php', '', $container['request']->getUri()->getBasePath()), '/');
  $view->addExtension(new Slim\Views\TwigExtension($container['router'], $basePath));
  // Debug
  $view->addExtension(new \Twig_Extension_Debug());
  // Add slugify
  $view->addExtension(new Cocur\Slugify\Bridge\Twig\SlugifyExtension(Cocur\Slugify\Slugify::create()));

  // Add flash messages
  /*
  $view->addExtension(new Knlv\Slim\Views\TwigMessages(
    new Slim\Flash\Messages()
  ));
  */

  // Is app in production state?
  $view['appInProduction'] = $container->get('settings')['app_in_production'];

  return $view;
};


// Database / Eloquent
/**
$container['db'] = function ($container) {
  $capsule = new \Illuminate\Database\Capsule\Manager;
  $capsule->addConnection($container['settings']['db']);

  $capsule->setAsGlobal();
  $capsule->bootEloquent();

  return $capsule;
};
// Init db globally
$container->get("db");
*/

// Flash messages
/*
$container['flash'] = function () {
  return new \Slim\Flash\Messages();
};
*/

// CSRF
$container['csrf'] = function() {
  return new \Slim\Csrf\Guard;
};


// Logging
$container['logger'] = function() {
  $logger = new \Monolog\Logger('appLogger');
  $file_handler = new \Monolog\Handler\StreamHandler("../logs/app.log");
  $logger->pushHandler($file_handler);
  return $logger;
};


// Piwik tracking
define('PIWIK_SITE_ID', $container->get('settings')['piwik_site_id']);
