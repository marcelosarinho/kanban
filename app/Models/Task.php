<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'priority',
        'category',
        'progress',
        'commentary',
        'project_id',
        'color',
        'done',
        'status',
    ];

    public function projects() {
        return $this->belongsTo(Project::class);
    }

    public function subtasks() {
        return $this->hasMany(SubTask::class);
    }
}
