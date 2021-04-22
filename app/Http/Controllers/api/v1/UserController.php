<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use Auth;

class UserController extends Controller
{
    //
    public function current(){
        return Auth::user();
    }
    public function index(){
        $users =User::all();
        return[
            'users'=>$users
        ];
    }
    public function store(Request $request){
        $messages = [
            'email.unique' => 'Este correo ya existe'
        ];
        $this->validate(request(), [
            'email' => ['required', 'max:100', 'unique:Users'],
            'name'=>['required', 'max:100'],
            'password'=>['required', 'max:100'],

        ], $messages);
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = \Hash::make($request->password);
        $user->save();
        return response()->json(['user' => $user]);

    }
}
