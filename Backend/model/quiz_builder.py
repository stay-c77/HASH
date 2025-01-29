import json
import re
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
            cleaned_response = re.sub(r'```json|```', '', response).strip()
            syllabus_json = json.loads(cleaned_response)
            print("\n Parsed Syllabus:\n",json.dumps(syllabus_json, indent=4))

            topics = []
            if "Syllabus" in syllabus_json:
                for module in syllabus_json["Syllabus"]:
                    topics = module.get("topic") or module.get("topics")
                    if topics:
                        print("Topics found: ", topics)
                    else:
                        print("No Topics found in syllabus.")

            if topics:
                topics_str = json.dumps(topics, indent=4)
                print(topics_str)

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

                if quiz_response:
                    try:
                        cleaned_quiz_response = re.sub(r'```json|```', '', quiz_response).strip()
                        quiz_json = json.loads(cleaned_quiz_response)
                        print("\n Generated Quiz: \n", json.dumps(quiz_json, indent=4))
                    except json.JSONDecodeError:
                        print("AI Response is NOT valid JSON:\n", quiz_response)
                else:
                    print("No response received.")
            else:
                print("No Topics found in syllabus.")

        except json.JSONDecodeError:
            print("AI Response is NOT valid JSON:\n", response)
    else:
        print("No response received.")

