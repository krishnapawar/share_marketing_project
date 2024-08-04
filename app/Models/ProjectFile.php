<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class ProjectFile extends Model
{
    use HasFactory;

    protected $guarded=[];

    protected function name(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => url("storage/".$value),
        );
    }
}
