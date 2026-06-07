<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\AuthController;

Route::get('/profile', [ApiController::class, 'profile']);
Route::get('/skills', [ApiController::class, 'skills']);
Route::get('/projects', [ApiController::class, 'projects']);
Route::get('/experiences', [ApiController::class, 'experiences']);
Route::get('/all', [ApiController::class, 'allData']);
Route::get('/sections', [ApiController::class, 'sections']);

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/check', [AuthController::class, 'check']);
    Route::put('/change-password', [AuthController::class, 'changePassword']);

    Route::get('/sections/manage', [AuthController::class, 'getSections']);
    Route::put('/sections/manage', [AuthController::class, 'updateSections']);
    Route::post('/sections/manage', [AuthController::class, 'storeSection']);
    Route::delete('/sections/manage/{id}', [AuthController::class, 'deleteSection']);

    Route::put('/profile', [ApiController::class, 'updateProfile']);

    Route::post('/skills', [ApiController::class, 'storeSkill']);
    Route::put('/skills/{id}', [ApiController::class, 'updateSkill']);
    Route::delete('/skills/{id}', [ApiController::class, 'deleteSkill']);

    Route::post('/projects', [ApiController::class, 'storeProject']);
    Route::put('/projects/{id}', [ApiController::class, 'updateProject']);
    Route::delete('/projects/{id}', [ApiController::class, 'deleteProject']);

    Route::post('/experiences', [ApiController::class, 'storeExperience']);
    Route::put('/experiences/{id}', [ApiController::class, 'updateExperience']);
    Route::delete('/experiences/{id}', [ApiController::class, 'deleteExperience']);

    Route::post('/educations', [ApiController::class, 'storeEducation']);
    Route::put('/educations/{id}', [ApiController::class, 'updateEducation']);
    Route::delete('/educations/{id}', [ApiController::class, 'deleteEducation']);

    Route::post('/achievements', [ApiController::class, 'storeAchievement']);
    Route::put('/achievements/{id}', [ApiController::class, 'updateAchievement']);
    Route::delete('/achievements/{id}', [ApiController::class, 'deleteAchievement']);

    Route::post('/leaderships', [ApiController::class, 'storeLeadership']);
    Route::put('/leaderships/{id}', [ApiController::class, 'updateLeadership']);
    Route::delete('/leaderships/{id}', [ApiController::class, 'deleteLeadership']);

    Route::post('/publications', [ApiController::class, 'storePublication']);
    Route::put('/publications/{id}', [ApiController::class, 'updatePublication']);
    Route::delete('/publications/{id}', [ApiController::class, 'deletePublication']);

    Route::post('/ai-tools', [ApiController::class, 'storeAITool']);
    Route::put('/ai-tools/{id}', [ApiController::class, 'updateAITool']);
    Route::delete('/ai-tools/{id}', [ApiController::class, 'deleteAITool']);

    Route::post('/ides', [ApiController::class, 'storeIDE']);
    Route::put('/ides/{id}', [ApiController::class, 'updateIDE']);
    Route::delete('/ides/{id}', [ApiController::class, 'deleteIDE']);

    Route::post('/upload', [ApiController::class, 'upload']);
    Route::get('/images', [ApiController::class, 'images']);
});
