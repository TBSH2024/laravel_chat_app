<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ChatRoomController;

Route::get('/', [ChatRoomController::class, 'index'])
->name('chatRooms.index');
Route::post('store', [ChatRoomController::class, 'store'])
->name('chatRoom.store');
Route::get('show/{chatRoom}', [ChatRoomController::class, 'show'])
->name('show');
Route::post('messages', [MessageController::class, 'store'])
->name('message.store');
Route::get('messages/{chatRoomId}', [MessageController::class, 'index'])
->name('messages.index');