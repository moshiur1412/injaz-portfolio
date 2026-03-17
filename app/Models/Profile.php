<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'name', 'title', 'bio', 'email', 'phone', 'location',
        'avatar', 'github', 'linkedin', 'twitter', 'resume_url',
        'years_experience', 'happy_clients'
    ];
}
