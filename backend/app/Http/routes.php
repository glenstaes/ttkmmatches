<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('statics/login');
});
Route::get('/register', function () {
    return view('statics/register');
});

Route::post("/signup", "AuthController@createUser");
Route::post("/signin", "AuthController@loginUser");