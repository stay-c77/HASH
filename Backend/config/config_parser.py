import configparser

class Config:
    def __init__(self):
        self.config = self.load_config('../config.ini')

    def load_config(self, file_path):
        config = configparser.ConfigParser()
        config.read(file_path)
        print(config)

config = Config()