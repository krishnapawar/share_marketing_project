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
            $table->after('role',function() use($table){
                $table->enum('status',['pending','actived','cancelled','deactived'])->default('pending');
                $table->string('bank_name')->nullable();
                $table->string('bank_branch_name')->nullable();
                $table->string('bank_ifc_code')->nullable();
                $table->string('bank_account_no')->nullable();
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
            $table->dropColumn(['status','bank_name','bank_branch_name','bank_ifc_code','bank_account_no']);

        });
    }
};
