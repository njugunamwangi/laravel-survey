<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\SurveyAnswerResource;
use App\Http\Resources\SurveyDashboardResource;
use App\Models\Survey;
use App\Models\SurveyAnswer;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request) {

        $user = $request->user();

        $baseQuery = Survey::query()->where('user_id', $user->id);

        // Total number of user's surveys
        $total = $baseQuery
            ->count();

        // Latest survey
        $latest = $baseQuery
            ->latest('created_at')
            ->first();

        // Total number of answers
        $totalAnswers = SurveyAnswer::query()
            ->join('surveys', 'survey_answers.survey_id', '=', 'surveys.id')
            ->where('surveys.user_id', $user->id)
            ->count();

        // 5 latest answers
        $latestAnswers = SurveyAnswer::query()
            ->join('surveys', 'survey_answers.survey_id', '=', 'surveys.id')
            ->where('surveys.user_id', $user->id)
            ->orderBy('end_date', 'desc')
            ->limit(5)
            ->getModels('survey_answers.*');

        return [
            'totalSurveys' => $total,
            'latestSurvey' => $latest ? new SurveyDashboardResource($latest) : null,
            'totalAnswers' => $totalAnswers,
            'latestAnswers' => SurveyAnswerResource::collection($latestAnswers)
        ];
    }
}
