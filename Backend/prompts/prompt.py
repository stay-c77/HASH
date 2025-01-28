Syllabus_prompt = '''<user>
Extract the syllabus from the given pdf in the following formatted JSON Structure
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

