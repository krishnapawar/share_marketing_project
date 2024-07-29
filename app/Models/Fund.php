<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fund extends Model
{
    use HasFactory;

    protected $primaryKey = 'fund_id';
    public $incrementing = true;
    protected $guarded=[];

    public function user()
    {
        return $this->belongsTo(User::class, 'fund_user_id');
    }
}
