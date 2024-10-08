<?php

use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::prefix('/projects')->group(function () {
    Route::post('/save', [ProjectController::class, 'store'])->name('projects.store');
});