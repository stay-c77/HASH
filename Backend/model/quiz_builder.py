import json
import re
from prompts.prompt import Prompt
from gen_ai.deepseek import GenAI
from model.syllabus_parser import ProcessSyllabus

pdf_path = "uploads/syllabus.pdf"

process_syllabus = ProcessSyllabus()
syllabus_text = process_syllabus.syllabus_parser(pdf_path)

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

            topics = []
            if "Syllabus" in syllabus_json:
                for module in syllabus_json["Syllabus"]:
                    module_topics = module.get("topics") or module.get("topic")
                    if module_topics:
                        if isinstance(module_topics, list):
                            topics.extend(module_topics)
                        else:
                            topics.append(module_topics)

            if topics:
                topics_str = str(topics)

                quiz_prompt = prompt_generator.generate_quiz(
                    number_of_questions=10,
                    number_of_options=4,
                    topics=topics_str,
                    levels="beginner, intermediate, hard",
                    beginner=3,
                    intermediate=3,
                    hard=3
                )

                quiz_response = gen_ai.gen_ai_model(quiz_prompt)
                if not quiz_response:
                    print("No response received. Retrying...")
                    quiz_response = gen_ai.gen_ai_model(quiz_prompt)

                if quiz_response:
                    try:
                        cleaned_quiz_response = re.sub(r'```json|```', '', quiz_response).strip()
                        quiz_json = json.loads(cleaned_quiz_response)
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
else:
    print("Failed to extract syllabus text.")
