/*!
 * EmojioneArea v2.1.2
 * https://github.com/mervick/emojionearea
 * Copyright Andrey Izman and other contributors
 * Released under the MIT license
 * Date: 2016-04-03T14:37Z
 */
(function (document, window, $) {

    //    todo    vahid       2016/27/4
    var myCodVariabe = {};
    //String.prototype.replaceAlll = function (search, replacement) {
    //    var target = this;
    //    return target.replace(new RegExp(search, 'g'), replacement);
    //};
    var linking = false;
    String.prototype.replaceAlll = function (search, replacement) {
        var target = this;
        return target.split(search).join(replacement);
    };
    function checkLength(afterChek, editor) {
        var sumAfterChek = afterChek === false ? 0 : 1;
        var html = $(editor).parent().siblings(".toolgram-editor-result").children(".toolgram-editor-content").val();
        var chekLenghtHtml = html
        var showCounter = $(editor).parent().siblings(".top-button-container").find(".toolgram-editor-remaining");
        //chekLenghtHtml = chekLenghtHtml.replaceAlll(/<img[^>]*alt="([^"]+)"[^>]*>/ig, "@");
        //chekLenghtHtml = chekLenghtHtml.replaceAlll(/<br[^>]*>/g, "@");
        //chekLenghtHtml = chekLenghtHtml.replaceAlll(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "@");
        //chekLenghtHtml = chekLenghtHtml.replaceAlll("\n", "@");
        var htmlLength = chekLenghtHtml.length;
        var parentId = $(editor).parents(".toolgram-editor").attr("id");
        var remaining = (window[parentId].length - htmlLength) - sumAfterChek;
        $(showCounter).text(remaining);
        $(showCounter).siblings('.toolgram-editor-hidden-remaining').val(remaining);
        if (window[parentId].length > 0 && remaining < 0) {
            $(showCounter).parent().addClass("lengthIsnotOk");
            //   hide and show
            var parentShowCounter = $(showCounter).parent();
            $(parentShowCounter).fadeOut(200, function () {
                $(parentShowCounter).fadeIn(200, function () {
                    $(parentShowCounter).fadeOut(200, function () {
                        $(parentShowCounter).fadeIn(200, function () {
                            $(parentShowCounter).fadeOut(200, function () {
                                $(parentShowCounter).fadeIn(200, function () {

                                });
                            });
                        });
                    });
                });
            });
            //   hide and show
            return { status: false, remaining: remaining, html: html };
        } else {
            $(showCounter).parent().removeClass("lengthIsnotOk");
            return { status: true, remaining: remaining, html: html };
        }

    }
    function htmlToolgram(html) {

        html = html.replaceAlll("<i></i>", "");
        html = html.replaceAlll("<b></b>", "");
        html = html.replaceAlll(/<\/?br[^>]*>/g, String.fromCharCode(13));
        html = html.replaceAlll(/<\/?span[^>]*>/g, "");
        html = html.replaceAlll(/<\/?strong[^>]*>/g, "");
        html = html.replaceAlll(/<h[^>]*>/g, "");
        html = html.replaceAlll(/<\/h[^>]*>/g, "");
        html = html.replaceAlll(/<div[^>]*>/g, String.fromCharCode(13));
        html = html.replaceAlll(/<\/div>/g, "");
        html = html.replaceAlll(/<ul[^>]*>/g, String.fromCharCode(13));
        html = html.replaceAlll(/<\/ul>/g, "");
        html = html.replaceAlll(/<ol[^>]*>/g, String.fromCharCode(13));
        html = html.replaceAlll(/<\/ol>/g, "");
        html = html.replaceAlll(/<section[^>]*>/g, String.fromCharCode(13));
        html = html.replaceAlll(/<\/section>/g, "");
        html = html.replaceAlll(/<nav[^>]*>/g, String.fromCharCode(13));
        html = html.replaceAlll(/<\String.fromCharCode(13)av>/g, "");
        html = html.replaceAlll(/<article[^>]*>/g, String.fromCharCode(13));
        html = html.replaceAlll(/<\/article>/g, "");
        html = html.replaceAlll(/<aside[^>]*>/g, String.fromCharCode(13));
        html = html.replaceAlll(/<\/aside>/g, "");
        html = html.replaceAlll(/<header[^>]*>/g, String.fromCharCode(13));
        html = html.replaceAlll(/<\/header>/g, "");
        html = html.replaceAlll(/<footer[^>]*>/g, String.fromCharCode(13));
        html = html.replaceAlll(/<\/footer>/g, "");
        html = html.replaceAlll(/<p[^>]*>/g, String.fromCharCode(13));
        html = html.replaceAlll(/<\/p>/g, "");
        html = html.replaceAlll(/<\/?input[^>]*>/g, "");
        html = html.replaceAlll(/<\/?button[^>]*>/g, "");
        html = html.replaceAlll(/<\/?textarea[^>]*>/g, "");
        html = html.replaceAlll(/<\/?li[^>]*>/g, "");
        html = html.replaceAlll(/<\/?unlink[^>]*>/g, "");
        html = html.replaceAlll("&nbsp;", " ");
        html = html.replaceAlll("&zwnj;", "‌‌");

        //html = html.replaceAlll("&gt;", "»‌");
        //html = html.replaceAlll("&lt;", "«‌");
        return html;
    }
    function controlHtmlReplacer(html) {

        html = html.replaceAlll("\n", "<br>");

        return html;
    }
    window["controlHtml"] = function controlHtml(editor) {
        var html = $(editor).parent().siblings(".toolgram-editor-result").children(".toolgram-editor-content").val();
        html = controlHtmlReplacer(html);
        $(editor).html(html);
        var chideren = $(editor).children();
        $(chideren).each(function (index, element) {
            var childHtml = $(element).html();
            if ($(element).prop('tagName') == "A") {
                if ($(element).attr('href') == "undefined" || $(element).attr('href') == "####linkadress####" || $(element).attr('href').trim() == "") {
                    var txtchild = $(element).html();
                    $(element).replaceWith(txtchild);

                } else {
                    childHtml = childHtml.replaceAlll("<i>", "");
                    childHtml = childHtml.replaceAlll("</i>", "");
                    childHtml = childHtml.replaceAlll("<b>", "");
                    childHtml = childHtml.replaceAlll("</b>", "");
                    $(element).html(childHtml);
                }

            }
            else {
                var indexes = [];
                indexes[0] = { index: childHtml.indexOf("<b>"), tag: "<b>", type: "start" };
                indexes[1] = { index: childHtml.indexOf("</b>"), tag: "</b>", type: "end" };
                indexes[2] = { index: childHtml.indexOf("<i>"), tag: "<i>", type: "start" };
                indexes[3] = { index: childHtml.indexOf("</i>"), tag: "</i>", type: "end" };
                indexes[4] = { index: childHtml.indexOf("<a "), tag: "<a ", type: "start" };
                indexes[5] = { index: childHtml.indexOf("</a>"), tag: "</a>", type: "end" };
                var sum = 0
                $(indexes).each(function (Oindex, Oelement) {
                    if (Oelement.index >= 0) {    //  if
                        if (Oelement.type == "start") {
                            var middel = "{{{{/" + $(element).prop('tagName').toLowerCase() + "}}}}"
                            childHtml = childHtml.substring(0, Oelement.index)
                                + middel + childHtml.substring(Oelement.index);
                            var len = middel.length;
                            $(indexes).each(function (i, e) {
                                if (e.index > Oelement.index) {
                                    e.index += len
                                }
                            });

                        } else {     // else
                            var middel = "{{{{" + $(element).prop('tagName').toLowerCase() + "}}}}";
                            childHtml = childHtml.substring(0, Oelement.index + 4)
                                + middel + childHtml.substring(Oelement.index + 4);
                            var len = middel.length;
                            $(indexes).each(function (i, e) {
                                if (e.index > Oelement.index) {
                                    e.index += len
                                }
                            });
                        }         // ens else


                    }
                });
                $(element).html(childHtml);
            }
        });
        var newhtml = $(editor).html();
        newhtml = newhtml.replaceAlll("{{{{", "<");
        newhtml = newhtml.replaceAlll("}}}}", ">");
        newhtml = unicodeTo(newhtml,
            '<img alt="{alt}" class="emojione' + (self.sprite ? '-{uni}" src="' + blankImg + '">' : '" src="{img}">'))
            .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
            .replace(/  /g, '&nbsp;&nbsp;');
        if (newhtml.trim() == "<br>") {
            newhtml = "";
        }
        $(editor).html(newhtml);
        checkLength(false, editor);
    }
    window["toolgramUnicod"] = function toolgramUnicod(html) {
        var newhtml = unicodeTo(html,
            '<img alt="{alt}" class="emojione' + (self.sprite ? '-{uni}" src="' + blankImg + '">' : '" src="{img}">'))
            .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
            .replace(/  /g, '&nbsp;&nbsp;');
        return newhtml;
    }

    function getSelectionParentElement() {
        var parentEl = null, sel;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.rangeCount) {
                parentEl = sel.getRangeAt(0).commonAncestorContainer;
                if (parentEl.nodeType != 1) {
                    parentEl = parentEl.parentNode;
                }
            }
        } else if ((sel = document.selection) && sel.type != "Control") {
            parentEl = sel.createRange().parentElement();
        }
        return parentEl;
    }
    var oldHtmlForLink = "";
    function getSelectionCharOffsetsWithin(element) {
        var start = 0, end = 0;
        var sel, range, priorRange;
        if (typeof window.getSelection != "undefined") {
            range = window.getSelection().getRangeAt(0);
            priorRange = range.cloneRange();
            priorRange.selectNodeContents(element);
            priorRange.setEnd(range.startContainer, range.startOffset);
            start = priorRange.toString().length;
            end = start + range.toString().length;
        } else if (typeof document.selection != "undefined" &&
            (sel = document.selection).type != "Control") {
            range = sel.createRange();
            priorRange = document.body.createTextRange();
            priorRange.moveToElementText(element);
            priorRange.setEndPoint("EndToStart", range);
            start = priorRange.text.length;
            end = start + range.text.length;
        }
        return {
            start: start,
            end: end
        };
    }
    function getSelectionParentElement() {
        var parentEl = null, sel;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.rangeCount) {
                parentEl = sel.getRangeAt(0).commonAncestorContainer;
                if (parentEl.nodeType != 1) {
                    parentEl = parentEl.parentNode;
                }
            }
        } else if ((sel = document.selection) && sel.type != "Control") {
            parentEl = sel.createRange().parentElement();
        }
        return parentEl;
    }
    function replaceSelectedText(replacementText) {
        var sel, range;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();
                range.insertNode(document.createTextNode(replacementText));
            }
        } else if (document.selection && document.selection.createRange) {
            range = document.selection.createRange();
            range.text = replacementText;
        }
    }
    function trimByBr(html) {
        html = html.trim();
        while (html.substring(html.length - 4) == "<br>") {
            html = html.substring(0, html.length - 4);
        }
        return html;

    }
    function openAdress(editor) {
        var popup = $(editor).parent().siblings(".popUp");
        $(popup).css("display", "block");
        $(editor).parents("form").on('keyup keypress', function (e) {
            var keyCode = e.keyCode || e.which;
            if (keyCode === 13) {
                e.preventDefault();
                $(".toolgram-editor-changelink").trigger("click");
                return false;
            }
        });
    }
    function closePopUp(popUp, editor) {
        var parent = $(popUp).parent();
        var popup = $(popUp);
        //var editor = $(popUp).siblings("");
        $(popup).css("display", "none");
        controlHtml(editor);
        $(parent).children(".popUp").find(".toolgram-editor-linkAdress").val("");
    }
    function changelink(parent, editor) {
        if (linking) {
            var popup = $(parent).children(".popUp").find(".toolgram-editor-linkAdress").val();
            toolgramTextLink = toolgramTextLink.replaceAlll("%E2%81%A3", "");
            toolgramTextLink = toolgramTextLink.replaceAlll("U+2063", "");
            toolgramTextLink = toolgramTextLink.replaceAlll("&zwnj;", "");
            popup = "<a href='" + popup + "'>" + toolgramTextLink + "</a>";
            //var editor = $("#" + myCodVariabe.parentID + " .emojionearea-editor")[0];
            var html = $(editor).html();
            html = html.replace("{#{}#}", popup);
            $(editor).html(html);
            $(parent).children(".popUp").css("display", "none");
            $(editor).parents("form").off('keyup keypress');
            htmlresult(editor);
            controlHtml(editor);
            $(parent).children(".popUp").find("#toolgram-editor-linkAdress").val("");
            if (!checkLength(false, editor).status) {
                $(editor).html(oldHtmlForLink);
            }
            linking = false;
        }

    }
    var toolgramTextLink = "";
    function linkMaking(editor) {
        if (!linking) {
            linking = true;
            var parent = getSelectionParentElement();
            var rang = getSelectionCharacterOffsetsWithin(parent);
            toolgramTextLink = $(parent).text().substring(rang.start, rang.end);
            var html = $(editor).html();
            oldHtmlForLink = html;
            replaceSelectedText("{#{}#}");
            html = html.replaceAlll(/<\/?span[^>]*>/g, "");
            openAdress(editor);
            // $(parent).text($(parent).text().substring(0, rang.start) + $(parent).text().substring(rang.end));
            //  link  maker function
            //var rang = getSelectionCharacterOffsetsWithin(editor);
            //if (rang.start != rang.end) {
            //    //   debugger
            //    //controlHtml(editor);
            //    var html = $(editor).html();
            //    html = html.replaceAlll(/<\/?span[^>]*>/g, "");
            //    oldHtmlForLink = html;
            //    //html = htmlToolgram(html);
            //    var text = $(editor).text();
            //    var startText = text.slice(0, rang.start);
            //    var middelText = text.substring(rang.start, rang.end);
            //    var endText = text.slice(rang.end);
            //    var firstcount = startText.length;
            //    var secendcount = firstcount + middelText.length;
            //    var tags = getMatchIndices(/(<([^>]+)>)/ig, html);
            //    //tags.sort(function (a, b) {
            //    //    return parseFloat(a.textIndex) - parseFloat(b.textIndex);
            //    //});

            //    $(tags).each(function (index, element) {
            //        if (element.textIndex <= rang.start) {
            //            startText = startText.substring(0, element.index) + element.tag + startText.substring(element.index);
            //            firstcount += element.lenght;
            //            secendcount += element.lenght;
            //        } if (element.textIndex > rang.start && element.textIndex < rang.end) {
            //            middelText = middelText.substring(0, element.index - firstcount) + element.tag + middelText.substring(element.index - firstcount);
            //            secendcount += element.lenght;
            //        } if (element.textIndex >= rang.end) {
            //            endText = endText.substring(0, element.index - secendcount) + element.tag + endText.substring(element.index - secendcount);
            //        }
            //    });
            //    middelText = "<a href='" + "####linkadress####" + "'>" + middelText + "</a>";
            //    html = startText + middelText + endText;

            //    $(editor).html(html);
            //    //      htmlresult(editor);
            //    openAdress(editor);
            //}
        }
    }
    function unLink(editor) {   //  link  maker function

        var parent = getSelectionParentElement();
        if (parent.tagName == "A") {
            var childText = $(parent).text();
            $(parent).replaceWith(childText);
            htmlresult(editor);
        } else {

        }
    }
    function boldMaking(editor) {
        var oldHtml = $(editor).html();
        document.execCommand('bold', false, null); // apply command
        if (checkLength(false, editor).status == false) {
            $(editor).html(oldHtml);
        }
        htmlresult(editor);
        controlHtml(editor);
    }
    function italicMaking(editor) {

        var oldHtml = $(editor).html();
        document.execCommand('italic', false, null); // apply command
        if (checkLength(false, editor).status == false) {
            $(editor).html(oldHtml);
        }
        htmlresult(editor);
        controlHtml(editor);


    }
    function areaToEditor(editor) {
        var content = $(editor).parent().siblings(".toolgram-editor-result").children(".toolgram-editor-content");
        //var editor = $("#" + myCodVariabe.parentID + " .emojionearea-editor")[0];
        $(editor).html(unicodeTo($(content).val(),
            '<img alt="{alt}" class="emojione' + (self.sprite ? '-{uni}" src="' + blankImg + '">' : '" src="{img}">'))
            .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
            .replace(/  /g, '&nbsp;&nbsp;'));
    }
    function htmlresult(editor) {
        var html = $(editor).html();
        var content = $(editor).parent().siblings(".toolgram-editor-result").children(".toolgram-editor-content");
        html = html.replace(/<img[^>]*alt="([^"]+)"[^>]*>/ig, '$1');
        //html = html.replaceAlll("<br>", "");
        html = htmlToolgram(html);
        //html = trimByBr(html);
        $(content).val(html);
        checkLength(false, editor);
    }

    function getSelectionCharacterOffsetsWithin(element) {
        var startOffset = 0, endOffset = 0;
        if (typeof window.getSelection != "undefined") {
            var range = window.getSelection().getRangeAt(0);
            var preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(element);
            preCaretRange.setEnd(range.startContainer, range.startOffset);
            startOffset = preCaretRange.toString().length;
            endOffset = startOffset + range.toString().length;
        } else if (typeof document.selection != "undefined" &&
            document.selection.type != "Control") {
            var textRange = document.selection.createRange();
            var preCaretTextRange = document.body.createTextRange();
            preCaretTextRange.moveToElementText(element);
            preCaretTextRange.setEndPoint("EndToStart", textRange);

            startOffset = preCaretTextRange.text.length;
            endOffset = startOffset + textRange.text.length;
        }
        return { start: startOffset, end: endOffset };
    }
    function getMatchIndices(regex, str) {
        var result = [];
        var match;
        regex = new RegExp(regex);
        while (match = regex.exec(str)) {
            var obj = { lenght: match[0].length, index: match.index, tag: match[0] }
            result.push(obj);
        }
        var sum = 0;
        $(result).each(function (index, element) {
            element.textIndex = element.index - sum;
            sum = sum + element.lenght;
        });
        return result;
    }
    function eventHandler() {            //event handler
        $(".toolgram-editor-btnBold").click(function () {   // bold click
            var editor = $(this).parent().siblings(".emojionearea").children(".emojionearea-editor")[0];
            boldMaking(editor);
        });
        $(".toolgram-editor-btnItalic").click(function () {     // italic click
            var editor = $(this).parent().siblings(".emojionearea").children(".emojionearea-editor")[0];
            italicMaking(editor);
        });
        $(".toolgram-editor-btnLink").click(function () {
            //linkclick
            var editor = $(this).parent().siblings(".emojionearea").children(".emojionearea-editor")[0];
            linkMaking(editor);
        });

        var ctrlDown = false;
        var ctrlKey = 17, iKey = 73, bKey = 66;
        $("body").on('keydown', '.emojionearea .emojionearea-editor', function (e) {
            var editor = e.target;
            var parentId = $(editor).parents(".toolgram-editor").attr("id");

            //checkLength(false, editor);
            if (e.keyCode == ctrlKey) ctrlDown = true;
            if (ctrlDown && (e.keyCode == iKey)) {
                if (window[parentId].hasBia) {
                    italicMaking(editor);
                }
                return false;
            }
            else if (ctrlDown && (e.keyCode == bKey)) {
                if (window[parentId].hasBia) {
                    boldMaking(editor);
                }
                return false;
            }
            //-----------------------------

        }).keyup(function (e) {
            if (e.keyCode == ctrlKey) ctrlDown = false;
        });
        //$("body").on('keypress', '.emojionearea .emojionearea-editor', function (e) {
        //    if (!checkLength(true, e.target).status) {
        //        return false;
        //    }
        //});




        $(".toolgram-editor-changelink").click(function () {   //
            var parent = $(this).parents(".toolgram-editor")[0];
            var editor = $(this).parents(".popUp").siblings(".emojionearea").children(".emojionearea-editor")[0];
            changelink(parent, editor);
        });

        $(".toolgram-editor-btnUnLink").click(function () {   //
            var editor = $(this).parent().siblings(".emojionearea").children(".emojionearea-editor")[0];
            unLink(editor);
        });

        $(".toolgram-editor-close").click(function () {   //
            var popUp = $(this).parents(".popUp")[0];
            var editor = $(popUp).siblings(".emojionearea").children(".emojionearea-editor");
            closePopUp(popUp, editor);
        });


    }

    // end todo vahid     2016/27/4
    'use strict';

    var unique = 0;
    var eventStorage = {};
    var emojione = window.emojione;
    var readyCallbacks = [];
    function emojioneReady(fn) {
        if (emojione) {
            fn();
        } else {
            readyCallbacks.push(fn);
        }
    };
    var blankImg = 'data:image/gif;base64,R0lGODlhAQABAJH/AP///wAAAMDAwAAAACH5BAEAAAIALAAAAAABAAEAAAICVAEAOw==';
    var setInterval = window.setInterval;
    var clearInterval = window.clearInterval;
    function trigger(self, event, args) {
        htmlresult(self.editor[0]);
        var result = true, j = 1;
        if (event) {
            event = event.toLowerCase();
            do {
                var _event = j == 1 ? '@' + event : event;
                if (eventStorage[self.id][_event] && eventStorage[self.id][_event].length) {
                    $.each(eventStorage[self.id][_event], function (i, fn) {
                        return result = fn.apply(self, args || []) !== false;
                    });
                }
            } while (result && !!j--);
        }
        return result;
    }
    var slice = [].slice;
    function attach(self, element, events, target) {
        target = target || function (event, callerEvent) { return $(callerEvent.currentTarget) };

        $.each($.isArray(element) ? element : [element], function (i, el) {
            $.each(events, function (event, handler) {
                $(el).on(event = $.isArray(events) ? handler : event, function () {
                    var _target = $.isFunction(target) ? target.apply(self, [event].concat(slice.call(arguments))) : target;
                    if (_target) {
                        trigger(self, handler, [_target].concat(slice.call(arguments)));
                    }
                });
            });
        });
    }
    var emojioneList = [];
    var emojioneVersion = window.emojioneVersion || '1.5.2';
    var emojioneSupportMode = 0;
    function getTemplate(template, unicode, shortname) {
        return template
            .replace('{name}', shortname || '')
            .replace('{img}', emojione.imagePathPNG + (emojioneSupportMode !== 1 ? unicode.toUpperCase() : unicode) + '.png'/* + emojione.cacheBustParam*/)
            .replace('{uni}', emojioneSupportMode < 1 ? unicode.toUpperCase() : unicode)
            .replace('{alt}', emojione.convert(unicode));
    }
    function shortnameTo(str, template) {
        return str.replace(/:?[\w_]+:?/g, function (shortname) {
            shortname = ":" + shortname.replace(/:$/, '').replace(/^:/, '') + ":";
            if (shortname in emojioneList) {
                return getTemplate(template, emojioneList[shortname][emojioneList[shortname].length - 1], shortname);
            }
            return shortname;
        });
    };
    function pasteHtmlAtCaret(html) {
        //html = html.replaceAlll("&gt;", "»‌");
        //html = html.replaceAlll("&lt;", "«‌");
        //html = html.replaceAlll("&nbsp;", " ");
        var editor = $(window.getSelection()["anchorNode"]).parents(".emojionearea-editor")[0];
        if (editor == undefined) {
            if (window.oldEditor == undefined) {
                window.oldEditor = $(getSelection()["anchorNode"]);
            }
            editor = window.oldEditor;
        } else {
            window.oldEditor = editor;
        }
        var sel, range;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();
                var el = document.createElement("div");
                el.innerHTML = html;

                var frag = document.createDocumentFragment(), node, lastNode;
                while ((node = el.firstChild)) {
                    lastNode = frag.appendChild(node);
                }
                range.insertNode(frag);
                if (lastNode) {
                    range = range.cloneRange();
                    range.setStartAfter(lastNode);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        } else if (document.selection && document.selection.type != "Control") {
            document.selection.createRange().pasteHTML(html);
        }
        $(editor).siblings(".emojionearea-tabs").addClass("ea-hidden");
        //htmlresult(editor);
        //controlHtml(editor);
        //checkLength(false,editor);
    }
    var default_options = {
        template: "<editor/><filters/><tabs/>",

        dir: "ltr",
        hasBia: true,
        parentID: "myeditor",
        spellcheck: false,
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        length: 0,
        forUpdate: false,
        placeholder: null,
        container: null,
        hideSource: true,
        autoHideFilters: false,
        shortnames: false,
        useSprite: true,


        filters: {
            people: {
                icon: "yum",
                emoji: "grinning,grin,joy,smiley,smile,sweat_smile,laughing,innocent,smiling_imp,imp,wink,blush," +
                "relaxed,yum,relieved,heart_eyes,sunglasses,smirk,neutral_face,expressionless,unamused,sweat," +
                "pensive,confused,confounded,kissing,kissing_heart,kissing_smiling_eyes,kissing_closed_eyes," +
                "stuck_out_tongue,stuck_out_tongue_winking_eye,stuck_out_tongue_closed_eyes,disappointed,worried," +
                "angry,rage,cry,persevere,triumph,disappointed_relieved,frowning,anguished,fearful,weary," +
                "sleepy,tired_face,grimacing,sob,open_mouth,hushed,cold_sweat,scream,astonished,flushed," +
                "sleeping,dizzy_face,no_mouth,mask,slight_frown,slight_smile,smile_cat,joy_cat,smiley_cat," +
                "heart_eyes_cat,smirk_cat,kissing_cat,pouting_cat,crying_cat_face,scream_cat,footprints," +
                "bust_in_silhouette,busts_in_silhouette,levitate,spy,baby,boy,girl,man,woman,family," +
                "family_mwg,family_mwgb,family_mwbb,family_mwgg,family_wwb,family_wwg,family_wwgb,family_wwbb," +
                "family_wwgg,family_mmb,family_mmg,family_mmgb,family_mmbb,family_mmgg,couple,two_men_holding_hands," +
                "two_women_holding_hands,dancers,bride_with_veil,person_with_blond_hair,man_with_gua_pi_mao," +
                "man_with_turban,older_man,older_woman,cop,construction_worker,princess,guardsman,angel," +
                "santa,ghost,japanese_ogre,japanese_goblin,poop,skull,alien,space_invader,bow," +
                "information_desk_person,no_good,ok_woman,raising_hand,person_with_pouting_face,person_frowning," +
                "massage,haircut,couple_with_heart,couple_ww,couple_mm,couplekiss,kiss_ww,kiss_mm,raised_hands," +
                "clap,ear,eye,eyes,nose,lips,kiss,tongue,nail_care,wave,thumbsup,thumbsdown," +
                "point_up,point_up_2,point_down,point_left,point_right,ok_hand,v,punch,fist,raised_hand," +
                "muscle,open_hands,writing_hand,hand_splayed,middle_finger,vulcan,pray"
            },

            nature: {
                icon: "whale",
                emoji: "seedling,evergreen_tree,deciduous_tree,palm_tree,cactus,tulip,cherry_blossom,rose,hibiscus," +
                "sunflower,blossom,bouquet,ear_of_rice,herb,four_leaf_clover,maple_leaf,fallen_leaf,leaves," +
                "mushroom,chestnut,rat,mouse2,mouse,hamster,ox,water_buffalo,cow2,cow,tiger2,leopard," +
                "tiger,chipmunk,rabbit2,rabbit,cat2,cat,racehorse,horse,ram,sheep,goat,rooster,chicken," +
                "baby_chick,hatching_chick,hatched_chick,bird,penguin,elephant,dromedary_camel,camel,boar,pig2," +
                "pig,pig_nose,dog2,poodle,dog,wolf,bear,koala,panda_face,monkey_face,see_no_evil,hear_no_evil," +
                "speak_no_evil,monkey,dragon,dragon_face,crocodile,snake,turtle,frog,whale2,whale,dolphin," +
                "octopus,fish,tropical_fish,blowfish,shell,snail,bug,ant,bee,beetle,spider,spider_web,feet," +
                "zap,fire,crescent_moon,sunny,partly_sunny,cloud,cloud_rain,cloud_snow,cloud_lightning,cloud_tornado," +
                "droplet,sweat_drops,umbrella,fog,dash,snowflake,star2,star,stars,sunrise_over_mountains,sunrise," +
                "rainbow,ocean,volcano,milky_way,mount_fuji,japan,globe_with_meridians,earth_africa,earth_americas," +
                "earth_asia,new_moon,waxing_crescent_moon,first_quarter_moon,waxing_gibbous_moon,full_moon," +
                "waning_gibbous_moon,last_quarter_moon,waning_crescent_moon,new_moon_with_face,full_moon_with_face," +
                "first_quarter_moon_with_face,last_quarter_moon_with_face,sun_with_face,wind_blowing_face"
            },

            food_drink: {
                icon: "cherries",
                emoji: "tomato,eggplant,corn,sweet_potato,hot_pepper,grapes,melon,watermelon,tangerine,lemon," +
                "banana,pineapple,apple,green_apple,pear,peach,cherries,strawberry,hamburger,pizza,meat_on_bone," +
                "poultry_leg,rice_cracker,rice_ball,rice,curry,ramen,spaghetti,bread,fries,dango,oden,sushi," +
                "fried_shrimp,fish_cake,icecream,shaved_ice,ice_cream,doughnut,cookie,chocolate_bar,candy," +
                "lollipop,custard,honey_pot,cake,bento,stew,egg,fork_and_knife,tea,coffee,sake,wine_glass," +
                "cocktail,tropical_drink,beer,beers,baby_bottle"
            },

            celebration: {
                icon: "tada",
                emoji: "ribbon,gift,birthday,jack_o_lantern,christmas_tree,tanabata_tree,bamboo,rice_scene," +
                "fireworks,sparkler,tada,confetti_ball,balloon,dizzy,sparkles,boom,mortar_board,crown," +
                "reminder_ribbon,military_medal,dolls,flags,wind_chime,crossed_flags,izakaya_lantern,ring," +
                "heart,broken_heart,love_letter,two_hearts,revolving_hearts,heartbeat,heartpulse,sparkling_heart," +
                "cupid,gift_heart,heart_decoration,purple_heart,yellow_heart,green_heart,blue_heart"
            },

            activity: {
                icon: "trophy",
                emoji: "runner,walking,dancer,lifter,golfer,rowboat,swimmer,surfer,bath,snowboarder,ski," +
                "snowman,bicyclist,mountain_bicyclist,motorcycle,race_car,horse_racing,tent,fishing_pole_and_fish," +
                "soccer,basketball,football,baseball,tennis,rugby_football,golf,trophy,medal,running_shirt_with_sash," +
                "checkered_flag,musical_keyboard,guitar,violin,saxophone,trumpet,musical_note,notes,musical_score," +
                "headphones,microphone,performing_arts,ticket,tophat,circus_tent,clapper,film_frames,tickets," +
                "art,dart,8ball,bowling,slot_machine,game_die,video_game,flower_playing_cards,black_joker," +
                "mahjong,carousel_horse,ferris_wheel,roller_coaster"
            },

            travel: {
                icon: "rocket",
                emoji: "railway_car,mountain_railway,steam_locomotive,train,monorail,bullettrain_side," +
                "bullettrain_front,train2,metro,light_rail,station,tram,railway_track,bus,oncoming_bus," +
                "trolleybus,minibus,ambulance,fire_engine,police_car,oncoming_police_car,rotating_light,taxi," +
                "oncoming_taxi,red_car,oncoming_automobile,blue_car,truck,articulated_lorry,tractor,bike," +
                "motorway,busstop,fuelpump,construction,vertical_traffic_light,traffic_light,rocket,helicopter," +
                "airplane,airplane_small,airplane_departure,airplane_arriving,seat,anchor,ship,cruise_ship," +
                "motorboat,speedboat,sailboat,aerial_tramway,mountain_cableway,suspension_railway," +
                "passport_control,customs,baggage_claim,left_luggage,yen,euro,pound,dollar,bellhop,bed," +
                "couch,fork_knife_plate,shopping_bags,statue_of_liberty,moyai,foggy,tokyo_tower,fountain," +
                "european_castle,japanese_castle,classical_building,stadium,mountain_snow,camping,beach," +
                "desert,island,park,cityscape,city_sunset,city_dusk,night_with_stars,bridge_at_night,house," +
                "homes,house_with_garden,house_abandoned,contruction_site,office,department_store,factory," +
                "post_office,european_post_office,hospital,bank,hotel,love_hotel,wedding,church," +
                "convenience_store,school,map"
            },

            objects_symbols: {
                icon: "paperclips",
                emoji: "watch,iphone,calling,computer,desktop,keyboard,trackball,printer,alarm_clock,clock," +
                "hourglass_flowing_sand,hourglass,camera,camera_with_flash,video_camera,movie_camera,projector," +
                "tv,microphone2,level_slider,control_knobs,radio,pager,joystick,telephone_receiver,telephone," +
                "fax,minidisc,floppy_disk,cd,dvd,vhs,battery,electric_plug,bulb,flashlight,candle,satellite," +
                "satellite_orbital,credit_card,money_with_wings,moneybag,gem,closed_umbrella,pouch,purse," +
                "handbag,briefcase,school_satchel,lipstick,eyeglasses,dark_sunglasses,womans_hat,sandal," +
                "high_heel,boot,mans_shoe,athletic_shoe,bikini,dress,kimono,womans_clothes,shirt,necktie," +
                "jeans,door,shower,bathtub,toilet,barber,syringe,pill,microscope,telescope,crystal_ball," +
                "wrench,knife,dagger,nut_and_bolt,hammer,tools,oil,bomb,smoking,gun,bookmark,newspaper," +
                "newspaper2,thermometer,label,key,key2,envelope,envelope_with_arrow,incoming_envelope,email," +
                "inbox_tray,outbox_tray,package,postal_horn,postbox,mailbox_closed,mailbox,mailbox_with_no_mail," +
                "mailbox_with_mail,page_facing_up,page_with_curl,bookmark_tabs,wastebasket,notepad_spiral," +
                "chart_with_upwards_trend,chart_with_downwards_trend,bar_chart,date,calendar,calendar_spiral," +
                "ballot_box,low_brightness,high_brightness,compression,frame_photo,scroll,clipboard,book," +
                "notebook,notebook_with_decorative_cover,ledger,closed_book,green_book,blue_book,orange_book," +
                "books,card_index,dividers,card_box,link,paperclip,paperclips,pushpin,scissors," +
                "triangular_ruler,round_pushpin,straight_ruler,triangular_flag_on_post,flag_white,flag_black," +
                "hole,file_folder,open_file_folder,file_cabinet,black_nib,pencil2,pen_ballpoint,pen_fountain," +
                "paintbrush,crayon,pencil,lock_with_ink_pen,closed_lock_with_key,lock,unlock,mega,loudspeaker," +
                "speaker,sound,loud_sound,mute,zzz,bell,no_bell,cross_heavy,om_symbol,dove,thought_balloon," +
                "speech_balloon,anger_right,children_crossing,shield,mag,mag_right,speaking_head," +
                "sleeping_accommodation,no_entry_sign,no_entry,name_badge,no_pedestrians,do_not_litter," +
                "no_bicycles,non_potable_water,no_mobile_phones,underage,sparkle,eight_spoked_asterisk," +
                "negative_squared_cross_mark,white_check_mark,eight_pointed_black_star,vibration_mode," +
                "mobile_phone_off,vs,a,b,ab,cl,o2,sos,id,parking,wc,cool,free,new,ng,ok,up,atm," +
                "aries,taurus,gemini,cancer,leo,virgo,libra,scorpius,sagittarius,capricorn,aquarius," +
                "pisces,restroom,mens,womens,baby_symbol,wheelchair,potable_water,no_smoking," +
                "put_litter_in_its_place,arrow_forward,arrow_backward,arrow_up_small,arrow_down_small," +
                "fast_forward,rewind,arrow_double_up,arrow_double_down,arrow_right,arrow_left,arrow_up," +
                "arrow_down,arrow_upper_right,arrow_lower_right,arrow_lower_left,arrow_upper_left,arrow_up_down," +
                "left_right_arrow,arrows_counterclockwise,arrow_right_hook,leftwards_arrow_with_hook," +
                "arrow_heading_up,arrow_heading_down,twisted_rightwards_arrows,repeat,repeat_one,hash," +
                "zero,one,two,three,four,five,six,seven,eight,nine,keycap_ten,1234,abc,abcd,capital_abcd," +
                "information_source,signal_strength,cinema,symbols,heavy_plus_sign,heavy_minus_sign,wavy_dash," +
                "heavy_division_sign,heavy_multiplication_x,heavy_check_mark,arrows_clockwise,tm,copyright," +
                "registered,currency_exchange,heavy_dollar_sign,curly_loop,loop,part_alternation_mark," +
                "exclamation,question,grey_exclamation,grey_question,bangbang,interrobang,x,o,100,end," +
                "back,on,top,soon,cyclone,m,ophiuchus,six_pointed_star,beginner,trident,warning," +
                "hotsprings,rosette,recycle,anger,diamond_shape_with_a_dot_inside,spades,clubs,hearts," +
                "diamonds,ballot_box_with_check,white_circle,black_circle,radio_button,red_circle," +
                "large_blue_circle,small_red_triangle,small_red_triangle_down,small_orange_diamond," +
                "small_blue_diamond,large_orange_diamond,large_blue_diamond,black_small_square," +
                "white_small_square,black_large_square,white_large_square,black_medium_square,white_medium_square," +
                "black_medium_small_square,white_medium_small_square,black_square_button,white_square_button," +
                "clock1,clock2,clock3,clock4,clock5,clock6,clock7,clock8,clock9,clock10,clock11," +
                "clock12,clock130,clock230,clock330,clock430,clock530,clock630,clock730,clock830,clock930," +
                "clock1030,clock1130,clock1230"
            },

            flags: {
                icon: "triangular_flag_on_post",
                emoji: "au,at,be,br,ca,flag_cl,cn,co,dk,fi,fr,de,hk,in,flag_id,ie,il,it,jp,kr,mo," +
                "my,mx,nl,nz,no,ph,pl,pt,pr,ru,flag_sa,sg,za,es,se,ch,tr,gb,us,ae,vn,af,al,dz," +
                "ad,ao,ai,ag,ar,am,aw,ac,az,bs,bh,bd,bb,by,bz,bj,bm,bt,bo,ba,bw,bn,bg,bf,bi," +
                "kh,cm,cv,ky,cf,km,flag_cd,cg,td,cr,ci,hr,cu,cy,cz,dj,dm,do,tl,ec,eg,sv,gq,er," +
                "ee,et,fk,fo,fj,pf,ga,gm,ge,gh,gi,gr,gl,gd,gu,gt,gn,gw,gy,ht,hn,hu,is,ir,iq,jm," +
                "je,jo,kz,ke,ki,xk,kw,kg,la,lv,lb,ls,lr,ly,li,lt,lu,mk,mg,mw,mv,ml,mt,mh,mr,mu," +
                "fm,md,mc,mn,me,ms,ma,mz,mm,na,nr,np,nc,ni,ne,flag_ng,nu,kp,om,pk,pw,ps,pa,pg," +
                "py,pe,qa,ro,rw,sh,kn,lc,vc,ws,sm,st,sn,rs,sc,sl,sk,si,sb,so,lk,sd,sr,sz,sy,tw,tj," +
                "tz,th,tg,to,tt,tn,flag_tm,flag_tv,vi,ug,ua,uy,uz,vu,va,ve,wf,eh,ye,zm,zw"
            }
        }
    };
    function getOptions(options) {
        options = $.extend({}, default_options, options);

        if (emojioneSupportMode > 0) {
            options.filters.people.emoji = options.filters.people.emoji
                .replace(",writing_hand,", ",");
            options.filters.travel.emoji = options.filters.travel.emoji
                .replace(",contruction_site,", ",construction_site,");
            options.filters.objects_symbols.emoji = options.filters.objects_symbols.emoji
                .replace(",keycap_ten,", ",ten,")
                .replace(",cross_heavy,", ",cross,");
        }

        return options;
    }

    var saveSelection, restoreSelection;
    if (window.getSelection && document.createRange) {
        saveSelection = function (el) {
            var range = window.getSelection().getRangeAt(0);
            var preSelectionRange = range.cloneRange();
            preSelectionRange.selectNodeContents(el);
            preSelectionRange.setEnd(range.startContainer, range.startOffset);
            return preSelectionRange.toString().length;     //   get

        };

        restoreSelection = function (el, sel) {
            var charIndex = 0, range = document.createRange();
            range.setStart(el, 0);
            range.collapse(true);
            var nodeStack = [el], node, foundStart = false, stop = false;

            while (!stop && (node = nodeStack.pop())) {
                if (node.nodeType == 3) {
                    var nextCharIndex = charIndex + node.length;
                    if (!foundStart && sel >= charIndex && sel <= nextCharIndex) {
                        range.setStart(node, sel - charIndex);
                        range.setEnd(node, sel - charIndex);
                        stop = true;
                    }
                    charIndex = nextCharIndex;
                } else {
                    var i = node.childNodes.length;
                    while (i--) {
                        nodeStack.push(node.childNodes[i]);
                    }
                }
            }
            sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }
    } else if (document.selection && document.body.createTextRange) {
        saveSelection = function (el) {
            var selectedTextRange = document.selection.createRange(),
                preSelectionTextRange = document.body.createTextRange();
            preSelectionTextRange.moveToElementText(el);
            preSelectionTextRange.setEndPoint("EndToStart", selectedTextRange);
            var start = preSelectionTextRange.text.length;
            return start + selectedTextRange.text.length;
        };

        restoreSelection = function (el, sel) {
            var textRange = document.body.createTextRange();
            textRange.moveToElementText(el);
            textRange.collapse(true);
            textRange.moveEnd("character", sel);
            textRange.moveStart("character", sel);
            textRange.select();
        };
    }


    var uniRegexp = 0;
    //var cdn_base = "https://cdnjs.cloudflare.com/ajax/libs/emojione/2.1.4/lib/js/emojione.min.js";
    //var cdn_base = "https://cdnjs.cloudflare.com/ajax/libs/emojione/";
    var cdn_base = "/vendor";
    function detectSupportMode() {
        return (typeof emojione['jsEscapeMap']).toLowerCase() === 'object' ? emojione.cacheBustParam === "?v=1.2.4" ? 2 : 1 : 0;
    }
    if (!emojione) {
        $.getScript(cdn_base + "/emojione.js", function () {
            emojione = window.emojione;
            emojioneSupportMode = detectSupportMode();
            cdn_base += "/assets";
            var sprite = cdn_base + "/sprites/emojione.sprites.css";
            if (document.createStyleSheet) {
                document.createStyleSheet(sprite);
            } else {
                $('<link/>', { rel: 'stylesheet', href: sprite }).appendTo('head');
            }
            while (readyCallbacks.length) {
                readyCallbacks.shift().call();
            }
        });
    } else {
        emojioneSupportMode = detectSupportMode();
        cdn_base += (emojioneSupportMode > 0 ? emojioneSupportMode > 1 ? '2.0.0' : '2.1.1' : '1.5.2') + "/assets";
    }

    emojioneReady(function () {
        console.log("milad");
        emojione.imagePathPNG = cdn_base + "/png/";
        emojione.imagePathSVG = cdn_base + "/svg/";
        emojione.imagePathSVGSprites = cdn_base + "/sprites/emojione.sprites.svg";

        $.each(emojione.emojioneList, function (shortname, keys) {
            // fix shortnames for emojione v1.5.0
            emojioneList[shortname.replace('-', '_')] = keys;
        });

        uniRegexp = new RegExp("<object[^>]*>.*?<\/object>|<span[^>]*>.*?<\/span>|<(?:object|embed|svg|img|div|span|p|a)[^>]*>|(" +
            emojione.unicodeRegexp + ")", "gi");
    });
    function unicodeTo(str, template) {
        return str.replace(uniRegexp, function (unicodeChar) {
            var map = emojione[(emojioneSupportMode < 1 ? 'jsecapeMap' : 'jsEscapeMap')];
            if (typeof unicodeChar !== 'undefined' && unicodeChar in map) {
                return getTemplate(template, map[unicodeChar]);
            }
            return unicodeChar;
        });
    }
    function htmlFromText(str, self) {
        str = str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/`/g, '&#x60;')
            .replace(/(?:\r\n|\r|\n)/g, '\n')
            .replace(/(\n+)/g, '<div>$1</div>')
            .replace(/\n/g, '<br/>')
            .replace(/<br\/><\/div>/g, '</div>');
        if (self.shortnames) {
            str = emojione.shortnameToUnicode(str);
        }
        return unicodeTo(str,
            '<img alt="{alt}" class="emojione' + (self.sprite ? '-{uni}" src="' + blankImg + '">' : '" src="{img}">'))
            .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
            .replace(/  /g, '&nbsp;&nbsp;');
    }
    function textFromHtml(str, self) {
        str = str
            .replace(/<img[^>]*alt="([^"]+)"[^>]*>/ig, '$1')
            .replace(/\n|\r/g, '')
            .replace(/<br[^>]*>/ig, '\n')
            .replace(/(?:<(?:div|p|ol|ul|li|pre|code|object)[^>]*>)+/ig, '<div>')
            .replace(/(?:<\/(?:div|p|ol|ul|li|pre|code|object)>)+/ig, '</div>')
            .replace(/\n<div><\/div>/ig, '\n')
            .replace(/<div><\/div>\n/ig, '\n')
            .replace(/(?:<div>)+<\/div>/ig, '\n')
            .replace(/([^\n])<\/div><div>/ig, '$1\n')
            .replace(/(?:<\/div>)+/ig, '</div>')
            .replace(/([^\n])<\/div>([^\n])/ig, '$1\n$2')
            .replace(/<\/div>/ig, '')
            .replace(/([^\n])<div>/ig, '$1\n')
            .replace(/\n<div>/ig, '\n')
            .replace(/<div>\n/ig, '\n\n')
            .replace(/<(?:[^>]+)?>/g, '')
            .replace(/&#8291;/g, '')
            .replace(/&nbsp;/g, ' ')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#x27;/g, "'")
            .replace(/&#x60;/g, '`')
            .replace(/&amp;/g, '&');
        return self && self.shortnames ? emojione.toShort(str) : str;
    }
    function init(self, source, options) {

        var nameOfVariable = "";
        nameOfVariable = options.parentID.toString();
        window[nameOfVariable] = {};
        $(source[0]).parent().attr("id", nameOfVariable);
        // has bia
        if (options.hasBia != undefined && options.hasBia == false) {
            $(source[0]).parent().find("button[data-keys=keys]").remove();
            //myCodVariabe.hasBia = options.hasBia;
            default_options.hasBia = options.hasBia;
        } else {
            //myCodVariabe.hasBia = default_options.hasBia;
            default_options.hasBia = true;
            options.hasBia = true;
        }
        //  dir
        if (options.dir != undefined && options.dir == "rtl") {
            //myCodVariabe.dir = options.dir;
            default_options.dir = options.dir;
            $(source[0]).parent().css("direction", "rtl")
        } else {
            //myCodVariabe.dir = default_options.dir;
            default_options.dir = "ltr";
            options.dir = "ltr";
            $(source[0]).parent().css("direction", "ltr")
        }
        if (options.length != undefined && options.length > 0) {
            //myCodVariabe.length = options.length;
            default_options.length = options.length;
            $(source[0]).parent().find(".toolgram-editor-remaining").text(options.length);
        } else {
            // $(source[0]).parent().find("#toolgram-editor-remaining").parent().remove();
            default_options.length = 0;
            options.length = 0;
            $(source[0]).parent().find(".toolgram-editor-remaining").parent().remove();
        }
        if (options.forUpdate != undefined && options.forUpdate) {
            //myCodVariabe.forUpdate = options.forUpdate;
            default_options.forUpdate = options.forUpdate;
        } else {
            default_options.forUpdate = false;
            options.forUpdate = false;
        }
        window[nameOfVariable] = options;

        eventHandler();

        // endtodo vahid    2016 / 27 / 4


        options = getOptions(options);

        var sourceValFunc = source.is("TEXTAREA") || source.is("INPUT") ? "val" : "text",
            app = options.template,
            stayFocused = false,
            container = !!options.container ? $(options.container) : false,
            editor, filters, tabs, scrollArea, filtersBtns, filtersArrowLeft, filtersArrowRight,
            filtersWidth, scrollLeft = 0, scrollAreaWidth = 0, filterWidth,
            resizeHandler = function () {
                var width = filters.width();
                if (width !== filtersWidth) {
                    filtersWidth = width;
                    trigger(self, 'resize', [editor]);
                }
            }, resizeHandlerID,
            hide = function (e) {
                return e.addClass("ea-hidden");
            },
            show = function (e) {
                return e.removeClass("ea-hidden");
            };

        self.sprite = options.useSprite;
        self.shortnames = options.shortnames;

        for (var el = ["editor", "filters", "tabs"], i = 0; i < 3; i++) {
            app = app.replace(new RegExp('<' + el[i] + '/?>', 'i'), '<div class="emojionearea-' + el[i] + '"></div>');
        }

        app = $('<div/>', { "class": source.attr("class"), role: "application" }).addClass("emojionearea").html(app);
        editor = self.editor = app.find(".emojionearea-editor")
            .attr({
                contenteditable: true,
                placeholder: options["placeholder"] || source.data("placeholder") || source.attr("placeholder") || "",
                tabindex: 0
            });

        for (var attr = ["dir", "spellcheck", "autocomplete", "autocorrect", "autocapitalize"], j = 0; j < 5; j++) {
            editor.attr(attr[j], options[attr[j]]);
        }

        filters = app.find(".emojionearea-filters");
        if (options.autoHideFilters) {
            hide(filters);
        }

        tabs = app.find(".emojionearea-tabs");
        hide(tabs);

        $.each(options.filters, function (filter, params) {
            $("<i/>", { "class": "emojionearea-filter", "data-filter": filter })
                .wrapInner(shortnameTo(params.icon, self.sprite ? '<i class="emojione-{uni}"/>' : '<img class="emojione" src="{img}"/>'))
                .appendTo(filters);
            hide($("<div/>", { "class": "emojionearea-tab emojionearea-tab-" + filter }))
                .data("items", shortnameTo(params.emoji, '<i class="emojibtn" role="button"><' +
                    (self.sprite ? 'i class="emojione-{uni}"' : 'img class="emojione" src="{img}"') +
                    ' data-name="{name}"/></i>'))
                .appendTo(tabs);
        });
        var emojioneareaFiltersFcrollCss = "";
        if (options.dir === "rtl") {
            emojioneareaFiltersFcrollCss = "right:0;left:auto";
        }
        filters.wrapInner('<div class="emojionearea-filters-scroll" style=' + emojioneareaFiltersFcrollCss + '/>');
        filtersArrowLeft = $('<i class="emojionearea-filter-arrow-left"/>', { role: "button" }).appendTo(filters);
        filtersArrowRight = $('<i class="emojionearea-filter-arrow-right"/>', { role: "button" }).appendTo(filters);

        filtersBtns = filters.find(".emojionearea-filter");
        scrollArea = filters.children(".emojionearea-filters-scroll");

        if (!!container) {
            container.wrapInner(app);
        } else {
            app.insertAfter(source);
        }

        if (options.hideSource) {
            source.hide();
        }
        self.setText(source[sourceValFunc]());
        attach(self, [filters, tabs], { mousedown: "area.mousedown" }, editor);
        attach(self, editor, { paste: "editor.paste" }, editor);
        attach(self, editor, ["focus", "blur"], function () { return !!stayFocused ? false : editor; });
        attach(self, [editor, filters, tabs], ["mousedown", "mouseup", "click", "keyup", "keydown", "keypress"], editor);
        attach(self, filters.find(".emojionearea-filter"), { click: "filter.click" });
        attach(self, filtersArrowLeft, { click: "arrowLeft.click", mousedown: "arrowLeft.mousedown", mouseup: "arrowLeft.mouseup" });
        attach(self, filtersArrowRight, { click: "arrowRight.click", mousedown: "arrowRight.mousedown", mouseup: "arrowRight.mouseup" });

        var mousedownInterval;
        function clearMousedownInterval() {
            if (mousedownInterval) {
                clearInterval(mousedownInterval);
            }
        }
        if (options.forUpdate) {
            controlHtml(self.editor[0]);
        }
        function scrollFilters() {
            if (!scrollAreaWidth) {
                $.each(filtersBtns, function (i, e) {
                    scrollAreaWidth += $(e).outerWidth(true);
                });
                filterWidth = filtersBtns.eq(0).outerWidth(true);
            }
            if (scrollAreaWidth > filtersWidth) {
                filtersArrowRight.addClass("active");
                filtersArrowLeft.addClass("active");

                if (scrollLeft + scrollAreaWidth <= filtersWidth) {
                    scrollLeft = filtersWidth - scrollAreaWidth;
                    filtersArrowRight.removeClass("active");
                    clearMousedownInterval();
                } else if (scrollLeft >= 0) {
                    scrollLeft = 0;
                    filtersArrowLeft.removeClass("active");
                    clearMousedownInterval();
                }
                scrollArea.css("left", scrollLeft);
            } else {
                clearMousedownInterval();
                if (scrollLeft !== 0) {
                    scrollLeft = 0;
                    scrollArea.css("left", scrollLeft);
                }
                filtersArrowRight.removeClass("active");
                filtersArrowLeft.removeClass("active");
            }
        }
        function filterScrollLeft(val) {
            val = val | filterWidth;
            scrollLeft += val;
            scrollFilters();
        }
        function filterScrollRight(val) {
            val = val | filterWidth;
            scrollLeft -= val;
            scrollFilters();
        }

        if (typeof options.events === 'object' && !$.isEmptyObject(options.events)) {
            $.each(options.events, function (event, handler) {
                self.on(event.replace(/_/g, '.'), handler);
            });
        }

        self.on("@filter.click", function (element) {
            if (element.is(".active")) {
                element.removeClass("active");
                hide(tabs);
            } else {
                filtersBtns.filter(".active").removeClass("active");
                element.addClass("active");
                var i, timer, tab = show(hide(show(tabs).children())
                        .filter(".emojionearea-tab-" + element.data("filter"))),
                    items = tab.data("items"),
                    event = { click: "emojibtn.click" };
                if (items) {
                    tab.data("items", false);
                    items = items.split(',');
                    if (self.sprite) {
                        tab.html(items.join(''));
                        attach(self, tab.find(".emojibtn"), event);
                    } else {
                        timer = setInterval(function () {
                            for (i = 0; i < 20 && items.length; i++) {
                                tab.append(items.shift());
                            }
                            attach(self, tab.find(".emojibtn").not(".handled").addClass("handled"), event);
                            if (!items.length) clearInterval(timer);
                        }, 5);
                    }
                }
            }
        })

            .on("@resize", function () {
                scrollFilters();
            })

            .on("@arrowLeft.click", filterScrollLeft)
            .on("@arrowRight.click", filterScrollRight)
            .on("@arrowLeft.mousedown", function () {
                mousedownInterval = setInterval(function () { filterScrollLeft(5); }, 50);
            })
            .on("@arrowRight.mousedown", function () {
                mousedownInterval = setInterval(function () { filterScrollRight(5); }, 50);
            })
            .on("@arrowLeft.mouseup @arrowRight.mouseup", clearMousedownInterval)

            .on("@editor.paste", function (element) {
                stayFocused = true;
                // inserts invisible character for fix caret
                pasteHtmlAtCaret('<span>&#8291;</span>');

                var sel = saveSelection(element[0]),
                    editorScrollTop = element.scrollTop(),
                    clipboard = $("<div/>", { contenteditable: true })
                        .css({ position: "fixed", left: "-999px", width: "1px", height: "1px", top: "20px", overflow: "hidden" })
                        .appendTo($("BODY"))
                        .focus();
                ;
                window.setTimeout(function () {
                    var caretID = "caret-" + (new Date()).getTime();
                    element.focus();
                    restoreSelection(element[0], sel);
                    var text = textFromHtml(clipboard.html().replace(/\r\n|\n|\r/g, '<br>'), self),
                        html = htmlFromText(text, self);
                    pasteHtmlAtCaret(html);
                    clipboard.remove();
                    pasteHtmlAtCaret('<i id="' + caretID + '"></i>');
                    element.scrollTop(editorScrollTop);
                    var caret = $("#" + caretID),
                        top = caret.offset().top - element.offset().top,
                        height = element.height();
                    if (editorScrollTop + top >= height || editorScrollTop > top) {
                        element.scrollTop(editorScrollTop + top - 2 * height / 3);
                    }
                    caret.remove();
                    stayFocused = false;
                    trigger(self, 'paste', [element, text, html]);
                }, 200);
            })

            .on("@emojibtn.click", function (element) {
                saveSelection(editor[0]);
                pasteHtmlAtCaret(shortnameTo(element.children().data("name"),
                    '<img alt="{alt}" class="emojione' + (self.sprite ? '-{uni}" src="' + blankImg + '">' : '" src="{img}">')));
            })

            .on("@area.mousedown", function (element, event) {
                if (!options.autoHideFilters && !app.is(".focused")) {
                    element.focus();
                }
                event.preventDefault();
                return false;
            })

            .on("@change", function (element) {
                var html = element.html().replace(/<\/?(?:div|span|p)[^>]*>/ig, '');
                // clear input, fix: chrome add <br> on contenteditable is empty
                if (!html.length || /^<br[^>]*>$/i.test(html)) {
                    self.setText('', false);
                }
                source[sourceValFunc](self.getText());
            })

            .on("@focus", function () {
                resizeHandler();
                resizeHandlerID = setInterval(resizeHandler, 500);
                app.addClass("focused");
                if (options.autoHideFilters) {
                    show(filters);
                }
            })

            .on("@blur", function (element) {
                scrollLeft = 0;
                scrollFilters();
                app.removeClass("focused");
                clearInterval(resizeHandlerID);
                if (options.autoHideFilters) {
                    hide(filters);
                }
                filtersBtns.filter(".active").removeClass("active");
                hide(tabs);
                var content = element.html();
                if (self.content !== content) {
                    self.content = content;
                    trigger(self, 'change', [editor]);
                    source.blur().trigger("change");
                } else {
                    source.blur();
                }
            });
        // --------------------------------------------------
        if (options.forUpdate) {
            var ed = $(source[0]).parent().find(".emojionearea-editor")[0];
            checkLength(false, ed);
        }


        //--------------------------------------------------------------
        trigger(self, 'ready', [editor]);
    };

    var EmojioneArea = function (element, options) {
        var self = this;
        eventStorage[self.id = ++unique] = {};
        emojioneReady(function () {
            init(self, element, options);
        });
    };

    EmojioneArea.prototype.on = function (events, handler) {
        if (events && $.isFunction(handler)) {
            var id = this.id;
            $.each(events.toLowerCase().split(' '), function (i, event) {
                (eventStorage[id][event] || (eventStorage[id][event] = [])).push(handler);
            });
        }
        return this;
    };

    EmojioneArea.prototype.off = function (events, handler) {
        if (events) {
            var id = this.id;
            $.each(events.toLowerCase().replace(/_/g, '.').split(' '), function (i, event) {
                if (eventStorage[id][event] && !/^@/.test(event)) {
                    if (handler) {
                        $.each(eventStorage[id][event], function (j, fn) {
                            if (fn === handler) {
                                eventStorage[id][event] = eventStorage[id][event].splice(j, 1);
                            }
                        });
                    } else {
                        eventStorage[id][event] = [];
                    }
                }
            });
        }
        return this;
    };

    EmojioneArea.prototype.setText = function (str) {

        var self = this, args = arguments;
        emojioneReady(function () {
            self.editor.html(htmlFromText(str, self));
            var parentId = $(self.editor[0]).parents(".toolgram-editor").attr("id");
            if (window[parentId].forUpdate != undefined && window[parentId].forUpdate) { //2016
                areaToEditor(self.editor[0]);
            }
            self.content = self.editor.html();
            if (args.length === 1) {
                trigger(self, 'change', [self.editor]);
            }
        });
    }

    EmojioneArea.prototype.getText = function () {
        return textFromHtml(this.editor.html(), this);
    }

    $.fn.emojioneArea = function (options) {
        return this.each(function () {
            if (!!this.emojioneArea) return this.emojioneArea;
            $.data(this, 'emojioneArea', this.emojioneArea = new EmojioneArea($(this), options));
            return this.emojioneArea;
        });
    };

})(document, window, jQuery);