/** extension to add various keyboard shortcuts for text editing */
define(function (require, exports, module) {
    'use strict';

    var CommandManager      = brackets.getModule("command/CommandManager"),
        EditorManager       = brackets.getModule("editor/EditorManager"),
        KeyBindingManager   = brackets.getModule("command/KeyBindingManager"),
        Menus               = brackets.getModule("command/Menus");

    var COMMAND_ID  = "editorShortcuts.deleteLine";
    var MENU_NAME   = "Delete Line";

    function insert(input) {            
        var editor = EditorManager.getCurrentFullEditor();
        var pos    = editor.getCursorPos();
        pos.ch = 0;       
 
        editor._codeMirror.replaceRange(input, pos);

        EditorManager.focusEditor();
    }
    
    /**
     * Deletes the current line
     */
    function deleteLine(editor) {
        editor = editor || EditorManager.getFocusedEditor();
        if (!editor) {
            return;
        }

        var sel = editor.getSelection(),
            delimiter = "";

        sel.start.ch = 0;
        sel.end = {line: sel.start.line + 1, ch: 0};
        if (sel.end.line === editor.lineCount()) {
            delimiter = "\n";
        }

        // Make the edit
        var doc = editor.document;

        var selectedText = doc.getRange(sel.start, sel.end) + delimiter;
        doc.replaceRange("", sel.start, sel.end);
    }

    CommandManager.register(MENU_NAME, COMMAND_ID, deleteLine);
    KeyBindingManager.addBinding(COMMAND_ID, "Ctrl-K");

    var menu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
    menu.addMenuItem(COMMAND_ID);
});
