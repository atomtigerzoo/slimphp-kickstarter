<?php
// Routes

use \Cocur\Slugify\Slugify;
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \Slim\Exception\NotFoundException;

/**
 * Home
 * Route: /
 */
$app->get('/', function (Request $request, Response $response) {
	return $this->view->render($response, 'index.twig', [
		'title' => 'Home',
    'metaDesc' => 'The websites home page'
	]);
})
->setName('home');
