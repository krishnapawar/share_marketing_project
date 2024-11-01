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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->string('screenshot')->nullable();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('wallet_id')->nullable()->constrained()->onDelete('cascade');
            $table->decimal('amount', 15, 2);
            $table->decimal('remaininng_amount', 15, 2);
            $table->enum('type', ['addFund', 'withdrawal']);
            $table->enum('status', ['approve', 'disapprove','pending'])->default('pending');
            $table->text('remark')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
