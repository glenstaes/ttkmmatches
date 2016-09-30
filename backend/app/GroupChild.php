<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GroupChild extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['groupId', 'authorizableId'];

    /**
     * The attributes that are hidden.
     *
     * @var array
     */
    protected $hidden = [];

    // The table
    protected $table = "groupchild";
}
