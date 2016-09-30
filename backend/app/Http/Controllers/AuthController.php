<?php

namespace App\Http\Controllers;

use App\User as User;
use App\Error as Error;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash as Hash;
use Illuminate\Support\Facades\Input as Input;
use Illuminate\Support\Facades\Response as Response;
use Tymon\JWTAuth\Facades\JWTAuth as JWTAuth;
use App\Http\Requests;

class AuthController extends Controller {

    /**
     * Creates a new user
     */
    public function createUser(Request $request) {
        $credentials = Input::only("firstName", "lastName", "email", "password");

        try {
            if (!isset($credentials["email"]) || is_null($credentials["email"])) {
                throw new \Exception("JUNO-AUTH-00001", 500);
            }
            if (!isset($credentials["password"]) || is_null($credentials["password"])) {
                throw new \Exception("JUNO-AUTH-00002", 500);
            }
            if (!isset($credentials["firstName"]) || is_null($credentials["firstName"])) {
                throw new \Exception("JUNO-AUTH-00003", 500);
            }
            if (!isset($credentials["lastName"]) || is_null($credentials["lastName"])) {
                throw new \Exception("JUNO-AUTH-00004", 500);
            }
            if (User::emailInUse($credentials["email"])) {
                throw new \Exception("JUNO-AUTH-00005", 500);
            }

            $credentials["password"] = Hash::make($credentials["password"]);
            
            // Register the user
            $user = User::newUser($credentials);

            $token = JWTAuth::fromUser($user);

            return Response::json(compact("token"));
        } catch (\Exception $ex) {
            if (str_contains($ex->getMessage(), "JUNO-")) {
                return Response::json(Error::getByCode($ex->getMessage()), 500);
            }
            throw $ex;
            return Response::json(Error::getByCode("JUNO-AUTH-00006"), 401);
        }
    }

    /**
     * Authenticates an existing user
     */
    public function loginUser(Request $request) {
        $credentials = Input::only("email", "password");

        if (!$token = JWTAuth::attempt($credentials))
            return Response::json(Error::getByCode("JUNO-AUTH-00101"), 401);
        $user = JWTAuth::toUser($token);
        return Response::json(compact("token", "user"));
    }

}
