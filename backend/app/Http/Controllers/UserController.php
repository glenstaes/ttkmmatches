<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Hash as Hash;
use Illuminate\Support\Facades\Response as Response;
use Illuminate\Support\Facades\Input as Input;

use App\Player;
use App\ManagedPlayer;
use App\User;
use App\Error;
use App\Season;

class UserController extends Controller
{
    /**
     * Gets the users without an account
     */
    public function getWithoutAccount(Request $request){
        return Response::json(Player::getWithoutAccount());
    }

    /**
     * Gets the players with an account
     */
    public function getWithAccount(Request $request){
        return Response::json(Player::getWithAccount());
    }

    /**
     * Attaches accounts to a player
     */
    public function attachAccounts(Request $request){
        $input = Input::only("playerId", "managedPlayers");

        $accounts = [];
        $relationTypeIds = [];

        foreach($input["managedPlayers"] as $managedPlayer){
            array_push($accounts, User::find($managedPlayer['userId']));
            array_push($relationTypeIds, $managedPlayer['relationTypeId']);
        }

        // Get the player
        $player = Player::getByUniqueIndex($input["playerId"]);
        if(!$player->isEmpty()){
            $player = $player[0];
            $player->attachAccounts($accounts, $relationTypeIds);

            $player->accounts = $player->getAccounts();
            return Response::json($player);
        } else {
            Response::json(Error::getByCode("JUNO-PLAY-10002"), 500);
        }
    }

    /**
     * Gets all the accounts
     */
    public function getAccounts(Request $request){
        return Response::json(User::all());
    }

    /**
     * Creates an account and attaches it to a player if possible
     */
    public function newUser(Request $request){
        $input = Input::only("firstName", "lastName", "email", "playerUniqueIndex", "relationTypeId");

        try {
            if (!isset($input["email"]) || is_null($input["email"])) {
                throw new \Exception("JUNO-AUTH-00001", 500);
            }
            if (!isset($input["firstName"]) || is_null($input["firstName"])) {
                throw new \Exception("JUNO-AUTH-00003", 500);
            }
            if (!isset($input["lastName"]) || is_null($input["lastName"])) {
                throw new \Exception("JUNO-AUTH-00004", 500);
            }
            if (User::emailInUse($input["email"])) {
                throw new \Exception("JUNO-AUTH-00005", 500);
            }


            // Random string for the password
            $password = User::generateRandomString(10);
            $input["password"] = Hash::make($password);

            if(isset($input["playerUniqueIndex"]) && !is_null($input["playerUniqueIndex"])){
                if(!isset($input["relationTypeId"]) || is_null($input["relationTypeId"])){
                    throw new \Exception("JUNO-AUTH-10001", 500);
                }

                // Register the user
                $user = User::newUser($input);

                ManagedPlayer::create([
                    "playerId" => $input["playerUniqueIndex"],
                    "userId" => $user->id,
                    "relationTypeId" => $input["relationTypeId"]
                ]);

                $user->attachedPlayer = Player::getByUniqueIndex($input["playerUniqueIndex"]);
            } else {
                // Register the user
                $user = User::newUser($input);
            }

            // TODO: send email to user with credentials

            return Response::json($user);
        } catch (\Exception $ex) {
            if (str_contains($ex->getMessage(), "JUNO-")) {
                return Response::json(Error::getByCode($ex->getMessage()), 500);
            }
            throw $ex;
            return Response::json(Error::getByCode("JUNO-AUTH-00006"), 401);
        }
    }
}
