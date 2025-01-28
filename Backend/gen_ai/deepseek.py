from openai import OpenAI
from config.config_parser import Config

config = Config()
api_data = config.load_config(config.config_path)

api_key = api_data['API_CONFIG']['API_KEY']
base_url = api_data['API_CONFIG']['BASE_URL']
model = api_data['API_CONFIG']['MODEL']

class GenAI:
    def gen_ai_model(self,prompt):
        self.client = OpenAI(api_key=api_key, base_url=base_url)

        response = self.client.chat.completions.create(
            model=model,
            message=[
                {"role": "system", "content": "You are a helpful assistant for creating quiz and parsing syllabus based on the selected topics"},
                {"role": "user", "content": prompt}
            ],
            stream=False
        )

        return response.choices[0].message.content