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
        Schema::table('users', function (Blueprint $table) {
            //
            $table->after('email',function() use($table){
                $table->string('mobile_number')->nullable();
                $table->date('dob')->nullable();
                $table->string('gender')->nullable();
                $table->string('aadhar_number')->nullable();
                $table->string('pancard_number')->nullable();
                $table->string('alternate_moble_number')->nullable();
                $table->string('address')->nullable();
                $table->integer('role')->default(0);
            });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
};
