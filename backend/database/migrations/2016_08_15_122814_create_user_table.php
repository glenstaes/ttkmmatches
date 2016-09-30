<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create("user", function(Blueprint $table){
            $table->increments("id");
            $table->string("firstName",255);
            $table->string("lastName",255);
            $table->string("email",511);
            $table->text("password");
            $table->boolean("confirmed");
            $table->string("confirmationCode", 255);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists("user");
    }
}
