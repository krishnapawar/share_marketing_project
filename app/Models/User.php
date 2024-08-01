<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'mobile_number',
        'dob',
        'gender',
        'aadhar_number',
        'pancard_number',
        'alternate_moble_number',
        'address'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function roles(){
        return $this->belongsToMany(Role::class);
    }

    public function hasRole($role){
        return $this->roles()->where('name', $role)->exists();
    }

    public function hasPermission($permission){
        return $this->roles()->whereHas('permissions', function($query) use($permission){
            $query->where('name', $permission);
            })->exists();
    }

    public function orders(){
        return $this->hasMany(Order::class);
    }

    public function loanRequests(){
        return $this->hasMany(LoanRequest::class);
    }

    public function wallet(){
        return $this->hasOne(Wallet::class);
    }
}