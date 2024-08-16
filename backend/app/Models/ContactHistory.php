<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactHistory extends Model
{
    use HasFactory;

    protected $table = 'contact_history';

    protected $fillable = [
        'contact_id',
        'timestamp',
        'attribute_changed',
        'attribute_previous_value',
        'attribute_update_value',
    ];
}
