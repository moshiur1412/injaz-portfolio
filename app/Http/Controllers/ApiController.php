<?php

namespace App\Http\Controllers;

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
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function profile()
    {
        return Profile::first() ?? new Profile();
    }

    public function skills()
    {
        return Skill::orderBy('order')->get();
    }

    public function projects()
    {
        return Project::where('is_visible', true)->orderBy('order')->get();
    }

    public function experiences()
    {
        return Experience::orderBy('start_date', 'desc')->get();
    }

    public function allData()
    {
        return response()->json([
            'profile' => Profile::first(),
            'skills' => Skill::orderBy('order')->get(),
            'projects' => Project::orderBy('order')->get(),
            'experiences' => Experience::orderBy('order')->get(),
            'educations' => Education::orderBy('order')->get(),
            'achievements' => Achievement::orderBy('order')->get(),
            'leaderships' => Leadership::orderBy('order')->get(),
            'publications' => Publication::orderBy('order')->get(),
            'ai_tools' => AITool::orderBy('order')->get(),
            'ides' => IDE::orderBy('order')->get(),
        ]);
    }

    public function updateProfile(Request $request)
    {
        $profile = Profile::first();
        if (!$profile) {
            $profile = new Profile();
        }
        $profile->fill($request->all())->save();
        return $profile;
    }

    // Skills
    public function storeSkill(Request $request)
    {
        $skill = Skill::create($request->all());
        return $skill;
    }

    public function updateSkill(Request $request, $id)
    {
        $skill = Skill::findOrFail($id);
        $skill->update($request->all());
        return $skill;
    }

    public function deleteSkill($id)
    {
        Skill::findOrFail($id)->delete();
        return response()->json(['success' => true]);
    }

    // Projects
    public function storeProject(Request $request)
    {
        $project = Project::create($request->all());
        return $project;
    }

    public function updateProject(Request $request, $id)
    {
        $project = Project::findOrFail($id);
        $project->update($request->all());
        return $project;
    }

    public function deleteProject($id)
    {
        Project::findOrFail($id)->delete();
        return response()->json(['success' => true]);
    }

    // Experiences
    public function storeExperience(Request $request)
    {
        $experience = Experience::create($request->all());
        return $experience;
    }

    public function updateExperience(Request $request, $id)
    {
        $experience = Experience::findOrFail($id);
        $experience->update($request->all());
        return $experience;
    }

    public function deleteExperience($id)
    {
        Experience::findOrFail($id)->delete();
        return response()->json(['success' => true]);
    }

    // Education
    public function storeEducation(Request $request)
    {
        $education = Education::create($request->all());
        return $education;
    }

    public function updateEducation(Request $request, $id)
    {
        $education = Education::findOrFail($id);
        $education->update($request->all());
        return $education;
    }

    public function deleteEducation($id)
    {
        Education::findOrFail($id)->delete();
        return response()->json(['success' => true]);
    }

    // Achievements
    public function storeAchievement(Request $request)
    {
        $achievement = Achievement::create($request->all());
        return $achievement;
    }

    public function updateAchievement(Request $request, $id)
    {
        $achievement = Achievement::findOrFail($id);
        $achievement->update($request->all());
        return $achievement;
    }

    public function deleteAchievement($id)
    {
        Achievement::findOrFail($id)->delete();
        return response()->json(['success' => true]);
    }

    // Leadership
    public function storeLeadership(Request $request)
    {
        $leadership = Leadership::create($request->all());
        return $leadership;
    }

    public function updateLeadership(Request $request, $id)
    {
        $leadership = Leadership::findOrFail($id);
        $leadership->update($request->all());
        return $leadership;
    }

    public function deleteLeadership($id)
    {
        Leadership::findOrFail($id)->delete();
        return response()->json(['success' => true]);
    }

    // Publications
    public function storePublication(Request $request)
    {
        $publication = Publication::create($request->all());
        return $publication;
    }

    public function updatePublication(Request $request, $id)
    {
        $publication = Publication::findOrFail($id);
        $publication->update($request->all());
        return $publication;
    }

    public function deletePublication($id)
    {
        Publication::findOrFail($id)->delete();
        return response()->json(['success' => true]);
    }

    // AI Tools
    public function storeAITool(Request $request)
    {
        $aiTool = AITool::create($request->all());
        return $aiTool;
    }

    public function updateAITool(Request $request, $id)
    {
        $aiTool = AITool::findOrFail($id);
        $aiTool->update($request->all());
        return $aiTool;
    }

    public function deleteAITool($id)
    {
        AITool::findOrFail($id)->delete();
        return response()->json(['success' => true]);
    }

    // Image Upload
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|image|mimes:jpeg,png,jpg,gif,webp,svg|max:2048',
        ], [
            'file.required' => 'Please select a file to upload.',
            'file.image' => 'The file must be an image (jpeg, png, jpg, gif, webp or svg).',
            'file.mimes' => 'Only jpeg, png, jpg, gif, webp and svg image types are allowed.',
            'file.max' => 'The image size must be less than 2MB.',
        ]);

        $file = $request->file('file');
        $extension = $file->getClientOriginalExtension();
        $filename = uniqid() . '_' . bin2hex(random_bytes(8)) . '.' . $extension;
        $path = $file->storeAs('uploads', $filename, 'public');

        return response()->json([
            'url' => asset('storage/uploads/' . $filename),
            'path' => $path,
            'filename' => $filename
        ]);
    }

    public function images()
    {
        $path = storage_path('app/public/uploads');
        $files = [];
        if (is_dir($path)) {
            foreach (scandir($path) as $file) {
                if ($file !== '.' && $file !== '..') {
                    $files[] = [
                        'name' => $file,
                        'url' => asset('storage/uploads/' . $file)
                    ];
                }
            }
        }
        return $files;
    }

    // IDEs
    public function storeIDE(Request $request)
    {
        $ide = IDE::create($request->all());
        return $ide;
    }

    public function updateIDE(Request $request, $id)
    {
        $ide = IDE::findOrFail($id);
        $ide->update($request->all());
        return $ide;
    }

    public function deleteIDE($id)
    {
        IDE::findOrFail($id)->delete();
        return response()->json(['success' => true]);
    }
}
