<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ExampleTest extends TestCase
{
    /**
     * A basic functional test example.
     *
     * @return void
     */
    public function testBasicExample()
    {
        $this->json("POST", "/signup", [
            "firstName"=>"Glen",
            "lastName"=>"Staes",
            "email"=>"glen.staes@junosolutions.be",
            "password"=>"testpassword"
        ])->seeJsonStructure(["token"]);
    }
}
