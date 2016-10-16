<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ManagedPlayer extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'playerId', 'userId', 'relationTypeId'
    ];

    /**
     * The attributes that are hidden.
     *
     * @var array
     */
    protected $hidden = [];

    // The table
    protected $table = "managedplayer";
}
