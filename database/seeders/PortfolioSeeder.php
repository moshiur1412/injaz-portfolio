<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Profile;
use App\Models\Skill;
use App\Models\Project;
use App\Models\Experience;
use App\Models\Education;
use App\Models\Achievement;
use App\Models\Leadership;
use App\Models\Publication;
use App\Models\AITool;
use App\Models\IDE;

class PortfolioSeeder extends Seeder
{
    public function run()
    {
        Profile::updateOrCreate(
            ['id' => 1],
            [
                'name' => 'Moshiur Rahman',
                'title' => 'Senior Software Engineer',
                'bio' => 'Architecting robust web solutions with precise code and scalable infrastructure. Specializing in Laravel, PHP, and Cloud Technologies. A passionate developer focused on clean architecture, test-driven development, and building solutions that drive business growth.',
                'email' => 'moshiur@example.com',
                'phone' => '+880 1XX XXXX XXXX',
                'location' => 'Dhaka, Bangladesh',
                'github' => 'https://github.com/moshiur1214',
                'linkedin' => 'https://linkedin.com/in/moshiur1214',
                'twitter' => 'https://twitter.com/moshiur1214',
                'years_experience' => '5+',
                'happy_clients' => '20+',
            ]
        );

        Skill::truncate();
        $skills = [
            ['name' => 'PHP 8.x', 'category' => 'Backend', 'level' => 5, 'order' => 1],
            ['name' => 'Laravel', 'category' => 'Backend', 'level' => 5, 'order' => 2],
            ['name' => 'Node.js', 'category' => 'Backend', 'level' => 4, 'order' => 3],
            ['name' => 'RESTful APIs', 'category' => 'Backend', 'level' => 5, 'order' => 4],
            ['name' => 'Microservices', 'category' => 'Backend', 'level' => 4, 'order' => 5],
            ['name' => 'System Design', 'category' => 'Backend', 'level' => 4, 'order' => 6],
            
            ['name' => 'MySQL', 'category' => 'Database', 'level' => 5, 'order' => 7],
            ['name' => 'PostgreSQL', 'category' => 'Database', 'level' => 4, 'order' => 8],
            ['name' => 'Redis', 'category' => 'Database', 'level' => 4, 'order' => 9],
            ['name' => 'MongoDB', 'category' => 'Database', 'level' => 3, 'order' => 10],
            
            ['name' => 'React', 'category' => 'Frontend', 'level' => 4, 'order' => 11],
            ['name' => 'Vue.js', 'category' => 'Frontend', 'level' => 3, 'order' => 12],
            ['name' => 'JavaScript', 'category' => 'Frontend', 'level' => 4, 'order' => 13],
            ['name' => 'Tailwind CSS', 'category' => 'Frontend', 'level' => 4, 'order' => 14],
            
            ['name' => 'AWS', 'category' => 'DevOps', 'level' => 4, 'order' => 15],
            ['name' => 'Docker', 'category' => 'DevOps', 'level' => 4, 'order' => 16],
            ['name' => 'Git', 'category' => 'DevOps', 'level' => 5, 'order' => 17],
            ['name' => 'CI/CD', 'category' => 'DevOps', 'level' => 4, 'order' => 18],
        ];
        
        foreach ($skills as $skill) {
            Skill::create($skill);
        }

        Project::truncate();
        $projects = [
            [
                'title' => 'E-commerce Platform',
                'description' => 'A comprehensive e-commerce solution with payment gateway, inventory management, and CRM features.',
                'url' => '#',
                'github' => '#',
                'order' => 1,
                'is_visible' => true,
            ],
            [
                'title' => 'ERP Billing System',
                'description' => 'A comprehensive ERP Billing System for telecom company using Laravel, MySQL, Redis, and AWS.',
                'url' => '#',
                'github' => '#',
                'order' => 2,
                'is_visible' => true,
            ],
            [
                'title' => 'Real Estate Portal',
                'description' => 'A comprehensive real-estate listing and property services platform for buying, selling, and renting properties.',
                'url' => '#',
                'github' => '#',
                'order' => 3,
                'is_visible' => true,
            ],
            [
                'title' => 'Analytics Dashboard',
                'description' => 'Real-time analytics dashboard processing and visualizing data from multiple sources.',
                'url' => '#',
                'github' => '#',
                'order' => 4,
                'is_visible' => true,
            ],
        ];
        
        foreach ($projects as $project) {
            Project::create($project);
        }

        Experience::truncate();
        $experiences = [
            [
                'company' => 'Tech Company',
                'position' => 'Senior Software Engineer',
                'start_date' => '2022-01-01',
                'end_date' => null,
                'is_current' => true,
                'description' => 'Leading backend development, optimizing databases for millions of records, and building microservices.',
                'order' => 1,
            ],
            [
                'company' => 'Startup Inc',
                'position' => 'Full Stack Developer',
                'start_date' => '2019-06-01',
                'end_date' => '2021-12-31',
                'is_current' => false,
                'description' => 'Built scalable web applications using Laravel and Vue.js.',
                'order' => 2,
            ],
            [
                'company' => 'Web Agency',
                'position' => 'Junior Developer',
                'start_date' => '2018-01-01',
                'end_date' => '2019-05-31',
                'is_current' => false,
                'description' => 'Developed responsive websites and e-commerce solutions.',
                'order' => 3,
            ],
        ];
        
        foreach ($experiences as $exp) {
            Experience::create($exp);
        }

        Education::truncate();
        $educations = [
            ['degree' => 'B.Sc. in Business Information Technology', 'institution' => 'University of Greenwich, UK', 'result' => '1st Class', 'year' => 2017, 'order' => 1],
            ['degree' => 'Agile Workshop', 'institution' => 'Daffodil Institute of IT', 'result' => 'Certificate', 'year' => 2015, 'order' => 2],
            ['degree' => 'PHP & MySQL Course', 'institution' => 'A&A Smart Web', 'result' => 'Certificate', 'year' => 2007, 'order' => 3],
        ];
        
        foreach ($educations as $edu) {
            Education::create($edu);
        }

        Achievement::truncate();
        $achievements = [
            ['title' => 'Best Employee', 'description' => 'Contributions in New Business Idea and Work Performance', 'category' => 'Award', 'order' => 1],
            ['title' => 'Best Employee', 'description' => 'Work Performance', 'category' => 'Award', 'order' => 2],
            ['title' => 'Winner', 'description' => 'DIA Programming Contest, DIIT', 'category' => 'Contest', 'order' => 3],
            ['title' => 'Champion', 'description' => 'Debate Championship, High School', 'category' => 'Achievement', 'order' => 4],
        ];
        
        foreach ($achievements as $achievement) {
            Achievement::create($achievement);
        }

        Leadership::truncate();
        $leaderships = [
            ['title' => 'Organized workshops with DU Computer & Programming Club', 'organization' => 'University of Dhaka', 'description' => 'Technical workshops and coding sessions for students.', 'order' => 1],
            ['title' => 'Participated in programming contests', 'organization' => 'Various', 'description' => 'Active participant in national level programming competitions.', 'order' => 2],
            ['title' => 'Social initiatives volunteer', 'organization' => 'Community', 'description' => 'Volunteered in various social welfare programs.', 'order' => 3],
        ];
        
        foreach ($leaderships as $leadership) {
            Leadership::create($leadership);
        }

        Publication::truncate();
        $publications = [
            ['title' => 'Blog', 'url' => 'https://medium.com/@moshiur1412', 'type' => 'Blog', 'order' => 1],
            ['title' => 'GitHub Profile', 'url' => 'https://github.com/moshiur1214', 'type' => 'Profile', 'order' => 2],
            ['title' => 'HackerRank Solutions', 'url' => 'https://hackerrank.com/moshiur1412', 'type' => 'Profile', 'order' => 3],
        ];
        
        foreach ($publications as $publication) {
            Publication::create($publication);
        }

        AITool::truncate();
        $aiTools = [
            ['name' => 'ChatGPT', 'description' => 'Code assistance, debugging, and documentation', 'order' => 1],
            ['name' => 'GitHub Copilot', 'description' => 'AI-powered code completion and suggestions', 'order' => 2],
            ['name' => 'Claude', 'description' => 'Code review and refactoring assistance', 'order' => 3],
            ['name' => 'Midjourney', 'description' => 'Design assets and UI mockups', 'order' => 4],
            ['name' => 'Perplexity', 'description' => 'Research and technical documentation', 'order' => 5],
        ];
        
        foreach ($aiTools as $tool) {
            AITool::create($tool);
        }

        IDE::truncate();
        $ides = [
            ['name' => 'VS Code', 'description' => 'Primary code editor', 'icon' => '💜', 'order' => 1],
            ['name' => 'Ollama', 'description' => 'Local LLM', 'icon' => '🦙', 'order' => 2],
            ['name' => 'Antigravity', 'description' => 'AI coding assistant', 'icon' => '🚀', 'order' => 3],
            ['name' => 'Cursor', 'description' => 'AI-powered IDE', 'icon' => '💫', 'order' => 4],
            ['name' => 'Trea', 'description' => 'AI developer', 'icon' => '🌳', 'order' => 5],
            ['name' => 'OpenCode', 'description' => 'AI IDE', 'icon' => '⚡', 'order' => 6],
        ];
        
        foreach ($ides as $ide) {
            IDE::create($ide);
        }
    }
}
