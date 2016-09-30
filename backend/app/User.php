<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id', 'firstName', 'lastName', 'email', 'password', 'confirmed', 'confirmationCode'
    ];

    /**
     * The attributes that are hidden.
     *
     * @var array
     */
    protected $hidden = [
        'password'
    ];

    // The table
    protected $table = "user";

    /**
     * Checks if a user exists with the given email
     * 
     * @param string $email The email address to check
     * @return boolean True if a user with the given email already exists or false if the email has not been used yet
     */
    public static function emailInUse($email) {
        return User::where("email", $email)->exists();
    }

    /**
     * Creates a new instance of a user.
     *
     * @param array(string) $credentials An array containing the user information.
     * @return User The created User object.
     */
    public static function newUser($credentials){
        $authorizable = Authorizable::create(["name" => $credentials["firstName"] . " " . $credentials["lastName"]]);

        $user = User::create([
            "id" => $authorizable->id,
            "firstName" => $credentials["firstName"],
            "lastName" => $credentials["lastName"],
            "email" => $credentials["email"],
            "password" => $credentials["password"],
            "confirmed" => false,
            "confirmationCode" => User::generateRandomString(50)
        ]);

        return $user;
    }

    private static function generateRandomString($length = 10) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }
}
