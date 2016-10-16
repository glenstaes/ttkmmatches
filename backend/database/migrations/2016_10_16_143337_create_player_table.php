<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePlayerTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create("player", function(Blueprint $table) {
            $table->increments("id");
            $table->string("uniqueIndex");
            $table->integer("position");
            $table->integer("rankingIndex");
            $table->string("firstName");
            $table->string("lastName");
            $table->string("ranking");
            $table->string("email");
            $table->string("phone");
            $table->integer("federationId")->unsigned();
            $table->integer("seasonId")->unsigned();
            $table->timestamps();

            $table->foreign("federationId")->references("id")->on("federation")->onDelete("cascade");
            $table->foreign("seasonId")->references("id")->on("season")->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop("player");
    }
}
