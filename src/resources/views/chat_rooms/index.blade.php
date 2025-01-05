@extends('layouts.app')

@section('title', 'チャットアプリ -TOP')

@section('content')
<div class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-col text-center w-full mb-20">
      <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">チャットルーム一覧</h1>
    </div>
    <form action="{{ route('chatRoom.store') }}" method="POST">
      @csrf
      <div class="lg:mt-8 flex flex-col items-center gap-2 sm:flex-row sm:gap-3 justify-center">
        <div class="p-2 lg:w-1/3 md:w-1/2 w-1/2">
          <input type="text" name="name" class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="ルーム名を入力してください">
        </div>
        <button class="w-full sm:w-auto whitespace-nowrap py-3 px-2 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">ルームを作成する</button>
      </div>
    </form>
    @foreach ($chatRooms as $chatRoom)
    <div class="flex flex-wrap -m-2 justify-center">
      <div class="p-2 lg:w-1/3 md:w-1/2 w-1/2">
        <div class="h-full flex items-center border-gray-200 border p-4 rounded-lg">
          <div class="flex-grow">
            <h2 class="text-gray-900 title-font font-medium">{{ $chatRoom->name }}</h2>
            <p class="text-gray-500">作成日: {{ $chatRoom->created_at }}</p>
          </div>
          <div class="ml-auto">
            <form action="{{ route('show', ['chatRoom' => $chatRoom->id]) }}" method="GET">
              <button class="sm:w-auto whitespace-nowrap py-3 px-2 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-pink-600 text-white hover:bg-pink-700 focus:outline-none focus:bg-pink-700 disabled:opacity-50 disabled:pointer-events-none" type="submit">入室する</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    @endforeach
  </div>
</div>
@if ($chatRooms->isEmpty())
  <p class="text-center">チャットルームがありません</p>
@endif
@endsection
