<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsergroupchildTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create("groupchild", function(Blueprint $table){
            $table->integer("groupId")->unsigned();
            $table->integer("authorizableId")->unsigned();

            $table->foreign("groupId")->references("id")->on("group")->onDelete("cascade");
            $table->foreign("authorizableId")->references("id")->on("authorizable")->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop("groupchild");
    }
}
