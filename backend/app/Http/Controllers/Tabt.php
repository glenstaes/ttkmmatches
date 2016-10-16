<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Response as Response;

use SoapClient;

class Tabt extends Controller
{
    public function __construct(){
        define("TABT_API_VTTL", "http://api.vttl.be/0.7/?wsdl");
        define("TABT_API_SPORTA", "http://ttonline.sporta.be/api/?wsdl");
    }

    private function connectToTabT(){
        $connections = app("stdClass");
        $connections->VTTL = new SoapClient(constant("TABT_API_VTTL"));
        $connections->Sporta = new SoapClient(constant("TABT_API_SPORTA"));
        return $connections;
    }

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

    public function getSeasons(Request $request){
        try{
            $connection = $this->connectToTabT();

            $response = app("stdClass");
            $response->VTTL = $connection->VTTL->GetSeasons();
            $response->Sporta = $connection->Sporta->GetSeasons();

            return Response::json($response);
        } catch(\Exception $ex){
            return Response::json($ex->getMessage());
        }
    }
}
