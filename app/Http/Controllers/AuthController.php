<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Section;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        $user = User::where('username', $request->username)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'username' => ['Invalid credentials.'],
            ]);
        }

        $token = $user->createToken('admin-token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => ['name' => $user->name, 'username' => $user->username],
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['success' => true]);
    }

    public function check(Request $request)
    {
        return response()->json([
            'authenticated' => true,
            'user' => ['name' => $request->user()->name, 'username' => $request->user()->username],
        ]);
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|min:6',
        ]);

        $user = $request->user();

        if (!Hash::check($request->current_password, $user->password)) {
            throw ValidationException::withMessages([
                'current_password' => ['Current password is incorrect.'],
            ]);
        }

        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json(['success' => true, 'message' => 'Password changed successfully.']);
    }

    public function getSections()
    {
        return Section::orderBy('order')->get();
    }

    public function updateSections(Request $request)
    {
        $request->validate([
            'sections' => 'required|array',
            'sections.*.id' => 'required|exists:sections,id',
            'sections.*.is_visible' => 'required|boolean',
            'sections.*.order' => 'required|integer|min:0',
            'sections.*.label' => 'required|string|max:255',
        ]);

        foreach ($request->sections as $sectionData) {
            Section::where('id', $sectionData['id'])->update([
                'is_visible' => $sectionData['is_visible'],
                'order' => $sectionData['order'],
                'label' => $sectionData['label'],
            ]);
        }

        return Section::orderBy('order')->get();
    }

    public function storeSection(Request $request)
    {
        $request->validate([
            'key' => 'required|string|max:191|unique:sections,key',
            'label' => 'required|string|max:255',
        ]);

        $maxOrder = Section::max('order') ?? 0;
        $section = Section::create([
            'key' => $request->key,
            'label' => $request->label,
            'is_visible' => true,
            'order' => $maxOrder + 1,
        ]);

        return $section;
    }

    public function deleteSection($id)
    {
        $section = Section::findOrFail($id);
        $section->delete();
        return response()->json(['success' => true]);
    }
}
