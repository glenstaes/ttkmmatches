<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Response as Response;
use Illuminate\Support\Facades\Input as Input;

use App\Season;
use App\Federation;
use App\Player;
use App\TabTConnection;

use SoapClient;

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
        $seasons = Season::all();

        foreach($seasons as $season){
            $season->members = Player::getBySeason($season);
        }

        return Response::json($seasons);
    }

    /**
     * getSeason
     *
     * Gets a seasons from the database.
     *
     * @param (Request) An instance of the Request object. 
     * @return (Array<Season>) An array of Season objects.
     */
     public function getSeason(Request $request){
         $id = Input::only("id")["id"];

         $season = Season::find($id);

         if(!is_null($season)){
             $season[0]['members'] = Player::getBySeason($season[0]);
         }

         return Response::json($season);
     }

    /**
     * newSeason
     *
     * Creates a new season.
     *
     * @param (Request) An instance of the Request object. 
     * @return (Season) The created season.
     */
    public function newSeason(Request $request){
        try{
            $input = Input::only("name", "customName");

            $tabtData = Season::getTabTData($input["name"]);

            // Save the new season
            $newSeason = Season::create(['name' => $input["name"]]);
            $newSeason->customName = $input["customName"];
            $newSeason->save();

            Player::import($tabtData->members->VTTL->MemberEntries, Federation::find(1), $newSeason);
            Player::import($tabtData->members->Sporta->MemberEntries, Federation::find(2), $newSeason);

            $newSeason->importedPlayers = $tabtData->members->VTTL->MemberCount + $tabtData->members->Sporta->MemberCount;

            return Response::json($newSeason);
        } catch(\Exception $ex){
            return Response::json($ex->getMessage());
        }
    }

    /**
     * setAsCurrent
     *
     * Sets the provided season as the current season.
     *
     * @param (Request) An instance of the Request object. 
     * @return (Season) The current season.
     */
     public function setAsCurrent(Request $request){
         $id = Input::only("id")["id"];

         $season = Season::find($id);

         if(!is_null($season)){
             $current = Season::getCurrent();
             if(!is_null($current)){
                $current->current = 0;
                $current->save();
             }
             $season->current = 1;
             $season->save();
         }

         return Response::json(Season::getCurrent());
     }

    /**
     * updateName
     *
     * Updates the custom name of the provided season.
     *
     * @param (Request) An instance of the Request object. 
     * @return (Season) The updated season.
     */
     public function updateName(Request $request){
         $input = Input::only("id", "customName");

         if(!is_null($input["customName"]) && $input["customName"] != ""){
             $season = Season::find($input["id"]);

             if(!is_null($season)){
                $season->customName = $input["customName"];
                $season->save();
            }
         }

         return Response::json(Season::find($input["id"]));
     }
}
