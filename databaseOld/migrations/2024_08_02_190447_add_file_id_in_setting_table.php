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
        Schema::table('settings', function (Blueprint $table) {
            //
            $table->bigInteger('file_id')->nullable()->after('id');
        });
        Schema::table('users', function (Blueprint $table) {
            //
            $table->bigInteger('file_id')->nullable()->after('id');
            $table->dropColumn('profile_image');
        });
        Schema::table('transactions', function (Blueprint $table) {
            //
            $table->bigInteger('file_id')->nullable()->after('id');
            $table->dropColumn('screenshot');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('settings', function (Blueprint $table) {
            //
            $table->dropColumn('file_id');
        });
        Schema::table('users', function (Blueprint $table) {
            //
            $table->dropColumn('file_id');
        });
        Schema::table('transactions', function (Blueprint $table) {
                //
            $table->dropColumn('file_id');
        });
    }
};
