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
        Schema::table('orders', function (Blueprint $table) {
            //
            $table->after('qty',function() use($table){
                $table->decimal('selling_amount', 15, 2)->default(0);
                $table->decimal('profit_loss_amount', 15, 2)->default(0);
                $table->enum('profit_loss_status',['pending','profit','loss'])->default('pending');
                $table->timestamp('selling_at')->nullable();
            });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            //
            $table->dropColumn(['selling_amount','profit_loss_amount','profit_loss_status','selling_at']);
        });
    }
};
