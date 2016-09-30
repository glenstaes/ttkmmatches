<?php

use App\Error as Error;

use Illuminate\Database\Seeder;

class ErrorsSeeder extends Seeder
{
    /**
     * Fills the database with error messages
     *
     * @return void
     */
    public function run()
    {
        // Authentication error codes
        // Signing up
        Error::create(["code" => "JUNO-AUTH-00001", "message" => "The email field has not been set"]);
        Error::create(["code" => "JUNO-AUTH-00002", "message" => "The password field has not been set"]);
        Error::create(["code" => "JUNO-AUTH-00003", "message" => "The firstName field has not been set"]);
        Error::create(["code" => "JUNO-AUTH-00004", "message" => "The lastName field has not been set"]);
        Error::create(["code" => "JUNO-AUTH-00005", "message" => "A user with this email already exists"]);
        Error::create(["code" => "JUNO-AUTH-00006", "message" => "User already exists"]);
        
        // Logging in
        Error::create(["code" => "JUNO-AUTH-00101", "message" => "Invalid credentials"]);
    }
}
