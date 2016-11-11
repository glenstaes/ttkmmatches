<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Response as Response;
use Illuminate\Support\Facades\Input as Input;

use App\RelationType;

class RelationTypeController extends Controller
{
    /**
     * Gets the relation types
     */
    public function getAll(Request $request){
        return Response::json(RelationType::all());
    }
}
