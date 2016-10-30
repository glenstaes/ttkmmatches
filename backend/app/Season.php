<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Season extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name'
    ];

    /**
     * The attributes that are hidden.
     *
     * @var array
     */
    protected $hidden = [];

    // The table
    protected $table = "season";

    public static function getCurrent(){
        $current = Season::where("current", "=", "1")->get();

        if($current->isEmpty())
            return null;
        else
            return $current[0];
    }
}
