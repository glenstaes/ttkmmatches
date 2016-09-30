<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAuthorizableTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create("authorizable", function(Blueprint $table){
            $table->increments("id");
            $table->string("name", 511);
            $table->timestamps();
        });

        Schema::table("user", function($table){
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
        Schema::table("user", function($table){
            $table->dropForeign("user_authorizable_id_foreign");
        });

        Schema::drop("authorizable");
    }
}
