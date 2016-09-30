<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Error extends Model
{
    // The table
    protected $table = "error";
    
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at', 'updated_at', 'id',
    ];
    
    public static function getByCode($code){
        return (object) array("error" => Error::where("code", $code)->firstOrFail());
    }
}
