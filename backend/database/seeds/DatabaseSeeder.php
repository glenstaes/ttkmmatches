<?php

use Illuminate\Database\Seeder;

use App\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::newUser(array(
            "firstName"=>"Glen",
            "lastName"=>"Staes",
            "email"=>"staeseke@gmail.com",
            "password"=>Hash::make("test")
        ));
        $this->call(ErrorsSeeder::class);
        $this->call(FederationSeeder::class);
        $this->call(RelationTypeSeeder::class);
    }
}
