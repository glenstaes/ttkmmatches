<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsergroupTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create("group", function(Blueprint $table){
            $table->increments("id");
            $table->string("name", 255);
            $table->timestamps();

            $table->foreign("id")->references("id")->on("authorizable")->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop("group");
    }
}
