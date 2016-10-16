<?php

use Illuminate\Database\Seeder;

use App\Federation as Federation;

class FederationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Federation::create(["name" => "VTTL"]);
        Federation::create(["name" => "Sporta"]);
    }
}
