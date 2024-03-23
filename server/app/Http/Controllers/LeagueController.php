<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LeagueController extends Controller
{
    public function store(Request $request)
    {
        $comment=$request->input("content");
        $validatedData=$request->validate([
            "content"=>"required|string|max:200",
            "review_id"=>"required|integer|exists:reviews,id",
        ]);
        $comment=Comment::create([
            "content"=>$validatedData["content"],
            "review_id"=>$validatedData["review_id"],
            "user_id"=>Auth::id(),
        ]);
        $comment->load("user");
        return response()->json($comment);
    }
}
