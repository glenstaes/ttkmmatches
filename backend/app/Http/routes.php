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

    /**
     * TABT Api Routes
     */
    Route::post("/tabt/members", "Tabt@getMembers");
    Route::post("/tabt/seasons", "Tabt@getSeasons");

    /**
     * RelationType routes
     */
    Route::post("/relationtypes/all", "RelationTypeController@getAll");

    /**
     * Season routes
     */
    Route::post("/seasons", "SeasonController@getSeasons");
    Route::post("/seasons/get", "SeasonController@getSeason");
    Route::post("/seasons/new", "SeasonController@newSeason");
    Route::post("/seasons/update", "SeasonController@updateName");
    Route::post("/seasons/setcurrent", "SeasonController@setAsCurrent");
    Route::post("/seasons/sync", "SeasonController@syncWithTabT");
    Route::post("/seasons/delete", "SeasonController@delete");

    /**
     * User routes
     */
     Route::post("/users/withoutaccount", "UserController@getWithoutAccount");
});