<?php

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
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->integer('business_id')->nullable();
            $table->integer('sub_cate_id')->nullable();
            $table->string('name');
            $table->string('slug')->nullable()->unique();
            $table->string('description')->nullable();
            $table->integer('media')->nullable();
            $table->decimal('price',10,2)->default(0);
            $table->enum('type',['sub','cate'])->default('cate');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
