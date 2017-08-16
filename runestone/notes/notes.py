__author__ = 'petlja'

from docutils import nodes
from docutils.parsers.rst import directives
from docutils.parsers.rst import Directive


def setup(app):
    app.add_stylesheet('notes.css')

    app.add_directive('infonote', InfoNoteDirective)
    app.add_directive('questionnote', QuestionNoteDirective)
    app.add_directive('levelstart', LevelStartDirective)
    app.add_directive('levelend', LevelEndDirective)

    app.add_node(InfoNoteNode, html=(visit_info_note_node, depart_info_note_node))
    app.add_node(QuestionNoteNode, html=(visit_question_note_node, depart_question_note_node))
    app.add_node(LevelStartNode, html=(visit_level_start_node, depart_level_start_node))
    app.add_node(LevelEndNode, html=(visit_level_end_node, depart_level_end_node))


TEMPLATE_START = """
    <div class="course-box course-box-info">
        <div class="course-content">
            <p>
"""

TEMPLATE_END = """
    </p></div></div>
"""


class InfoNoteNode(nodes.General, nodes.Element):
    def __init__(self, content):
        super(InfoNoteNode, self).__init__()
        self.note = content


def visit_info_note_node(self, node):
    node.delimiter = "_start__{}_".format("info")
    self.body.append(node.delimiter)
    res = TEMPLATE_START
    self.body.append(res)


def depart_info_note_node(self, node):
    res = TEMPLATE_END
    self.body.append(res)
    self.body.remove(node.delimiter)


class InfoNoteDirective(Directive):
    """
.. infonote::
    """
    required_arguments = 0
    optional_arguments = 0
    has_content = True

    def run(self):
        """
        generate html to include note box.
        :param self:
        :return:
        """

        env = self.state.document.settings.env
        self.options['source'] = "\n".join(self.content)

        innode = InfoNoteNode(self.options)

        self.state.nested_parse(self.content, self.content_offset, innode)

        return [innode]

TEMPLATE_START_Q = """
    <div class="course-box course-box-special">
        <div class="course-content">
            <h4 class="carbox-title">
                <img class="corner-image pull-right" src="_static/question-mark.png" />
            </h4>
            <p>
"""

TEMPLATE_END_Q = """
    </p></div></div>
"""


class QuestionNoteNode(nodes.General, nodes.Element):
    def __init__(self, content):
        super(QuestionNoteNode, self).__init__()
        self.note = content


def visit_question_note_node(self, node):
    node.delimiter = "_start__{}_".format("info")
    self.body.append(node.delimiter)
    res = TEMPLATE_START_Q
    self.body.append(res)


def depart_question_note_node(self, node):
    res = TEMPLATE_END_Q
    self.body.append(res)
    self.body.remove(node.delimiter)


class QuestionNoteDirective(Directive):
    """
.. questionnote::
    """
    required_arguments = 0
    optional_arguments = 0
    has_content = True

    def run(self):
        """
        generate html to include note box.
        :param self:
        :return:
        """

        env = self.state.document.settings.env
        self.options['source'] = "\n".join(self.content)

        qnnode = QuestionNoteNode(self.options)

        self.state.nested_parse(self.content, self.content_offset, qnnode)

        return [qnnode]

TEMPLATE_START_L = """
    <!-- start level --><div class="rst-level rst-level-%(complexity)s">
"""

TEMPLATE_START_L_BREAK = """
    <!-- start level --></div><div class="rst-level rst-level-%(complexity)s"><div style="display:none">
"""

TEMPLATE_END_L = """
    </div><!-- end level -->
"""

TEMPLATE_END_L_BREAK = """
    </div><!-- end level --></div><div>
"""

class LevelStartNode(nodes.General, nodes.Element):
    def __init__(self, content):
        super(LevelStartNode, self).__init__()
        self.note = content


def visit_level_start_node(self, node):
    node.delimiter = "_start__{}_".format("levelstart")
    self.body.append(node.delimiter)

    if 'break' in node.note:
        res = TEMPLATE_START_L_BREAK % node.note
    else:
        res = TEMPLATE_START_L % node.note
    
    #res = TEMPLATE_START_L
    self.body.append(res)


def depart_level_start_node(self, node):
    res = TEMPLATE_END_L
    #self.body.append(res)
    self.body.remove(node.delimiter)


class LevelStartDirective(Directive):
    """
.. levelstart::
    """
    required_arguments = 0
    optional_arguments = 0
    has_content = True
    option_spec = {
        'complexity':directives.unchanged,
        'break':directives.flag,
    }

    def run(self):
        """
        generate html to include level box.
        :param self:
        :return:
        """

        env = self.state.document.settings.env
        self.options['source'] = "\n".join(self.content)

        innode = LevelStartNode(self.options)

        self.state.nested_parse(self.content, self.content_offset, innode)

        return [innode]

class LevelEndNode(nodes.General, nodes.Element):
    def __init__(self, content):
        super(LevelEndNode, self).__init__()
        self.note = content


def visit_level_end_node(self, node):
    node.delimiter = "_start__{}_".format("levelend")
    self.body.append(node.delimiter)
    res = TEMPLATE_START_L
    #self.body.append(res)


def depart_level_end_node(self, node):
    if 'break' in node.note:
        res = TEMPLATE_END_L_BREAK
    else:
        res = TEMPLATE_END_L
        
    self.body.append(res)
    self.body.remove(node.delimiter)


class LevelEndDirective(Directive):
    """
.. levelend::
    """
    required_arguments = 0
    optional_arguments = 0
    has_content = True

    option_spec = {
        'break':directives.flag,
    }

    def run(self):
        """
        generate html to include level box.
        :param self:
        :return:
        """

        env = self.state.document.settings.env
        self.options['source'] = "\n".join(self.content)

        innode = LevelEndNode(self.options)

        self.state.nested_parse(self.content, self.content_offset, innode)

        return [innode]