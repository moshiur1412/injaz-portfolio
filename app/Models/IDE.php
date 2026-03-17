<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IDE extends Model
{
    protected $table = 'ides';
    protected $fillable = ['name', 'description', 'icon', 'order'];
}
