<?php

namespace App\Http\Controllers;

class AuthController extends Controller
{
   public function __construct(  )  {
   }

   function getAuth( ) {
      return response()->json([
         '_token'  => csrf_token(),
         'auth'    => auth()->user(),
         'isAuth'  => auth()->guard()->check(),
         'noAuth'  =>!auth()->guard()->check(),
         'appName' => config('app.name', 'Laravel'),
      ]);
   }

   function isAuth( ) {
      $this->middleware('auth');
      return view('welcome');
   }

   function noAuth( ) {
      return view('welcome');
   }
}
