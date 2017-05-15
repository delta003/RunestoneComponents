"use strict";

$(document).ready(function() {
    $('[data-component=karel]').each( function(index ) {
        var karel;
        var world;
        var worldDrawer;
        var karelDrawer;

        var canvas = $(this).find(".world")[0];
        var textarea = $(this).find(".codeArea")[0];
        world = new World();
        worldDrawer = new WorldDrawer(world, canvas);
        worldDrawer.draw();
        karel = new Karel(world);
        karelDrawer = new KarelDrawer(karel, canvas);
        karelDrawer.draw();

        var editor = CodeMirror.fromTextArea(textarea,{lineNumbers: true,
            mode: "JavaScript", indentUnit: 4,
            matchBrackets: true, autoMatchParens: true,
            extraKeys: {"Tab": "indentMore", "Shift-Tab": "indentLess"}});

        $(this).find(".run-button").click(function () {
            var program = editor.getValue();
            executeProgram(program);
        });

        $(this).find(".turnLeft-button").click(function () {
            var program = "turnLeft();";
            executeProgram(program);
        });

        $(this).find(".move-button").click(function () {
            var program = "move();";
            executeProgram(program);
        });

        $(this).find(".draw-button").click(function () {
            worldDrawer.draw();
            karelDrawer.draw();
        });

        function executeProgram(program) {
            eval(program);
            setTimeout(function () {
                worldDrawer.draw();
                karelDrawer.draw();
            }, 1000);
        }

        function turnLeft() {
            karel.turnLeft();
        }

        function move() {
            karel.move();
        }
    });
});