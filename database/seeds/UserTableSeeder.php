<?php

use Illuminate\Database\Seeder;
use App\User;
class UserTableSeeder extends Seeder
{
    public function run()
    {
        $users= array(
            [
                'name'=>'German Garzon',
                'email'=>'german_garzonto@fet.edu.co',
                'password'=> \Hash::make('123456789')
            ]
            );
        foreach ($users as $user) {
            User::updateOrCreate($user);
        }


    }
}
