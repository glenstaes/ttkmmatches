<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Response as Response;

use App\TabTConnection;

class Tabt extends Controller
{
    /**
     * getMembers
     *
     * Connects to TabT to retrieve the members of the club in the current season. Be aware 
     * that this uses the current season as known in the TabT database and not our own database.
     *
     * @param (Request) An instance of the Request object. 
     * @return (object) An object with the members for each federation.
     */
    public function getMembers(Request $request){
        try{
            $connection = new TabTConnection();

            $vttlRequest = array("Club" => "A141");
            $sportaRequest = array("Club" => "1252");

            $response = $connection->invoke("GetMembers", $vttlRequest, $sportaRequest);

            return Response::json($response);
        } catch(\Exception $ex){
            return Response::json($ex->getMessage());
        }
    }

    /**
     * getSeasons
     *
     * Connects to TabT to retrieve the seasons.
     * @param (Request) An instance of the Request object. 
     * @return (object) An object containing the seasons count and an array with season entries.
     */
    public function getSeasons(Request $request){
        try{
            $connection = new TabTConnection();

            return Response::json($connection->invoke("GetSeasons"));
        } catch(\Exception $ex){
            return Response::json($ex->getMessage());
        }
    }
}
