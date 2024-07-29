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
        Schema::table('loan_requests', function (Blueprint $table) {
            //
            $table->foreignId('wallet_id')->after('user_id')->nullable()->constrained()->onDelete('cascade');
            $table->text('remark')->after('user_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('loan_requests', function (Blueprint $table) {
            //
            $table->dropForeign('loan_requests_wallet_id_foreign');
            $table->dropColumn('wallet_id');
            $table->dropColumn('remark');
        });
    }
};
