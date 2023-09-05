export interface Position {
	latitude: number;
	longitude: number;
}

export interface ApiQuizResponse {
    success: boolean;
    quizId: string;
}

export interface ApiQuestionResponse {
	success: boolean;
	error: string;
}

export interface ApiResponseGetQuiz {
	quizzes:ApiQuizResponseQuestions[];
	success: boolean;
}

export interface ApiQuizzesResponse {
	questions: ApiQuizResponseQuestions[];
	quizId: string;
	userId: string;
	username: string;
} 

export interface ApiQuizResponseQuestions {
	answer: string;
	location: {
		latitude: number;
		longitude: number;
	}
	question: string;

}