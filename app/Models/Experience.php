<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    protected $fillable = ['company', 'position', 'start_date', 'end_date', 'is_current', 'description', 'order'];
    protected $casts = ['is_current' => 'boolean', 'start_date' => 'date', 'end_date' => 'date'];
}
