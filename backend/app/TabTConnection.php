<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use SoapClient;

class TabTConnection
{
    private $connection;

    /**
     * __construct
     *
     * Sets the api urls as a constant.
     */
    public function __construct(){
        if(!defined("TABT_API_VTTL"))
            define("TABT_API_VTTL", "http://api.vttl.be/0.7/?wsdl");
        if(!defined("TABT_API_SPORTA"))
            define("TABT_API_SPORTA", "http://ttonline.sporta.be/api/?wsdl");

        $this->connectToTabT();
    }

    /**
     * connectToTabT
     *
     * Uses the api urls to instantiate an object with a SoapClient for the Api's.
     */
    private function connectToTabT(){
        $this->connection = app("stdClass");
        $this->connection->VTTL = new SoapClient(constant("TABT_API_VTTL"));
        $this->connection->Sporta = new SoapClient(constant("TABT_API_SPORTA"));
    }

    public function invoke($method, $vttlRequest = null, $sportaRequest = null){
        $response = app("stdClass");
        switch($method){
            case "GetMembers":
                $response->VTTL = $this->connection->VTTL->GetMembers($vttlRequest);
                $response->Sporta = $this->connection->Sporta->GetMembers($sportaRequest);
                break;
            case "GetSeasons":
                $response = $this->connection->VTTL->GetSeasons();
                break;
            default: 
                break;
        }
        return $response;
    }
}
