<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $fillable = [
        'name','price','description',
        'media'
    ];
    public function file(){
        return $this->belongsTo(ProjectFile::class,"media");
    }
}
