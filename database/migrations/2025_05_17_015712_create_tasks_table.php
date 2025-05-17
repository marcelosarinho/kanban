<?php

use App\Constants\PriorityConstant;
use App\Constants\StatusConstant;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description');
            $table->enum('priority', [
                PriorityConstant::LOW, # Enum de 'Baixa'
                PriorityConstant::MEDIUM, # Enum de 'Média'
                PriorityConstant::HIGH, # Enum de 'Alta'
            ]);
            $table->string('category')->nullable();
            $table->float('progress')->default(0);
            $table->string('commentary')->nullable();
            $table->unsignedBigInteger('project_id');
            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');
            $table->string('color')->nullable();
            $table->boolean('done')->default(false);
            $table->enum('status', [
                StatusConstant::TODO, # Enum de 'A fazer'
                StatusConstant::IN_PROGRESS, # Enum de 'Em andamento'
                StatusConstant::TESTING, # Enum de 'Em teste'
                StatusConstant::IMPLEMENTED, # Enum de 'Implementado'
            ]);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
