<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Response as Response;
use Illuminate\Support\Facades\Input as Input;

use App\Season;

class SeasonController extends Controller
{
    /**
     * getSeasons
     *
     * Gets all the seasons from the database.
     *
     * @param (Request) An instance of the Request object. 
     * @return (Array<Season>) An array of Season objects.
     */
    public function getSeasons(Request $request){
        return Response::json(Season::all());
    }

    public function newSeason(Request $request){
        $input = Input::only("name", "customName");

        $newSeason = Season::create(['name' => $input["name"]]);

        $newSeason->customName = $input["customName"];
        $newSeason->save();

        return Response::json($newSeason);
    }
}
