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

Route::post("/signup", "AuthController@createUser");
Route::post("/signin", "AuthController@loginUser");

Route::group(['middleware' => 'jwt.auth'], function () {
    // Users need to be logged in before they can use these routes
    Route::post("/tabt/members", "Tabt@getMembers");
});