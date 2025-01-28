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
                "level":"The levels must be beginner intermediate or hard or extreme"
                "questions": [
                    {{
                        "question": "hint: Extract question from the syllabus",
                        "options": ["hint: Extract answer options from the syllabus"],
                        "answer": "hint: Extract correct answer from the syllabus"
                    }},...
                ]
            }}
            <instructions>
                The user want {beginner} beginner, {intermediate} intermediate, {hard} hard and {extreme} extreme
            </instructions>
        </JSON>
    </user>