<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Federation as Federation;

class Player extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'uniqueIndex', 'position', 'rankingIndex', 'firstName', 'lastName', 'ranking',
        'email', 'phone', 'federationId', 'seasonId'
    ];

    /**
     * The attributes that are hidden.
     *
     * @var array
     */
    protected $hidden = [];

    // The table
    protected $table = "player";

    /**
     * Imports the given members for the given season.
     *
     * @param (object[]) An array of member entries
     * @param (Federation) The federation to import into
     * @param (Season) The season to import into
     */
    public static function import($members, $federation, $season){
        foreach($members as $member){
            $existingPlayer = Player::where([
                ["uniqueIndex", "=", $member->UniqueIndex],
                ["federationId", "=", $federation->id],
                ["seasonId", "=", $season->id]
            ])->get();

            // Only insert if the player doesn't exist yet
            if($existingPlayer->isEmpty()){
                $player = Player::create([
                    "uniqueIndex" => $member->UniqueIndex,
                    "position" => $member->Position,
                    "rankingIndex" => $member->RankingIndex,
                    "firstName" => $member->FirstName,
                    "lastName" => $member->LastName,
                    "ranking" => $member->Ranking,
                    "federationId" => $federation->id,
                    "seasonId" => $season->id
                ]);

                $player->save();
            } else {
                // Update existing player
                $existingPlayer[0]->position = $member->Position;
                $existingPlayer[0]->rankingIndex = $member->RankingIndex;
                $existingPlayer[0]->ranking = $member->Ranking;
                $existingPlayer[0]->save();
            }
        }
    }

    /**
     * Gets the members for the given season.
     *
     * @param (object[]) An array of member entries
     * @param (Federation) The federation to import into
     * @param (Season) The season to import into
     * @return (Object) An object containing the VTTL and Sporta members
     */
    public static function getBySeason($season){
        $members = app("stdClass");
        $members->VTTL = Player::where([
            ["seasonId", "=", $season['id']],
            ["federationId", "=", 1]
        ])->get();
        $members->Sporta = Player::where([
            ["seasonId", "=", $season['id']],
            ["federationId", "=", 2]
        ])->get();
        return $members;
    }

    /**
     * Gets the players that have no linked account.
     */
    public static function getWithoutAccount(){
        $currentSeason = Season::getCurrent();
        $withoutAcc = array();

        if(!is_null($currentSeason)){
            // Get all the players in the current season
            $seasonPlayers = Player::where("seasonId", "=", $currentSeason->id)->get();
            
            foreach($seasonPlayers as $player){
                $managedPlayer = ManagedPlayer::where([
                    ["playerId", "=", $player->uniqueIndex],
                ])->get();

                // Push if no corresponding managed player is found
                if($managedPlayer->isEmpty()){
                    array_push($withoutAcc, $player);
                }
            }
        }

        return $withoutAcc;
    }
}
