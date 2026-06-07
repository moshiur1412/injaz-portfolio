<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    protected $fillable = ['key', 'label', 'is_visible', 'order'];

    protected $casts = [
        'is_visible' => 'boolean',
    ];
}
