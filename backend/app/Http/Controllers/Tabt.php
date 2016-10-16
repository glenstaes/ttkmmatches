<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Response as Response;

use SoapClient;

class Tabt extends Controller
{
    /**
     * __construct
     *
     * Sets the api urls as a constant.
     */
    public function __construct(){
        define("TABT_API_VTTL", "http://api.vttl.be/0.7/?wsdl");
        define("TABT_API_SPORTA", "http://ttonline.sporta.be/api/?wsdl");
    }

    /**
     * connectToTabT
     *
     * Uses the api urls to instantiate an object with a SoapClient for the Api's.
     *
     * @return (object) An object containing two attributes with a SoapClient instance.
     */
    private function connectToTabT(){
        $connections = app("stdClass");
        $connections->VTTL = new SoapClient(constant("TABT_API_VTTL"));
        $connections->Sporta = new SoapClient(constant("TABT_API_SPORTA"));
        return $connections;
    }

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
            $connection = $this->connectToTabT();

            // VTTL
            $vttlRequest = array("Club" => "A141");
            $vttlMembers = $connection->VTTL->GetMembers($vttlRequest);

            // Sporta
            $sportaRequest = array("Club" => "1252");
            $sportaMembers = $connection->Sporta->GetMembers($sportaRequest);

            $response = app("stdClass");
            $response->VTTL = $vttlMembers;
            $response->Sporta = $sportaMembers;

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
            $connection = $this->connectToTabT();

            return Response::json($connection->VTTL->GetSeasons());
        } catch(\Exception $ex){
            return Response::json($ex->getMessage());
        }
    }
}
