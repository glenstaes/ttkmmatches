<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(ErrorsSeeder::class);
        $this->call(FederationSeeder::class);
        $this->call(RelationTypeSeeder::class);
    }
}
