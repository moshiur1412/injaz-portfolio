<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AITool extends Model
{
    protected $table = 'ai_tools';
    protected $fillable = ['name', 'description', 'url', 'order'];
}
