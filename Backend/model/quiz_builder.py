import json
from prompts.prompt import Prompt
from gen_ai.deepseek import GenAI
from model.syllabus_parser import ProcessSyllabus

process_syllabus = ProcessSyllabus()
syllabus_text = process_syllabus.syllabus_parser()

if syllabus_text:
    prompt_generator = Prompt()
    syllabus_prompt = prompt_generator.parse_syllabus()
    formatted_syllabus = syllabus_prompt.format(syllabus_text=syllabus_text)

    gen_ai = GenAI()
    response = gen_ai.gen_ai_model(formatted_syllabus)

    if response:
        try:
            syllabus_json = json.loads(response)
            print("\n Parsed Syllabus:\n",json.dumps(syllabus_json, indent=4))

            topics = []
            if "Syllabus" in syllabus_json:
                for module in syllabus_json["Syllabus"]:
                    topics.extend(module.get("topic",[]))

            if topics:
                topics_str = ", ".join(topics)

                quiz_prompt = prompt_generator.generate_quiz(
                    number_of_questions=10,
                    number_of_options=4,
                    topics=topics_str,
                    levels="beginner, intermediate, hard",
                    beginner=3,
                    intermediate=3,
                    hard=3
                )

                print("\n Generated Quiz Prompt:\n", quiz_prompt)

                quiz_response =  gen_ai.gen_ai_model(quiz_prompt)

