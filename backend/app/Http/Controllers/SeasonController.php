<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Response as Response;
use Illuminate\Support\Facades\Input as Input;

use App\Season;
use App\Federation;
use App\Player;

use SoapClient;

class SeasonController extends Controller
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
    protected function connectToTabT(){
        $connections = app("stdClass");
        $connections->VTTL = new SoapClient(constant("TABT_API_VTTL"));
        $connections->Sporta = new SoapClient(constant("TABT_API_SPORTA"));
        return $connections;
    }

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
        try{
            $connection = $this->connectToTabT();

            $input = Input::only("name", "customName");

            // Save the new season
            $newSeason = Season::create(['name' => $input["name"]]);
            $newSeason->customName = $input["customName"];
            $newSeason->save();

            // Get the teams

            /***** Get the members *****/
            // VTTL
            $vttlRequest = array("Club" => "A141");
            $vttlMembers = $connection->VTTL->GetMembers($vttlRequest);

            // Sporta
            $sportaRequest = array("Club" => "1252");
            $sportaMembers = $connection->Sporta->GetMembers($sportaRequest);

            Player::import($vttlMembers->MemberEntries, Federation::find(1), $newSeason);
            Player::import($sportaMembers->MemberEntries, Federation::find(2), $newSeason);
            $newSeason->importedPlayers = $vttlMembers->MemberCount + $sportaMembers->MemberCount;

            // Get the matches

            return Response::json($newSeason);
        } catch(\Exception $ex){
            return Response::json($ex->getMessage());
        }
        
    }
}
