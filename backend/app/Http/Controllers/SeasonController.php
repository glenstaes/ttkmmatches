<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Response as Response;

use App\Season;

class SeasonController extends Controller
{
    public function getSeasons(Request $request){
        return Response::json(Season::all());
    }
}
