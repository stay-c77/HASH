from prompts.prompt import Prompt

prompt = Prompt()


class process_syllabus:
    def syllabus_parser(self):
        try:
            syllabus_parser = prompt.parse_syllabus()
        except Exception as e:
            print(f"An Error occurred while parsing syllabus: {str(e)}")
            return None