<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

 
Route::prefix('/user')->group( function(){
    Route::post('/login', 'api\v1\LoginController@login');  
    Route::middleware('auth:api')->get('/current','api\v1\UserController@current');  
    Route::middleware('auth:api')->get('/users','api\v1\UserController@index');  
    Route::middleware('auth:api')->post('/users/store','api\v1\UserController@store');
    Route::middleware('auth:api')->put('/users/update','api\v1\UserController@update');




});

