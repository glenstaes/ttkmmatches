<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\TabTConnection;

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

    public static function getTabTData($seasonName){
        $connection = new TabTConnection();

        // Get the teams

        /***** Get the members *****/
        $vttlRequest = array("Club" => "A141", "Season" => intval(substr($seasonName, -2)));
        $sportaRequest = array("Club" => "1252", "Season" => intval(substr($seasonName, -2)));

        // Get the matches

        $response = app("stdClass");
        $response->members = $connection->invoke("GetMembers", $vttlRequest, $sportaRequest);

        return $response;
    }
}
