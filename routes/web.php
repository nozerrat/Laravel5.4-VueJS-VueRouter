<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/',                      'AuthController@noAuth');
Route::get('/login',                 'AuthController@noAuth')->name('login');
Route::get('/register',              'AuthController@noAuth')->name('register');
Route::get('/password/reset',        'AuthController@noAuth')->name('password.request');
Route::get('/password/reset/{token}','AuthController@noAuth')->name('password.reset');

Route::get('/app',                   'AuthController@isAuth');
Route::get('/home',                  'AuthController@isAuth');
Route::get('/perfil',                'AuthController@isAuth');


Route::post('/auth',                 'AuthController@getAuth');


// Authentication Routes...
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout')->name('logout');

// Registration Routes...
Route::post('register', 'Auth\RegisterController@register');

// Password Reset Routes...
Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('password.email');
Route::post('password/reset', 'Auth\ResetPasswordController@reset');


Route::middleware(['auth'])->group(function() {
});


Route::get('/{any}', function($any) {
  	return redirect( '/' );
})->where('any', '.*');

