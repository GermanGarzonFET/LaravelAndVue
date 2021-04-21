<?php

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    public function run()
    {
        $users= array(
            [
                'name'=>'garzon',
                'email'=>'germangarzonto@fet.edu.co',
                'password'=>\Hash:make('123456789')
            ]
            );

            foreach ($users as $user) {
                
            }
    }
}
