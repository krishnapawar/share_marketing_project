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
        'address',
        'show_pass',
        'customer_id',
    ];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($user) {
            if (empty($user->customer_id)) {
                $user->customer_id = self::generateUniqueUserId();
            }
        });

        static::updating(function ($user) {
            if (empty($user->customer_id)) {
                $user->customer_id = self::generateUniqueUserId();
            }
        });
    }


    public static function generateUniqueUserId()
    {
        $prefix = 'FX-';
        $latestId = self::latest('customer_id')->first();
        $latestNumber = $latestId ? (int) substr($latestId->customer_id, 3) : 0;
        $newNumber = str_pad($latestNumber + 1, 4, '0', STR_PAD_LEFT);
        return $prefix . $newNumber;
    }


    public function getShowPassAttribute()
    {
        // Check if the currently logged-in user has role 1
        if (auth()->check() && auth()->user()->role == 1) {
            return $this->attributes['show_pass']; // Return the password
        }

        // If the condition is not met, return null or an empty string
        return null;
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        // 'show_pass',
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

    public function file(){
        return $this->belongsTo(ProjectFile::class);
    }
}
