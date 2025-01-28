import configparser
import os

class Config:
    def __init__(self, config_path = '../config.ini'):
        self.config_path = config_path
        self.config = self.load_config()

    def load_config(self):
        config = configparser.ConfigParser()
        config.read(self.config_path)
        return config


config = Config()