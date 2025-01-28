# Hash
Online Learning Platform - Project

## Prompt 1 => Prompt to extract syllabus from pdf

    <user>
        Extract syllabus from the given pdf in the below formatted json strutures
        <JSON>
            {
                Subject : "hint: Extract Subject name from the pdf" 
                syllabus:[
                {
                module: "hint: Extract module heading",
                Subject : "hint: Make a headline for the module based on the topics and subtopics",
                topic:"hint: Extract topic name from the syllabus and store it as a list"    
                },.......
                ]
            }
        </JSON>
    </user>

## Prompt 2 => Prompt to generate quiz from selected topics

    <user>
        Generate a quiz with {number_of_questions} questions, each with {number_of_options} answer options,
        with the following topics: {topics}, and difficulty levels: {levels}. Generate this in json format
        <JSON>
            {{
                "quiz_title": "Quiz for {topics} topics",
                "level":"The levels must be beginner, intermediate or hard"
                "questions": [
                    {{
                        "question": "hint: Generate question from the selected topic",
                        "options": ["hint: Generate answer options from the questions generated"],
                        "answer": "hint: Extract correct answer from the options generated"
                    }},...
                ]
            }}
            <instructions>
                The user want {beginner} beginner, {intermediate} intermediate and {hard} hard
                The user wants 30% Beginner level questions, 40% intermediate questions and 30% Hard level questions
                By default generate 10 questions, if user did not specify the {number_of_questions}
            </instructions>
        </JSON>
    </user>