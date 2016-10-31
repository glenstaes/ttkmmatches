<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Response as Response;
use Illuminate\Support\Facades\Input as Input;

use App\Player;

class UserController extends Controller
{
    /**
     * Gets the users without an account
     */
    public function getWithoutAccount(Request $request){
        return Response::json(Player::getWithoutAccount());
    }
}
