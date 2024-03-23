<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($player_id)
    {
        $reviews = Review::where('team_id',$player_id)->get();

        return response()->json($reviews);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            "rating" => "required",
            "team_id" => "required",
        ]);
    
        // レビューを作成
        $review = Review::create([
            "rating" => $validatedData["rating"],
            "team_id" => $validatedData["team_id"]
        ]);
    
        // 同じplayer_idを持つすべてのレビューを取得
        // $reviews = Review::where("team_id", $validatedData["team_id"])->get();
        // $reviews = Review::all();
    
        // レスポンスとして作成したレビューと取得したレビューを返す
        // return response()->json([
        //     'createdReview' => $review,
        //     'allReviewsForPlayer' => $reviews
        // ]);
        return response()->json($review);
    }
    

    /**
     * Display the specified resource.
     */
    public function show(Review $review)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Review $review)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Review $review)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Review $review)
    {
        //
    }
}
