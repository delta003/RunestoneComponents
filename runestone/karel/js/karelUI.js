"use strict";

$(document).ready(function() {
    $('[data-component=karel]').each( function(index ) {
        var canvas = $(this).find(".world")[0];
        var textarea = $(this).find(".codeArea")[0];

        var editor = CodeMirror.fromTextArea(textarea,{lineNumbers: true,
            mode: "JavaScript", indentUnit: 4,
            matchBrackets: true, autoMatchParens: true,
            extraKeys: {"Tab": "indentMore", "Shift-Tab": "indentLess"}});

        $(this).find(".run-button").click(function () {
            var program = editor.getValue();
            executeProgram(program);
        });

        $(this).find(".reset-button").click(function () {
            reset();
        });

        function outf(text){
            console.log(text);
        }

        function builtinRead(x) {
            if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
                throw "File not found: '" + x + "'";
            return Sk.builtinFiles["files"][x];
        }

        function executeProgram(program) {
            Sk.configure({output: outf, read: builtinRead});
            Sk.canvas = canvas;
            Sk.externalLibraries = {
                karel : {
                    path: '_static/karel.js',
                }
            };
            //Sk.pre = "edoutput";
            try {
                var myPromise = Sk.misceval.asyncToPromise(function() {
                    return Sk.importMainWithBody("<stdin>",false,program,true);
                });
                myPromise.then(
                    function(mod) {

                    },
                    function(err) {
                        console.log(err.toString());
                    }
                );
            } catch(e) {
                outf(e.toString() + "\n")
            }
        }

        function reset(){
            executeProgram("import karel");
        }

        reset();
    });
});