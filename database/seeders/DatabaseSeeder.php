<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Section;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        User::updateOrCreate(
            ['username' => 'admin'],
            [
                'name' => 'Admin',
                'username' => 'admin',
                'email' => 'admin@example.com',
                'password' => Hash::make('admin123'),
            ]
        );

        $sections = [
            ['key' => 'hero', 'label' => 'Hero', 'order' => 1],
            ['key' => 'stats', 'label' => 'Stats', 'order' => 2],
            ['key' => 'education', 'label' => 'Education', 'order' => 3],
            ['key' => 'achievements', 'label' => 'Achievements', 'order' => 4],
            ['key' => 'skills', 'label' => 'Skills', 'order' => 5],
            ['key' => 'ai_tools', 'label' => 'AI Tools', 'order' => 6],
            ['key' => 'ides', 'label' => 'IDEs & Tools', 'order' => 7],
            ['key' => 'projects', 'label' => 'Projects', 'order' => 8],
            ['key' => 'leadership', 'label' => 'Leadership', 'order' => 9],
            ['key' => 'publications', 'label' => 'Publications', 'order' => 10],
            ['key' => 'contact', 'label' => 'Contact', 'order' => 11],
        ];

        foreach ($sections as $section) {
            Section::updateOrCreate(
                ['key' => $section['key']],
                $section
            );
        }
    }
}
