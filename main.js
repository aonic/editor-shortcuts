/** extension to add various keyboard shortcuts for text editing */
define(function (require, exports, module) {
    'use strict';

    var CommandManager      = brackets.getModule("command/CommandManager"),
        EditorManager       = brackets.getModule("editor/EditorManager"),
        KeyBindingManager   = brackets.getModule("command/KeyBindingManager"),
        Menus               = brackets.getModule("command/Menus");

    var COMMAND_ID          = "editorShortcuts.deleteLine";
    var MENU_NAME           = "Delete Line";
    
    /**
     * Deletes the current line
     */
    function deleteLine(editor) {
        editor = editor || EditorManager.getFocusedEditor();
        if (!editor) {
            return;
        }

        var sel       = editor.getSelection(),
            delimiter = "";

        sel.start.ch = 0;
        sel.end      = {line: sel.start.line + 1, ch: 0};
        
        editor.document.replaceRange("", sel.start, sel.end);
    }

    CommandManager.register(MENU_NAME, COMMAND_ID, deleteLine);
    CommandManager.register(MENU_NAME, COMMAND_ID + "alternate", deleteLine);
    KeyBindingManager.addBinding(COMMAND_ID, "Ctrl-K");
    KeyBindingManager.addBinding(COMMAND_ID + "alternate", "Ctrl-Shift-X");

    var menu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
    menu.addMenuItem(COMMAND_ID);
});
