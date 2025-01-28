from prompts.prompt import Prompt
from gen_ai.deepseek import GenAI
import json

prompt = Prompt()

class ProcessSyllabus:
    def syllabus_parser(self):
        try:
            syllabus = '''Course Contents and Lecture Schedule
                        No Topic No. of
Lectures
1 Introduction To Python: 9 hours
1.1
Understanding Python-identifiers, variables, keywords, expressions
and statements. 2
1.2
Evaluation of expressions, Operators and operands, operator
precedence, indentation 1

INFORMATION TECHNOLOGY

Downloaded from Ktunotes.in

1.3 Python Program Flow Control: Decision making- if, if..else, elif. 2
1.4 Loops - for, while, for...else, while...else 2
1.5 Control statements using pass, continue, break. 2
2 Strings and lists: 9 hours
2.1 String traversal, string slices and comparison with examples 1
2.2 The string module, character classification. 1
2.3
List- List values, accessing elements, list membership, Lists and for
loops, List operations, List slices, List deletion 2
2.4 Matrices 1
2.5
Tuples- mutability and tuples, tuple assignment, tuples as return
values, Tuple operations.

2
2.6 Dictionaries – operations and methods. 2
3
Python Functions, Modules And Packages: 9 hours
3.1 Function definition, calling functions, parameters and arguments, the
return statement.

1

3.2 Type conversion and coercion, composition of functions 1
3.3 Lambda function, mathematical functions 1
3.4
user-defined functions 1
3.5 Recursion 1
3.6 Modules -Built-in modules 1
3.7 Creating modules, import statement. 1
3.8 Packages in Python - importing modules from a package. 2
4
Python Files and exceptions: 9 hours
4.1 Python file handling, open, write, read text files 4
4.2 Writing variables 1
4.3 Directories in Python 1
4.4 Pickling 1
4.5 Exception Handling. 2

INFORMATION TECHNOLOGY

Downloaded from Ktunotes.in

5 Python Object Oriented Programming: 9 hours
5.1 Introduce classes and objects 1
5.2 Class definition, attributes, instances, sameness 1
5.3 Instances as arguments and return values. 1
5.4 Constructor 2
5.5 Class attributes and destructors 2
5.6 Inheritance'''
            return syllabus

        except Exception as e:
            print(f"An Error occurred while parsing syllabus: {str(e)}")
            return None