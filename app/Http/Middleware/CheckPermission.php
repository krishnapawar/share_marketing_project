<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $permission): Response
    {
        if (!auth()->user()->hasPermission($permission)) {
            return response()->json(
                [
                    'message' => 'You do not have permission to perform this action',
                ],
                Response::HTTP_FORBIDDEN    
            );
        }
        return $next($request);
    }
}
