<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = ['title', 'description', 'image', 'url', 'github', 'order', 'is_visible'];
    protected $casts = ['is_visible' => 'boolean'];
}
