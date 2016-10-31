<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateManagedPlayerTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create("managedplayer", function(Blueprint $table) {
            $table->string("playerId");
            $table->integer("userId")->unsigned();
            $table->integer("relationTypeId")->unsigned();
            $table->timestamps();

            $table->foreign("playerId")->references("uniqueIndex")->on("player")->onDelete("cascade");
            $table->foreign("userId")->references("id")->on("user")->onDelete("cascade");
            $table->foreign("relationTypeId")->references("id")->on("relationtype")->onDelete("restrict");

            $table->primary(["playerId", "userId", "relationTypeId"]);
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
