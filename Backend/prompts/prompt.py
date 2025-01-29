class Prompt:
    def __init__(self):
        self.syllabus_prompt = '''<user>
            Extract the syllabus from the given PDF in the following formatted JSON Structure
            <JSON>
                {
                Subject : *hint: Extract Subject name from the pdf*
                Syllabus: [
                {
                module: *hint: Extract module heading*,
                subject: *hint: Make a headline for the module based on the topics and subtopics*
                topic: *hint: Extract the topic names from the syllabus and store it as a list*
                }
                ]
             }
        </JSON>
        </user>'''

        self.quiz_prompt = '''<user>
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
    </user>'''


    def parse_syllabus(self):
        return self.syllabus_prompt

def generate_quiz(self,number_of_questions,number_of_options,topics,levels,beginner,intermediate,hard):
    return self.quiz_prompt.format(
        number_of_questions=number_of_questions,
        number_of_options=number_of_options,
        topics=topics,
        levels=levels,
        beginner=beginner,
        intermediate=intermediate,
        hard=hard
    )

prompt = Prompt()


