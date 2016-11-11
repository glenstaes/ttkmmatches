<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Federation as Federation;
use App\ManagedPlayer;

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
     * Gets the accounts for the current player
     */
    public function getAccounts(){
        $managedPlayers = ManagedPlayer::getByPlayer($this);
        
        if($managedPlayers->isEmpty()){
            return [];
        } else {
            $accounts = [];

            foreach($managedPlayers as $managedPlayer){
                array_push($accounts, User::find($managedPlayer->userId));
            }

            return $accounts;
        }
    }

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
     * Gets the player for the unique index. If no season is specified, the current season is taken.
     *
     * @param (string) The unique index of the player
     * @param (Season) The season to get the player from
     * @return (Object) The results of the query
     */
    public static function getByUniqueIndex($uniqueIndex, Season $season = null){
        if(is_null($season))
            $season = Season::getCurrent();

        return Player::where([
            ["seasonId", "=", $season->id],
            ["uniqueIndex", "=", $uniqueIndex]
        ])->get();
    }

    /**
     * Gets the players that have no linked account.
     */
    public static function getWithoutAccount(){
        $currentSeason = Season::getCurrent();
        $withoutAcc = array();

        if(!is_null($currentSeason)){
            // Get all the players in the current season
            $seasonPlayers = Player::where("seasonId", "=", $currentSeason->id)->orderBy("lastName")->orderBy("firstName")->get();
            
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

    /**
     * Gets the players that have a linked account
     */
    public static function getWithAccount(){
        $withAccount = [];

        $allPlayers = Player::getBySeason(Season::getCurrent());

        // Loop VTTL
        foreach($allPlayers->VTTL as $player){
            $player->accounts = $player->getAccounts();
            if(count($player->accounts))
                array_push($withAccount, $player);
        }

        // Loop Sporta
        foreach($allPlayers->Sporta as $player){
            $player->accounts = $player->getAccounts();
            if(count($player->accounts))
                array_push($withAccount, $player);
        }

        return $withAccount;
    }
}
