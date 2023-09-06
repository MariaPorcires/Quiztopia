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
	quizzes:ApiQuizzesResponse[];
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

export interface QuestionsResponse {
	quiz: QuestionsResponseQuiz
}

export interface QuestionsResponseQuiz {
	Attributes: QuestionsAttributes
}

export interface QuestionsAttributes {
	questions: AttributesQuestions[]
    quizId: string
    userId:string
    username: string

}

interface AttributesQuestions{
    answear: string
    location: QuestionsResponseLocation
    question:string
}

interface QuestionsResponseLocation{
    latitude: string
    longitude: string
}



