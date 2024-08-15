<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Contacts extends Model
{
    use HasFactory;

    // Specify the table associated with the model
    protected $table = 'contacts';

    // Specify which columns can be mass-assigned
    protected $fillable = ['first_name', 'last_name', 'email', 'phone'];
    
    // Optionally, you can specify the primary key if it's different from the default 'id'
    protected $primaryKey = 'contact_id';

    // If the table doesn't use timestamps (created_at and updated_at), set this to false
    public $timestamps = false;

    // Add any relationships or additional methods here, if needed
}