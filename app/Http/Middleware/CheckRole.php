<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $role): Response
    {
        
        if(((auth()->user()->role != $role && auth()->user()->role != 1) || auth()->user()->status !='actived' ) && $role!=1)
        {
            if(auth()->user()->status == 'cancelled'){
                return response()->json(['message' => 'Your account has been Dispproved by Admin'], 403);
            }
            if(auth()->user()->status == 'pending'){
                return response()->json(['message' => 'Your account is pending for approval by Admin'],403);
            }
            

            return response()->json([
                'message' => 'Unauthorized'
                ], 401);
        }
        if(auth()->user()->role!=$role && $role==1)
        {
            auth()->logout();
            abort(401,'Unauthorized');
        }
        return $next($request);
    }
}
