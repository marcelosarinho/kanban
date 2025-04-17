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
    Route::post('/save', [ProjectController::class, 'store'])->name('projects.store');
    Route::delete('/{id}', [ProjectController::class, 'destroy'])->name('projects.destroy');
});