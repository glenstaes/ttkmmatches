<?php

use Illuminate\Database\Seeder;

use App\RelationType as RelationType;

class RelationTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        RelationType::create(["name" => "speler"]);
        RelationType::create(["name" => "ouder"]);
        RelationType::create(["name" => "partner"]);
        RelationType::create(["name" => "familielid"]);
        RelationType::create(["name" => "voogd"]);
    }
}
