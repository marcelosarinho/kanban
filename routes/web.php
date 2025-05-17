<?php

use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::prefix('/')->group(function () {
    Route::get('/', [ProjectController::class, 'index'])->name('projects.index');
});

Route::prefix('/projects')->group(function () {
    Route::get('/{project}', [ProjectController::class, 'show'])->name('projects.show');
    Route::post('/save', [ProjectController::class, 'store'])->name('projects.store');
    Route::delete('/{project}', [ProjectController::class, 'destroy'])->name('projects.destroy');
});