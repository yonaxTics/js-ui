/*!
 * js-ui.js
 * Copyright 2014 YonaxTics, Inc.
 * Licensed under http://www.apache.org/licenses/LICENSE-2.0
 */
/* ========================================================================
 * js-ui.js
 * yonax73@gmail.com
 * ========================================================================
 * Copyright 2014 yonaxTics, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */
/*
 * ========================================================================
 * This project is dedicated at  all my loved ones, in special a my mother and my wife <3.
 * ========================================================================
 */
/*
 * ========================================================================
 * Author  : Yonatan Alexis Quintero Rodriguez
 * Version : 0.1
 * Date    : 5 Oct 2014
 * ========================================================================
 */
/**
 * NameSpace
 */
var UI = {};




/*
 * ========================================================================
 * UI-Notify
 * Author  : Yonatan Alexis Quintero Rodriguez
 * Version : 0.1
 * Date    : 5 Oct 2014
 * ========================================================================
 */

/*
 * @param HtmlElement
 */
UI.Notify = function (HtmlElement) {

    var button = null;
    var span = null;
    var p = null;
    var i = null;
    var UINotify = null;

    this.init = function () {
        UINotify = this;
        this.close();
        button = document.createElement('button');
        button.className = 'close';
        button.type = 'button';
        button.onclick = function () {
            UINotify.close();
        }
        span = document.createElement('span');
        span.textContent = '×';
        button.appendChild(span);
        HtmlElement.appendChild(button);
        p = document.createElement('p');
        p.className = 'text-center';
        i = document.createElement('i');
        p.appendChild(i);
        strong = document.createElement('strong');
        p.appendChild(strong);
        HtmlElement.appendChild(p);
    }

    this.close = function () {
        HtmlElement.className = 'hidden';
    }


    this.success = function (message) {
        i.className = 'fa fa-smile-o fa-lg pull-left';
        HtmlElement.className = 'alert alert-success alert-dismissible';
        strong.textContent = message;
    }


    this.info = function (message) {
        i.className = 'fa fa-info fa-lg pull-left';
        HtmlElement.className = 'alert alert-info alert-dismissible';
        strong.textContent = message;
    }


    this.warning = function (message) {
        i.className = 'fa fa-exclamation-triangle fa-lg pull-left';
        HtmlElement.className = 'alert alert-warning alert-dismissible';
        strong.textContent = message;
    }


    this.danger = function (message) {
        i.className = 'fa fa-frown-o fa-lg pull-left';
        HtmlElement.className = 'alert alert-danger alert-dismissible';
        strong.textContent = message;
    }


    this.wait = function (message) {
        i.className = 'fa fa-circle-o-notch fa-spin fa-lg pull-left';
        HtmlElement.className = 'alert alert-info alert-dismissible';
        strong.textContent = message;
    }

    this.init();

}




/*
 * ========================================================================
 * UI-DropDownList
 * Author  : Yonatan Alexis Quintero Rodriguez
 * Version : 0.1
 * Date    : 6 Oct 2014
 * ========================================================================
 */
/*
 * @param HtmlElement
 * @param items
 */
UI.DropDownList = function (HtmlElement, items) {

    var span = null;
    var input = null;
    var inputHidden = null;
    var i = null;
    var ul = null;
    var oldItemLi = null;
    var currentItemLi = null;
    var disabled = false;
    var UIDropDownList = null;


    this.init = function () {
        UIDropDownList = this;
        HtmlElement.classList.add('dropdownlist');
        HtmlElement.classList.add('background');
        this.create();
        this.fill();
    }

    this.create = function () {
        span = document.createElement('span');
        input = document.createElement('input');
        ul = document.createElement('ul');
        i = document.createElement('i');
        input.type = 'text';
        input.readOnly = true;
        input.className = 'form-control'
        i.className = 'fa fa-chevron-circle-down';
        input.onchange = function () {
            return true;
        }
        span.appendChild(input);
        span.appendChild(i);

        span.onclick = function () {
            UIDropDownList.toggle();

        }
        span.onkeydown = function checkKey(e) {
            e = e || window.event;
            if (e.keyCode === 9) {
                e.preventDefault();
                UIDropDownList.toggle();
            }
        }
        ul.classList.add('dropdownlist-list');;
        ul.classList.add('hidden');
        inputHidden = document.createElement('input');
        HtmlElement.appendChild(inputHidden);
        inputHidden.type = 'hidden';
        if (HtmlElement.dataset.name !== undefined && HtmlElement.dataset.name !== null) {
            inputHidden.name = HtmlElement.dataset.name;
        }
        HtmlElement.appendChild(span);
        HtmlElement.appendChild(ul);

    }

    this.fill = function () {
        var n = items.length;
        for (var i = 0; i < n; i++) {
            var item = items[i];
            var li = document.createElement('li');
            li.textContent = item.value;
            li.tabIndex = i;
            li.dataset.option = item.option;
            li.onclick = function () {
                UIDropDownList.changeValue(this);
            }
            li.onkeydown = function checkKey(e) {
                e = e || window.event;
                if (e.keyCode === 13) {
                    e.preventDefault();
                    UIDropDownList.changeValue(this);
                }
            }
            ul.appendChild(li);
            if (item.selected) {
                this.selectItem(item.option);
            }
        }
    }

    this.selectItem = function (option) {
        var itemsLi = ul.getElementsByTagName('li');
        var n = itemsLi.length;
        if (n > 0) {
            var flag = true;
            var i = 0;
            do {
                var item = itemsLi[i++];
                if (item.dataset.option == option) {
                    oldItemLi = currentItemLi;
                    currentItemLi = item;
                    flag = false;
                }
            } while (flag && i < n);
        }
        input.value = currentItemLi.textContent;
        input.dataset.option = currentItemLi.dataset.option;
        inputHidden.value = currentItemLi.dataset.option;
        currentItemLi.focus();
        if (oldItemLi != null) {
            oldItemLi.classList.remove('selected');
        }
        currentItemLi.classList.add('selected');
    }

    this.toggle = function () {
        if (!disabled) {
            ul.style.width = span.clientWidth + 'px';
            ul.classList.toggle('hidden');
            currentItemLi.focus();
        }
    }

    this.changeValue = function (li) {
        oldItemLi = currentItemLi;
        currentItemLi = li;
        input.value = li.textContent;
        input.dataset.option = li.dataset.option;
        inputHidden.value = li.dataset.option;
        input.onchange();
        this.toggle();
        li.classList.add('selected');
        oldItemLi.classList.remove('selected');
    }

    this.addItem = function (option, value) {
        var li = document.createElement('li');
        li.textContent = value;
        li.tabIndex = items.length + 1;
        li.dataset.option = option;
        li.onclick = function () {
            UIDropDownList.changeValue(this);
        }
        li.onkeydown = function checkKey(e) {
            e = e || window.event;
            if (e.keyCode === 13) {
                e.preventDefault();
                UIDropDownList.changeValue(this);
            }
        }
        ul.appendChild(li);
    }

    this.getItem = function () {
        return {
            value: input.value,
            option: input.dataset.option
        };
    }


    this.getValue = function () {
        return input.value;
    }


    this.getOption = function () {
        return input.dataset.option;
    }

    this.getItemByOption = function (option) {
        var li = getLiByOption(option);
        if (li != null) {
            return {
                value: li.textContent,
                option: li.dataset.option
            };
        }
        return null;
    }

    this.getItemByValue = function (value) {
        var li = getLiByValue(value);
        if (li != null) {
            return {
                value: li.textContent,
                option: li.dataset.option
            };
        }
        return null;

    }

    this.setDisabled = function (_disabled) {
        disabled = _disabled;
        if (disabled) {
            HtmlElement.classList.remove('background');
            HtmlElement.classList.add('disabled');
        } else {
            HtmlElement.classList.remove('disabled');
            HtmlElement.classList.add('background');
        }
    }

    this.onchange = function (callback) {
        input.onchange = callback;
    };

    function getLiByOption(option) {
        var itemsLi = ul.getElementsByTagName('li');
        var n = itemsLi.length;
        var li = null;
        if (n > 0) {
            var flag = true;
            var i = 0;
            do {
                var item = itemsLi[i++];
                if (item.dataset.option == option) {
                    li = item;
                    flag = false;
                }
            } while (flag && i < n);
        }
        return li;
    }

    function getLiByValue(value) {
        var itemsLi = ul.getElementsByTagName('li');
        var n = itemsLi.length;
        var li = null;
        if (n > 0) {
            var flag = true;
            var i = 0;
            do {
                var item = itemsLi[i++];
                if (item.textContent === value) {
                    li = item;
                    flag = false;
                }
            } while (flag && i < n);
        }
        return li;
    }

    this.init();

}


/*
 *Name space navbar functions
 **/
var NavBarFn = {};

/*
 * create the navbarheader to the navs when is collapse
 * @param collapse object html
 */
NavBarFn.NavBarHeader = function (collapse) {
    this.htmlElement = document.createElement('div');
    this.button = document.createElement('button');
    this.span = document.createElement('span');
    this.button.classList.add('navbar-toggle');
    this.button.classList.add('collapsed');
    this.span.classList.add('sr-only');
    this.span.textContent = 'Toggle navigation';
    this.button.appendChild(this.span);
    for (var i = 3; i > 0; i--) {
        var span = document.createElement('span');
        span.classList.add('icon-bar');
        this.button.appendChild(span);
    };
    this.button.onclick = function () {
        this.classList.toggle('collapsed');
        collapse.classList.toggle('in');
    }
    this.htmlElement.classList.add('navbar-header');
    this.htmlElement.appendChild(this.button);
}

/*
 * settings options for elements type NavBar
 * @param options
 * @param nav
 * @param ul
 */
NavBarFn.NavBarOptions = function (options, nav, ul) {
    if (options) {
        if (options.align === 'right') {
            ul.classList.add('navbar-right');
        }
        if (options.inverse) {
            nav.classList.add('navbar-inverse');
        }
        if (options.type === 'fixed') {
            if (options.position === 'bottom') {
                nav.classList.add('navbar-fixed-bottom');
            } else {
                nav.classList.add('navbar-fixed-top');
            }
        } else if (options.type === 'static') {
            nav.classList.add('navbar-static-top');
        }
    }
}




/*
 * ========================================================================
 * UI-NAVBAR
 * Author  : Yonatan Alexis Quintero Rodriguez
 * Version : 0.1
 * Date    : 6 Oct 2014
 * ========================================================================
 */
/*
 * @param HtmlElement
 * @param link
 * @param links
 * @param options
 */
UI.NavBar = function (HtmlElement, link, links, options) {
    var nav = new Head();
    var n = links.length;

    this.init = function () {
        nav.a.href = link.href;
        nav.a.textContent = link.text;
        for (var i = 0; i < n; i++) {
            var l = links[i];
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.href = l.href;
            a.textContent = l.text;
            if (l.active) {
                li.classList.add('active');
            }
            li.appendChild(a);
            nav.ul.appendChild(li);
        };

        HtmlElement.classList.add('navbar');
        HtmlElement.classList.add('navbar-default');
        NavBarFn.NavBarOptions(options, HtmlElement, nav.ul);
        HtmlElement.appendChild(nav.htmlElement);
    }

    function Head() {
        this.htmlElement = document.createElement('div');
        this.collapse = document.createElement('div');
        this.ul = document.createElement('ul');
        this.navBarHeader = new NavBarFn.NavBarHeader(this.collapse);
        this.a = document.createElement('a');

        this.init = function () {
            this.a.classList.add('navbar-brand');
            this.ul.classList.add('nav');
            this.ul.classList.add('navbar-nav');
            this.navBarHeader.htmlElement.appendChild(this.a);
            this.collapse.classList.add('collapse');
            this.collapse.classList.add('navbar-collapse');
            this.collapse.appendChild(this.ul);
            this.htmlElement.classList.add('container');
            this.htmlElement.appendChild(this.navBarHeader.htmlElement);
            this.htmlElement.appendChild(this.collapse);
        }

        this.init();
    }
    this.init();
}




/*
 * ========================================================================
 * UI-NAVPANEL
 * Author  : Yonatan Alexis Quintero Rodriguez
 * Version : 0.1
 * Date    : 7 Oct 2014
 * ========================================================================
 */
/*
 * @param HtmlElement
 * @param contents
 * @param options
 */
UI.NavPanel = function (HtmlElement, contents, options) {
    var head = new Head();
    var body = new Body();
    var n = contents.length;

    this.init = function () {
        for (var i = 0; i < n; i++) {
            var content = contents[i];
            var id = 'UI-NavPanel-' + content.id;
            var headLi = document.createElement('li');
            var bodyLi = document.createElement('li');
            var a = document.createElement('a');
            var htmlContent = document.getElementById(content.id);
            bodyLi.appendChild(htmlContent);
            bodyLi.id = id;
            if (content.active) {
                headLi.classList.add('active');
                bodyLi.classList.add('active');
            }
            a.href = '#';
            a.dataset.id = id;
            a.textContent = content.text;
            a.onclick = function (e) {
                e.preventDefault();
                var thisLi = this.parentNode;
                var thisOldLi = thisLi.parentNode.getElementsByClassName('active');
                if (thisOldLi.length > 0) {
                    thisOldLi[0].classList.remove('active');
                }
                thisLi.classList.add('active');
                var li = document.getElementById(this.dataset.id);
                var oldLi = li.parentNode.getElementsByClassName('active');
                if (oldLi.length > 0) {
                    oldLi[0].classList.remove('active');
                }
                li.classList.add('active');
            }
            headLi.appendChild(a);
            head.ul.appendChild(headLi);
            body.ul.appendChild(bodyLi);
        };
        NavBarFn.NavBarOptions(options, head.htmlElement, head.ul);
        HtmlElement.classList.add('nav-panel');
        HtmlElement.appendChild(head.htmlElement);
        HtmlElement.appendChild(body.htmlElement);
    }

    function Head() {
        this.htmlElement = document.createElement('nav');
        this.collapse = document.createElement('div');
        this.container = document.createElement('div');
        this.ul = document.createElement('ul');
        this.navBarHeader = new NavBarFn.NavBarHeader(this.collapse);
        this.init = function () {
            this.ul.classList.add('nav');
            this.ul.classList.add('navbar-nav');
            this.htmlElement.classList.add('navbar');
            this.htmlElement.classList.add('navbar-default');
            this.htmlElement.appendChild(this.container);
            this.collapse.classList.add('collapse');
            this.collapse.classList.add('navbar-collapse');
            this.collapse.appendChild(this.ul);
            this.container.classList.add('container-fluid');
            this.container.appendChild(this.navBarHeader.htmlElement);
            this.container.appendChild(this.collapse);
        }

        this.init();
    }

    function Body() {
        this.htmlElement = document.createElement('section');
        this.ul = document.createElement('ul');
        this.init = function () {
            this.ul.classList.add('nav');
            this.htmlElement.classList.add('nav-panel-body');
            this.htmlElement.appendChild(this.ul);
        }
        this.init();
    }
    this.init();
}

/*
 * ========================================================================
 * UI-DropDownPanel
 * Author  : Yonatan Alexis Quintero Rodriguez
 * Version : 0.1
 * Date    : 7 Oct 2014
 * ========================================================================
 */
/*
 * @param HtmlElement
 * @param contents
 * @param options
 */
UI.DropDownPanel = function (HtmlElement, content, options) {
    var id = 'UI-DropDownPanel-' + content.id;
    var head = new Head();
    var body = new Body(content.id);

    this.init = function () {
        head.a.dataset.id = id;
        head.setText(content.text);
        if (content.active) {
            head.li.classList.add('active');
            body.li.classList.add('active');
        }
        body.li.id = id;
        NavBarFn.NavBarOptions(options, head.htmlElement, head.ul);
        HtmlElement.classList.add('nav-panel');
        HtmlElement.appendChild(head.htmlElement);
        HtmlElement.appendChild(body.htmlElement);
    }

    this.setText = function (text) {
        head.setText(text);
    }


    this.onclick = function (callback) {
        head.a.onclick = function () {

            this.parentNode.classList.toggle('active');
            document.getElementById(this.dataset.id).classList.toggle('active');
            callback();
        }
    }

    function Head() {
        this.htmlElement = document.createElement('nav');
        this.collapse = document.createElement('div');
        this.container = document.createElement('div');
        this.ul = document.createElement('ul');
        this.navBarHeader = new NavBarFn.NavBarHeader(this.collapse);
        this.ico = document.createElement('span');
        this.li = document.createElement('li');
        this.a = document.createElement('a');

        this.init = function () {
            this.ico.classList.add('caret');
            this.ul.classList.add('nav');
            this.ul.classList.add('navbar-nav');
            this.a.href = '#';
            this.a.onclick = function (e) {
                e.preventDefault();
                this.parentNode.classList.toggle('active');
                document.getElementById(this.dataset.id).classList.toggle('active');
            }
            this.li.appendChild(this.a);
            this.ul.appendChild(this.li);
            this.htmlElement.classList.add('navbar');
            this.htmlElement.classList.add('navbar-default');
            this.htmlElement.appendChild(this.container);
            this.collapse.classList.add('collapse');
            this.collapse.classList.add('navbar-collapse');
            this.collapse.appendChild(this.ul);
            this.container.classList.add('container-fluid');
            this.container.appendChild(this.navBarHeader.htmlElement);
            this.container.appendChild(this.collapse);
        }
        this.setText = function (text) {
            this.a.textContent = text;
            this.a.appendChild(this.ico);
        }


        this.init();
    }

    function Body(id) {
        this.htmlElement = document.createElement('section');
        this.ul = document.createElement('ul');
        this.li = document.createElement('li');
        this.htmlContent = document.getElementById(id);

        this.init = function () {
            this.li.appendChild(this.htmlContent);
            this.ul.appendChild(this.li);
            this.ul.classList.add('nav');
            this.htmlElement.appendChild(this.ul);
            this.htmlElement.classList.add('nav-panel-body');
        }

        this.init();
    }


    this.init();
}
/*
 * ========================================================================
 * UI-NAV-TAB
 * Author  : Yonatan Alexis Quintero Rodriguez
 * Version : 0.1
 * Date    : 9 Oct 2014
 * ========================================================================
 */
/*
 * @param HtmlElement
 * @param contents
 * @param options
 */
UI.NavTab = function (HtmlElement, contents, options) {
    var head = new Head();
    var body = new Body();
    var n = contents.length;

    this.init = function () {

        for (var i = 0; i < n; i++) {
            var content = contents[i];
            var id = 'UI-NavTab-' + content.id;
            var headLi = document.createElement('li');
            var bodyLi = document.createElement('li');
            var a = document.createElement('a');
            var htmlContent = document.getElementById(content.id);
            bodyLi.appendChild(htmlContent);
            bodyLi.id = id;
            bodyLi.classList.add('tab-pane');
            if (content.active) {
                headLi.classList.add('active');
                bodyLi.classList.add('active');
            }
            a.href = '#';
            a.dataset.id = id;
            a.textContent = content.text;
            a.onclick = function (e) {
                e.preventDefault();
                var thisLi = this.parentNode;
                var thisOldLi = thisLi.parentNode.getElementsByClassName('active');
                if (thisOldLi.length > 0) {
                    thisOldLi[0].classList.remove('active');
                }
                thisLi.classList.add('active');
                var li = document.getElementById(this.dataset.id);
                var oldLi = li.parentNode.getElementsByClassName('active');
                if (oldLi.length > 0) {
                    oldLi[0].classList.remove('active');
                }
                li.classList.add('active');
            }
            headLi.appendChild(a);
            head.htmlElement.appendChild(headLi);
            body.htmlElement.appendChild(bodyLi);
        };
        HtmlElement.appendChild(head.htmlElement);
        HtmlElement.appendChild(body.htmlElement);
    }

    function Head() {
        this.htmlElement = document.createElement('ul');
        this.init = function () {
            this.htmlElement.classList.add('nav');
            this.htmlElement.classList.add('nav-tabs');
        }
        this.init();
    }

    function Body() {
        this.htmlElement = document.createElement('ul');
        this.init = function () {
            this.htmlElement.classList.add('tab-content');
            this.htmlElement.classList.add('reset');
        }
        this.init();
    }

    this.init();
}
/*
 * ========================================================================
 * UI-NAV-SCROLL-V
 * Author  : Yonatan Alexis Quintero Rodriguez
 * Version : 0.1
 * Date    : 16 Oct 2014
 * ========================================================================
 */
/*
 * @param HtmlElement
 * @param items[]
 * @param options{}
 */
UI.NavScrollV = function (HtmlElement, items, options) {
    var ul = null;
    var itemSelected = null;
    var childSelected = null;
    var bodyRectTop = null;

    function init() {
        ul = document.createElement('ul');
        ul.classList.add('nav-scroll-v');
        create();
        HtmlElement.appendChild(ul);
        onscroll();
    }

    function create() {
        var n = items.length
        for (var i = 0; i < n; i++) {
            var parent = items[i];
            var parent_li = document.createElement('li');
            parent_li.classList.add('parent');
            var parent_a = document.createElement('a');
            parent_a.href = parent.href;
            parent_a.textContent = parent.text;
            parent_a.dataset.target = parent.target;
            parent_li.appendChild(parent_a);
            var children = parent.children;
            if (children) {
                var children_n = children.length;
                if (children_n > 0) {
                    var children_ul = document.createElement('ul');
                    children_ul.classList.add('children');
                    children_ul.classList.add('hidden');
                    for (var j = 0; j < children_n; j++) {
                        var child = children[j];
                        var child_li = document.createElement('li');
                        var child_a = document.createElement('a');
                        child_a.href = child.href;
                        child_a.textContent = child.text;
                        child_a.dataset.target = child.target;
                        child_a.onclick = function () {
                            if (childSelected) {
                                childSelected.classList.remove('active');
                            }
                            this.classList.add('active');
                            childSelected = this;
                        }
                        child_li.appendChild(child_a);
                        children_ul.appendChild(child_li);
                    };
                    parent_li.appendChild(children_ul);
                }
            }
            ul.appendChild(parent_li);
        };
    }

    function calculateBodyTop() {
        bodyRectTop = document.body.getBoundingClientRect().top || document.documentElement.getBoundingClientRect().top;
        if (options) {
            if (options.top) {
                bodyRectTop = bodyRectTop + options.top;
            }
        }
    }

    function onscroll() {

        window.onscroll = function () {
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var tmpParents = ul.querySelectorAll('.parent');
            var n = tmpParents.length;
            var i = 0;
            var flag = true;
            calculateBodyTop();
            while (flag && i < n) {
                var tmpParent = tmpParents[i];
                var parent_a = tmpParent.getElementsByTagName('a')[0];
                var target_height = document.getElementById(parent_a.dataset.target).getBoundingClientRect().top - bodyRectTop;
                if (i === (n - 1)) {
                    if (scrollTop >= target_height) {
                        showChildren(tmpParent);
                        readCHildren(tmpParent, scrollTop);
                        flag = false;
                    }
                } else {
                    var tmpNextParent = tmpParents[i + 1];
                    var nextParent_a = tmpNextParent.getElementsByTagName('a')[0];
                    var nextTarget_height = document.getElementById(nextParent_a.dataset.target).getBoundingClientRect().top - bodyRectTop;
                    if (scrollTop >= target_height && scrollTop <= nextTarget_height) {
                        showChildren(tmpParent);
                        readCHildren(tmpParent, scrollTop);
                        flag = false;
                    }
                }
                i++;
            }

        };
    }

    function showChildren(parent) {
        if (itemSelected) {
            itemSelected.classList.add('hidden');
        }
        var ul = parent.getElementsByTagName('ul')[0];
        ul.classList.remove('hidden');
        itemSelected = ul;
    }

    function readCHildren(parent, scrollTop) {
        var tmpChildren = parent.querySelectorAll('.children')[0].getElementsByTagName('li');
        var n = tmpChildren.length;
        var i = 0;
        var flag = true;
        while (flag && i < n) {
            var tmpChild = tmpChildren[i];
            var child_a = tmpChild.getElementsByTagName('a')[0];
            var target_height = document.getElementById(child_a.dataset.target).getBoundingClientRect().top - bodyRectTop;
            if (i === (n - 1)) {
                if (scrollTop >= target_height) {
                    selectedChild(child_a);
                    flag = false;
                }
            } else {
                var tmpNextChild = tmpChildren[i + 1];
                var nextChild_a = tmpNextChild.getElementsByTagName('a')[0];
                var target_height = document.getElementById(child_a.dataset.target).getBoundingClientRect().top - bodyRectTop;
                var nextTarget_height = document.getElementById(nextChild_a.dataset.target).getBoundingClientRect().top - bodyRectTop;
                if (scrollTop >= target_height && scrollTop <= nextTarget_height) {
                    selectedChild(child_a);
                    flag = false;
                }
            }
            i++;
        }
    }

    function selectedChild(child_a) {
        if (childSelected) {
            childSelected.classList.remove('active');
        }
        child_a.classList.add('active');
        childSelected = child_a;

    }
    init();
}
/*
 * ========================================================================
 * UI-FORM
 * Author  : Yonatan Alexis Quintero Rodriguez
 * Version : 0.1
 * Date    : 17 Oct 2014
 * ========================================================================
 */
/*
 * @param HtmlElement
 */

UI.Form = function (HtmlElement) {

    var inputs = null;
    var textAreas = null;
    var result = true;
    var changed = false;
    var Form = this;
    var hasSuccess = 'has-success';
    var hasError = 'has-error';
    this.msgRequired = 'This field is required and can\'t be empty!';
    this.msgFullName = 'Please enter a valid name!';
    this.msgEmail = 'Please enter a valid e-mail!';
    this.msgEquals = 'This field and the field to confirm are not the same!';
    this.msgCheck = 'Please check!'
    this.msgAccept = 'Please accept!'
    this.msgMoney = 'Please enter a valid money format!';
    this.msgMaxLength = 'Please enter no more than {#} characters!';
    this.msgMinLength = 'Please enter at least {#} characters!';
    this.msgRangeLength = 'Please enter a value between {#min} and {#max} characters long!';
    this.msgMax = 'Please enter a value less than or equal to {#}!';
    this.msgMin = 'Please enter a value greater than or equal to {#}!';
    this.msgRange = 'Please enter a value between {#min} and {#max}!';
    this.msgURL = 'Please enter a valid URL!';
    this.msgDate = 'Please enter a valid date!';
    this.msgNumber = 'Please enter a valid number!';
    this.msgCreditCard = 'Please enter a valid credit card number!';
    this.msgValidOption = 'Please enter a valid option!';
    this.msgCheckMin = 'Please choose at least {#} options!';
    this.msgCheckMax = 'Please choose no more than {#} options!';
    this.msgCheckRange = 'Please choose between {#min} and {#max} options!';


    function init() {
        if (HtmlElement) {
            inputs = HtmlElement.querySelectorAll('input,textarea');
            var n = inputs.length;
            for (var i = 0; i < n; i++) {
                var input = inputs[i];
                if (!input.dataset.option) {
                    var small = document.createElement('small');
                    var type = input.type;
                    small.className = 'hidden';
                    if (type !== 'checkbox' && type !== 'radio') {
                        var span = document.createElement('span');
                        input.parentNode.parentNode.classList.add('has-feedback');
                        if (input.dataset.date) {                                         //Input dataset.date
                            var ico = document.createElement('i');
                            var calendar = document.createElement('div');
                            ico.className = 'fa fa-calendar fa-fw';
                            span.className = 'form-control-feedback';
                            span.style.cursor = 'default';
                            span.appendChild(ico);
                            input.parentNode.appendChild(calendar);
                            var uiCalendar = new UI.Calendar(calendar, { isInput: true, input: input });
                            span.onclick = function () {                                 //Event for show Calendar.                            
                                if (uiCalendar.isOpen()) uiCalendar.close();
                                else uiCalendar.open();
                            }
                        } else {
                            span.className = 'hidden';
                        }
                        input.parentNode.appendChild(span);

                    }
                    input.parentNode.appendChild(small);
                    if (input.dataset.money) {
                        input.style.textAlign = 'right';
                    }

                }
                if (input.dataset.blur) {
                    input.onblur = function () {
                        return validate(this);
                    }
                }
                if (input.dataset.keyup) {
                    input.onkeyup = function () {
                        return validate(this);
                    }
                }
                /*
                 * Add event onchange
                 */
                input.onchange = function () {
                    changed = true;
                }
            }
        }
    }

    this.isValid = function () {
        var n = inputs.length;
        var i = 0;
        var multiples = new Array();
        var totalMultiple = 1;
        while (i < n) {
            validate(inputs[i]);
            multiples.push(result ? 1 : 0);
            i++;
        }
        validateGroupCheckBox();
        i = 0;
        while (i < n) {
            totalMultiple *= multiples[i++];
        }
        return totalMultiple > 0;
    }

    this.hasChanged = function () {
        var changedAux = changed;
        changed = false;
        return changedAux;
    }

    this.serialize = function () {
        var elements = HtmlElement.elements;
        var serialized = [];
        var i = 0;
        var n = elements.length;
        for (i = 0; i < n; i++) {
            var element = elements[i];
            var type = element.type;
            var value = element.value;
            var name = element.name;
            if (!name.isEmpty()) {
                switch (type) {
                    case 'text':
                    case 'checkbox':
                    case 'search':
                    case 'email':
                    case 'url':
                    case 'tel':
                    case 'number':
                    case 'range':
                    case 'date':
                    case 'month':
                    case 'week':
                    case 'time':
                    case 'datetime':
                    case 'datetime-local':
                    case 'color':
                    case 'textarea':
                    case 'password':
                    case 'select':
                    case 'hidden':
                        serialized.push(name + '=' + value);
                        break;
                    case 'radio':
                        if (element.checked) serialized.push(name + '=' + value);
                        break;
                    default:
                        break;
                }
            }
        }
        return serialized.join('&');
    }

    this.toJSON = function () {
        var elements = HtmlElement.elements;
        var json = {};
        var i = 0;
        var n = elements.length;
        for (i = 0; i < n; i++) {
            var element = elements[i];
            var type = element.type;
            var value = element.value;
            var name = element.name;
            if (!name.isEmpty()) {
                switch (type) {
                    case 'text':
                    case 'checkbox':
                    case 'search':
                    case 'email':
                    case 'url':
                    case 'tel':
                    case 'number':
                    case 'range':
                    case 'date':
                    case 'month':
                    case 'week':
                    case 'time':
                    case 'datetime':
                    case 'datetime-local':
                    case 'color':
                    case 'textarea':
                    case 'password':
                    case 'select':
                    case 'hidden':
                        json[name] = value;
                        break;
                    case 'radio':
                        if (element.checked) json[name] = value;
                        break;
                }
            }
        }
        return json;
    }

    function validate(input) {
        switch (input.type) {
            case 'text':
            case 'search':
            case 'email':
            case 'url':
            case 'tel':
            case 'number':
            case 'range':
            case 'date':
            case 'month':
            case 'week':
            case 'time':
            case 'datetime':
            case 'datetime-local':
            case 'color':
            case 'textarea':
            case 'password':
                /*
                * Check required
                */
                if (input.dataset.required) {
                    result = Form.isEmpty(input.value) ? error(input, Form.msgRequired) : success(input);
                    if (result) {
                        generalValidations(input);
                    }
                } else {
                    generalValidations(input);
                }
                break;
            case 'radio':
                break;
            case 'checkbox':
                /*
                * Check input checked
                */
                if (input.dataset.required) {
                    result = Form.isChecked(input);
                    if (result) {
                        hiddeMessage(input);
                    } else {
                        error(input, Form.msgAccept);
                    }
                }
                break;
                /*
                * The other inputs by default are valid
                */
            default:
                result = true;
                break;
        }
    }

    function validateGroupCheckBox() {

        var groups = HtmlElement.getElementsByClassName('group-checkbox');
        var n = groups ? groups.length : 0;
        if (n > 0) {
            for (var g = 0; g < n; g++) {
                var group = groups[g];
                if (group.dataset.checkmin) {
                    var min = group.dataset.checkmin;
                    if (countChecks(group) < min) {
                        var msg = Form.msgCheckMin.replace('{#}',min);
                        showMessageCheckbox(group, msg);
                    } else {
                        hideMessageCheckbox(group);
                    }
                } else if (group.dataset.checkmax) {
                    var max = group.dataset.checkmax;
                    if (countChecks(group) > max) {
                        var msg = Form.msgCheckMax.replace('{#}', max);
                        showMessageCheckbox(group, msg);
                    } else {
                        hideMessageCheckbox(group);
                    }
                } else if (group.dataset.checkrange) {
                    var range = group.dataset.checkrange.split('-');
                    var min = range[0];
                    var max = range[1];
                    var checks = countChecks(group);
                    if (checks >= min && checks <= max) {
                        hideMessageCheckbox(group);
                    } else {
                        var msg = Form.msgCheckRange.replace('{#min}', min).replace('{#max}', max);
                        showMessageCheckbox(group, msg);
                    }
                }
            }
        }
    }

    function countChecks(group) {
        var checkboxes = group.querySelectorAll('input[type="checkbox"]');
        var k = checkboxes.length;
        var checks = 0;
        for (var c = 0; c < k; c++) {
            var checkbox = checkboxes[c];
            if (checkbox.checked) checks++;
        }
        return checks;
    }

    function showMessageCheckbox(group,msg) {
        var small = group.getElementsByClassName('ui-form-msg')[0];
        small.classList.remove('hidden');
        small.textContent = msg;
    }

    function hideMessageCheckbox(group) {
        var small = group.getElementsByClassName('ui-form-msg')[0];
        small.classList.add('hidden');
    }



    function showMessage(input, message) {
        var small = null;
        var type = input.type;
        if (type !== 'checkbox' && type !== 'radio' && !input.dataset.option && !input.dataset.date) {
            input.parentNode.getElementsByTagName('span')[0].className = 'fa fa-times form-control-feedback';
        }
        if (input.dataset.option) {
            small = input.parentNode.parentNode.getElementsByTagName('small')[0];
        } else {
            small = input.parentNode.getElementsByTagName('small')[0];
        }
        small.textContent = message;
        small.className = 'text-danger';
    }

    function hiddeMessage(input) {
        var type = input.type;
        if (type !== 'checkbox' && type !== 'radio' && !input.dataset.option && !input.dataset.date) {
            input.parentNode.getElementsByTagName('span')[0].className = 'fa fa-check form-control-feedback';
        }
        if (input.dataset.option) {
            input.parentNode.parentNode.getElementsByTagName('small')[0].className = 'hidden';
        } else {
            input.parentNode.getElementsByTagName('small')[0].className = 'hidden';
        }

    }

    function success(input) {
        if (!input.parentNode.parentNode.classList.contains(hasSuccess)) {
            input.parentNode.parentNode.classList.add(hasSuccess);
        }
        if (input.parentNode.parentNode.classList.contains(hasError)) {
            input.parentNode.parentNode.classList.remove(hasError);
        }
        hiddeMessage(input);
        return true;
    }

    function error(input, message) {
        if (input.parentNode.parentNode.classList.contains(hasSuccess)) {
            input.parentNode.parentNode.classList.remove(hasSuccess);
        }
        if (!input.parentNode.parentNode.classList.contains(hasError)) {
            input.parentNode.parentNode.classList.add(hasError);
        }
        showMessage(input, message);
        return false;
    }

    function generalValidations(input) {
        /*
        * Check full name
        */
        if (input.dataset.fullname) {
            result = Form.isFullName(input.value) ? success(input) : error(input, Form.msgFullName);
        } else
            /*
            * Check email
            */
            if (input.dataset.email) {
                result = Form.isEmail(input.value) ? success(input) : error(input, Form.msgEmail);
            } else
                /*
                * Check equals to
                */
                if (input.dataset.equalsto) {
                    var tmpInp = document.getElementsByName(input.dataset.equalsto)[0];
                    result = Form.isEqualsTo(tmpInp.value, input.value) ? success(input) & success(tmpInp) : error(input, Form.msgCheck) & error(tmpInp, Form.msgEquals);
                    if (result) {
                        generalValidations(tmpInp);
                    }
                } else
                    /*
                    * Check money
                    */
                    if (input.dataset.money) {
                        result = Form.isMoney(input.value) ? success(input) : error(input, Form.msgMoney);
                    } else
                        /*
                        * Check max length
                        */
                        if (input.dataset.maxlength) {
                            var length = input.dataset.maxlength;
                            result = Form.maxLength(input.value, length) ? success(input) : error(input, Form.msgMaxLength.replace('{#}', length));
                        } else
                            /*
                            * Check min length
                            */
                            if (input.dataset.minlength) {
                                var length = input.dataset.minlength;
                                result = Form.minLength(input.value, length) ? success(input) : error(input, Form.msgMinLength.replace('{#}', length));
                            } else
                                /*
                                * Check range length
                                */
                                if (input.dataset.rangelength) {
                                    var data = input.dataset.rangelength.split("-");
                                    var min = data[0];
                                    var max = data[1];
                                    result = Form.rangeLength(input.value, min, max) ? success(input) : error(input, Form.msgRangeLength.replace('{#min}', min).replace('{#max}', max));
                                } else
                                    /*
                                    * Check max number
                                    */
                                    if (input.dataset.max) {
                                        var max = input.dataset.max;
                                        result = Form.max(input.value, max) ? success(input) : error(input, Form.msgMax.replace('{#}', max));
                                    } else
                                        /*
                                        * Check min number
                                        */
                                        if (input.dataset.min) {
                                            var min = input.dataset.min;
                                            result = Form.min(input.value, min) ? success(input) : error(input, Form.msgMin.replace('{#}', min));
                                        } else
                                            /*
                                            * Check range number
                                            */
                                            if (input.dataset.range) {
                                                var data = input.dataset.range.split("-");
                                                var min = data[0];
                                                var max = data[1];
                                                result = Form.range(input.value, min, max) ? success(input) : error(input, Form.msgRange.replace('{#min}', min).replace('{#max}'.max));
                                            } else
                                                /*
                                                * Check URL
                                                */
                                                if (input.dataset.url) {
                                                    result = Form.isURL(input.value) ? success(input) : error(input, Form.msgURL);
                                                } else
                                                    /*
                                                    * Check date
                                                    */
                                                    if (input.dataset.date) {
                                                        result = Form.isDate(input.value) ? success(input) : error(input, Form.msgDate);
                                                    } else
                                                        /*
                                                        * Check number
                                                        */
                                                        if (input.dataset.number) {
                                                            result = Form.isNumber(input.value) ? success(input) : error(input, Form.msgNumber);
                                                        } else
                                                            /*
                                                            * Check credit card
                                                            */
                                                            if (input.dataset.creditcard) {
                                                                result = Form.isCreditCard(input.value) ? success(input) : error(input, Form.msgCreditCard);
                                                            } else
                                                                /*
                                                                * Check UI-Select Option
                                                                */
                                                                if (input.dataset.option) {
                                                                    result = Form.isValidOption(input, input.dataset.option) ? success(input) : error(input, Form.msgValidOption);
                                                                } else {
                                                                    success(input);
                                                                }

    }


    /*    
    * @param String value
    * @returns true if value is fullname
    */
    this.isFullName = function (value) {
        return value.match(/^[a-zA-Z][a-zA-Z ]+$/);
    }
    /*
    * @param String value 
    * @returns true if value is email
    */
    this.isEmail = function (value) {
        return value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    }
    /*
    * @param String value
    * @returns true if value is empty
    */
    this.isEmpty = function (value) {
        return !value.match(/^\S+$|[^\s]+$/);
    }
    /*    
    * @param String value 
    * @param String value1 
    * @returns true if both values are equals
    */
    this.isEqualsTo = function (value, value1) {
        return value === value1;
    }
    /*
    * @param String value 
    * @returns true if value is money format
    */
    this.isMoney = function (value) {
        return value.match(/^\d+(,\d{3})*(\.\d*)?$/);
    }
    /*     
    * @param String value	 
    * @param length, number of characters 
    * @returns true if  value  has length characters or less 
    */
    this.maxLength = function (value, length) {
        return !isNaN(length) && value.length <= length;
    }
    /* 
    * @param String value
    * @param length, number of characters 
    * @returns true if  value has length characters or more 
    */
    this.minLength = function (value, length) {
        return !isNaN(length) && value.length >= length;
    }
    /*
    * @param String value
    * @param min, number minimum of characters 
    * @param max, number maximum of characters 
    * @returns true if  value is between min and max
    */
    this.rangeLength = function (value, min, max) {
        var length = value.length;
        return ((!isNaN(min) && length >= min) && (!isNaN(max) && length <= max));
    }
    /*     
    * @param String value 
    * @param max, number maximun
    * @returns true if  value is equals or less that max
    */
    this.max = function (value, max) {
        return (!isNaN(max) && value <= max);
    }
    /* 
    * @param String value
    * @param min, number minimun
    * @returns true if value is equals or greater that min
    */
    this.min = function (value, min) {
        return (!isNaN(min) && value >= min);
    }
    /* 
    * @param String value 
    * @param min, number minimum  
    * @param max, number maximum
    * @returns true if value is between min and max number
    */
    this.range = function (value, min, max) {
        return ((!isNaN(min) && value >= min) && (!isNaN(max) && value <= max));
    }
    /*
    * @param String value
    * @returns true if value is URL
    */
    this.isURL = function (value) {
        return value.match(/https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,}/);
    }
    /*
    * @param String value 
    * @returns true if value is Date
    */
    this.isDate = function (value) {
        var parms = value.split(/[\.\-\/]/);
        var yyyy = parseInt(parms[2], 10);;
        var mm = parseInt(parms[1], 10);
        var dd = parseInt(parms[0], 10);
        if (yyyy < 1582) {
            var tmp = yyyy;
            yyyy = dd;
            dd = tmp;
        }
        var date = new Date(yyyy, mm - 1, dd);
        return (mm === (date.getMonth() + 1) && dd === date.getDate() && yyyy === date.getFullYear());
    }
    /*
    * @param String value
    * @returns true if value is Number
    */
    this.isNumber = function (value) {
        return !isNaN(value);
    }
    /*
    * @param String value
    * @returns true if value is credit card
    */
    this.isCreditCard = function (value) {
        return value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/);
    }
    /*
   * @param HtmlElement input
   * @returns true if input is Checked
   */
    this.isChecked = function (input) {
        return input.checked;
    }
    /*
    * @param HtmlElement input
    * @param option
    * @returns true if option is greater than zero
    */
    this.isValidOption = function (input, option) {
        return (!isNaN(option) && option > 0);
    }

    this.onsubmit = function (callback) {
        HtmlElement.onsubmit = function (e) {
            e.preventDefault();
            callback();
        }
    }

    init();
}
/*
 * ========================================================================
 * UI-Calendar
 * Author  : Yonatan Alexis Quintero Rodriguez
 * Version : 0.1
 * Date    : 19 Oct 2014
 * ========================================================================
 */
/*
* @param HtmlElement
* @param options
*/
UI.Calendar = function (HtmlElement, options) {

    var days = ['Sun',
                'Mon',
                'Tue',
                'Wen',
                'Thu',
                'Fri',
                'Sat'];
    var abbmMonths = ['Jan',                                                  //abbreviated months
                      'Feb',
                      'Mar',
                      'Apr',
                      'May',
                      'Jun',
                      'Jul',
                      'Aug',
                      'Sep',
                      'Oct',
                      'Nov',
                      'Dec'];
    var yearGregorian = 1582;                                                 //The first year to calendar Gregorian.
    var today = new Date();                                                   //The real date of today.
    var displayDate;                                                          //The date being viewed now.
    var data = {};                                                            //Here will be  all  data to construct the calendars.
    var Calendar = this;
    var table;
    var selectedCell;

    function init() {

        setOptionsInit();
        displayDate = today.clone();
        displayDate.setDate(1)
        fillDataByDays();
        createCalendarByDays();
    }
    /*
    * Fill data object for working with the calendar by days
    */
    function fillDataByDays() {
        var dayweek = displayDate.getDay();
        var month = displayDate.getMonth();
        var year = displayDate.getFullYear();
        var totalDays = displayDate.getMonthDayCount();
        data.month = {
            value: month,
            text: displayDate.getMonthName()
        };
        data.year = year;
        data.currentDay = month === today.getMonth() && year === today.getFullYear() ? today.getDate() : 1;
        data.items = new Array();
        var previousTotalDays = 0;
        var day = 0;                                                  //The day to display on the calendar.
        var isPreviousDay = false;
        var isCurrentDay = true;
        var isNextDay = false;

        /*
         * If the day week is greater than zero,
         * necessary known how many days has the previous month.
         */
        if (dayweek > 0) {
            var previousDate = displayDate.clone();
            previousDate.previousMonth();
            previousTotalDays = previousDate.getMonthDayCount();
            /*
             * calculate the first day for display on the calendar
             */
            day = previousTotalDays - dayweek;
            if (day > 30) day--;
            isPreviousDay = true;
            isCurrentDay = false;
        }
        /*
         * Fill data.items
         */
        for (var i = 0; i < 42; i++) {
            var item = {};
            day++;
            item.day = day;
            if (isPreviousDay) {
                item.previousDay = true;
                /*
                *If the day is equals at  total days the
                *previous month, is becasuse wiLL start
                *the current month
                */
                if (day === previousTotalDays) {
                    isPreviousDay = false;
                    isCurrentDay = true;
                    day = 0;
                }
            } else if (isCurrentDay) {
                item.currentDay = true;
                /*
                *If the day is equals at  total days the
                *current month, is becasuse wiLL start
                *the next month.
                */
                if (day === totalDays) {
                    isNextDay = true;
                    isCurrentDay = false;
                    day = 0;
                }
            } else {
                item.nextDay = true;
            }
            data.items.push(item);
        }

    }
    /*
    * Fill data object for working with the calendar by months
    */
    function fillDataByMonths() {
        var year = displayDate.getFullYear();
        data.year = year;
        data.currentMonth = year === today.getFullYear() ? today.getMonth() : 0;
    }
    /*
    *Fill data object for working with the calendar by years
    */
    function fillDataByYears() {
        var year = displayDate.getFullYear();
        var limitYear = year + 11;
        data.year = year;
        data.currentYear = year <= today.getFullYear() && limitYear >= today.getFullYear() ? today.getFullYear() : year;
        data.range = year + ' - ' + limitYear;
    }
    /*
    * Create calendar HTML for show by days.    
    */
    function createCalendarByDays() {

        var row = document.createElement('div');
        var col = document.createElement('div');
        var panelDefault = document.createElement('div');
        var panelBody = document.createElement('div');

        row.className = 'row';
        col.className = 'col-sm-12 col-md-12';
        panelDefault.className = 'ui-calendar panel panel-default panel-main';
        panelBody.className = 'panel-body';

        panelBody.appendChild(createCalendarHeader());
        panelBody.appendChild(createCalendarBoby());
        panelDefault.appendChild(panelBody);
        col.appendChild(panelDefault);
        row.appendChild(col);
        /*
        * add calendar to parent
        */
        HtmlElement.appendChild(row);
        /*
        * Create calendar header HTML for show by days.        
        * @returns HTMLElement
        */
        function createCalendarHeader() {
            var row = document.createElement('div');
            row.className = 'row';

            var colTitle = document.createElement('div');
            colTitle.className = 'col-sm-6';
            /*
            * add the title (month,year)
            */
            var title = document.createElement('a');
            title.href = '#';
            title.text = data.month.text + ' ' + data.year;
            /*
            * add event to change view type by months.
            */
            title.onclick = function (e) {
                e.preventDefault();
                displayDate.setDate(1);
                fillDataByMonths();
                HtmlElement.removeChildren();
                createCalendarByMonths();
            }
            colTitle.appendChild(title);

            var colButtons = document.createElement('div');
            colButtons.className = 'ui-calendar col-sm-6';
            var btnGroupJustified = document.createElement('div');
            btnGroupJustified.className = 'btn-group btn-group-justified';
            /*
            * Create buttons the previous month, current month and next month
            */
            for (var j = 0; j < 3; j++) {
                var btnGroup = document.createElement('div');
                btnGroup.className = 'btn-group';
                var button = document.createElement('button');
                button.type = 'button';
                button.className = 'btn btn-default';
                var i = document.createElement('i');
                /*
                * Add className and events for buttons
                */
                switch (j) {
                    case 0:
                        i.className = 'fa fa-chevron-circle-left';
                        button.onclick = function () {
                            displayDate.setDate(01);
                            displayDate.previousMonth();
                            fillDataByDays();
                            HtmlElement.removeChildren();
                            createCalendarByDays();
                        };
                        break;
                    case 1:
                        i.className = 'fa fa-circle';
                        button.onclick = function () {
                            /*
                            * If not is the current month,
                            * go to current month.
                            */
                            var dMonth = displayDate.getMonth();
                            var month = today.getMonth();
                            if (!(dMonth === month && today.getFullYear() === displayDate.getFullYear())) {
                                displayDate = today.clone();
                                displayDate.setDate(1);
                                fillDataByDays();
                                HtmlElement.removeChildren();
                                createCalendarByDays();
                            }
                        };
                        break;
                    case 2:
                        i.className = 'fa fa-chevron-circle-right';
                        button.onclick = function () {
                            displayDate.setDate(01);
                            displayDate.nextMonth();
                            fillDataByDays();
                            HtmlElement.removeChildren();
                            createCalendarByDays();
                        };
                        break;
                }
                button.appendChild(i);
                btnGroup.appendChild(button);
                btnGroupJustified.appendChild(btnGroup);
            }
            colButtons.appendChild(btnGroupJustified);
            row.appendChild(colTitle);
            row.appendChild(colButtons);
            return row;
        }
        /*
        *Create calendar body HTML for show by days. 
        *@returns HTMLElement
        */
        function createCalendarBoby() {
            var row = document.createElement('div');
            row.className = 'row';
            var col = document.createElement('div');
            col.className = 'col-sm-12';

            var panelDefault = document.createElement('div');
            panelDefault.className = 'ui-calendar panel panel-default';

            var panelBody = document.createElement('div');
            panelBody.className = 'panel-body';
            /*
            * Create the table
            */
            table = document.createElement('table');
            table.className = 'table table-condensed';
            var thead = document.createElement('thead');
            var tr = document.createElement('tr');
            /*
            * Create the legend of the days of week
            */
            for (var i = 0; i < 7; i++) {
                var th = document.createElement('th');
                th.textContent = days[i];
                tr.appendChild(th);
            }
            var tbody = document.createElement('tbody');
            var mod = 1;
            var axuTr = document.createElement('tr');
            /*
            * Create the days of previous month, current month and next month,
            * with a total of 42 days
            */
            var currentDay = data.currentDay;
            for (var j = 0; j < 42; j++) {
                var item = data.items[j];
                var day = item.day;
                var td = document.createElement('td');
                /*
                * If the day not for the current month,
                * make the text clearer
                */
                if (item.previousDay || item.nextDay) {
                    td.className = 'text-muted';
                }
                /*
                * If the day is the current day,
                * make the background darker
                */
                if (item.currentDay && day === currentDay) {
                    td.className = 'bg-primary';
                    selectedCell = td;
                }
                /*
                * Add event, if  is input option 
                * then change this value for the selected date.                
                */
                td.onclick = function () {
                    if (options && options.isInput) {
                        if (this.classList.contains('text-muted')) {     //no is current month
                            if (this.textContent > 20) {                 //is previous month 
                                displayDate.previousMonth();
                            } else {                                     //is next month
                                displayDate.nextMonth();
                            }
                        }
                        displayDate.setDate(this.textContent);
                        var tmpInput = options.input;
                        tmpInput.value = displayDate.format(tmpInput.dataset.date);
                        tmpInput.onchange();
                        tmpInput.onblur();
                        Calendar.close();
                    }
                }
                td.textContent = day;
                axuTr.appendChild(td);
                /*
                * If mod is greater than zero and is module of 7,
                * is because will start other week on the calendar
                */
                if (mod > 1 && mod % 7 === 0) {
                    tbody.appendChild(axuTr);
                    axuTr = document.createElement('tr');
                }
                mod++;
            }
            thead.appendChild(tr);
            table.appendChild(thead);
            table.appendChild(tbody);
            panelBody.appendChild(table);
            panelDefault.appendChild(panelBody);
            col.appendChild(panelDefault);
            row.appendChild(col);
            return row;
        }
    }
    /*
    * Create calendat HTML for show by months
    */
    function createCalendarByMonths() {

        var row = document.createElement('div');
        var col = document.createElement('div');
        var panelDefault = document.createElement('div');
        var panelBody = document.createElement('div');

        row.className = 'row';
        col.className = 'col-sm-12 col-md-12';
        panelDefault.className = 'ui-calendar panel panel-default panel-main';
        panelBody.className = 'panel-body';

        panelBody.appendChild(createCalendarHeader());
        panelBody.appendChild(createCalendarBoby());
        panelDefault.appendChild(panelBody);
        col.appendChild(panelDefault);
        row.appendChild(col);
        /*
        * add calendar to parent
        */
        HtmlElement.appendChild(row);
        /*
        * Create calendar header HTML for show by months.        
        * @returns HTMLElement
        */
        function createCalendarHeader() {
            var row = document.createElement('div');
            row.className = 'row';

            var colTitle = document.createElement('div');
            colTitle.className = 'col-sm-6';
            /*
            * add the title (year)
            */
            var title = document.createElement('a');
            title.href = '#';
            title.text = data.year;
            /*
            * add event to change view type by range years.
            */
            title.onclick = function (e) {
                e.preventDefault();
                fillDataByYears();
                HtmlElement.removeChildren();
                createCalendarByYears();
            }
            colTitle.appendChild(title);

            var colButtons = document.createElement('div');
            colButtons.className = 'ui-calendar col-sm-6';
            var btnGroupJustified = document.createElement('div');
            btnGroupJustified.className = 'btn-group btn-group-justified';
            /*
            * Create buttons the previous year, current year and next year
            */
            for (var j = 0; j < 3; j++) {
                var btnGroup = document.createElement('div');
                btnGroup.className = 'btn-group';
                var button = document.createElement('button');
                button.type = 'button';
                button.className = 'btn btn-default';
                var i = document.createElement('i');
                /*
                * Add className and events for buttons
                */
                switch (j) {
                    case 0:
                        i.className = 'fa fa-chevron-circle-left';
                        button.onclick = function () {
                            var year = displayDate.getFullYear() - 1;
                            if (year > yearGregorian) {
                                displayDate = new Date(year, 0, 01);
                                fillDataByMonths();
                                HtmlElement.removeChildren();
                                createCalendarByMonths();
                            }
                        };
                        break;
                    case 1:
                        i.className = 'fa fa-circle';
                        button.onclick = function () {
                            /*
                            * If not is the current year,
                            * go to current year.
                            */
                            if (displayDate.getFullYear() !== today.getFullYear()) {
                                displayDate = today.clone();
                                fillDataByMonths();
                                HtmlElement.removeChildren();
                                createCalendarByMonths();
                            }
                        };
                        break;
                    case 2:
                        i.className = 'fa fa-chevron-circle-right';
                        button.onclick = function () {
                            displayDate = new Date(displayDate.getFullYear() + 1, 0, 01);
                            fillDataByMonths();
                            HtmlElement.removeChildren();
                            createCalendarByMonths();
                        };
                        break;
                }
                button.appendChild(i);
                btnGroup.appendChild(button);
                btnGroupJustified.appendChild(btnGroup);
            }
            colButtons.appendChild(btnGroupJustified);
            row.appendChild(colTitle);
            row.appendChild(colButtons);
            return row;
        }
        /*
        *Create calendar body HTML for show by months. 
        *@returns HTMLElement
        */
        function createCalendarBoby() {
            var row = document.createElement('div');
            row.className = 'row ';
            var col = document.createElement('div');
            col.className = 'col-sm-12';

            var panelDefault = document.createElement('div');
            panelDefault.className = 'ui-calendar panel panel-default';

            var panelBody = document.createElement('div');
            panelBody.className = 'panel-body';
            /*
            * Create the table
            */
            table = document.createElement('table');
            table.className = 'table table-condensed';
            var tbody = document.createElement('tbody');
            var tr = document.createElement('tr');
            var mod = 1;
            /*
            * Create all months of a year.            
            */
            var currentMonth = data.currentMonth;
            for (var j = 0; j < 12; j++) {
                var td = document.createElement('td');
                /*
                * If the j is the current day,
                * make the background darker.
                */
                if (j === currentMonth) {
                    td.className = 'bg-primary';
                }
                td.textContent = abbmMonths[j];
                tr.appendChild(td);
                /*
                * add event to go to month selected.
                */
                td.onclick = function () {
                    displayDate.setMonth(abbmMonths.indexOf(this.textContent));
                    displayDate.setDate(1);
                    fillDataByDays();
                    HtmlElement.removeChildren();
                    createCalendarByDays();
                }
                /*
                * If mod is greater than zero and is module of 3,
                * add new row.
                */
                if (mod > 1 && mod % 3 === 0) {
                    tbody.appendChild(tr);
                    tr = document.createElement('tr');
                }
                mod++;
            }
            table.appendChild(tbody);
            panelBody.appendChild(table);
            panelDefault.appendChild(panelBody);
            col.appendChild(panelDefault);
            row.appendChild(col);
            return row;
        }
    }
    /*
    *Create calendat HTML for show by years
    */
    function createCalendarByYears() {

        var row = document.createElement('div');
        var col = document.createElement('div');
        var panelDefault = document.createElement('div');
        var panelBody = document.createElement('div');

        row.className = 'row';
        col.className = 'col-sm-12 col-md-12';
        panelDefault.className = 'ui-calendar panel panel-default panel-main';
        panelBody.className = 'panel-body';

        panelBody.appendChild(createCalendarHeader());
        panelBody.appendChild(createCalendarBoby());
        panelDefault.appendChild(panelBody);
        col.appendChild(panelDefault);
        row.appendChild(col);
        /*
        * add calendar to parent
        */
        HtmlElement.appendChild(row);
        /*
        * Create calendar header HTML for show by years.        
        * @returns HTMLElement
        */
        function createCalendarHeader() {
            var row = document.createElement('div');
            row.className = 'row';

            var colTitle = document.createElement('div');
            colTitle.className = 'col-sm-6';
            /*
            * add the title (year - year limit)
            */
            var title = document.createElement('a');
            title.href = '#';
            title.text = data.range;
            title.onclick = function (e) {
                e.preventDefault();
            }
            colTitle.appendChild(title);

            var colButtons = document.createElement('div');
            colButtons.className = 'ui-calendar col-sm-6';
            var btnGroupJustified = document.createElement('div');
            btnGroupJustified.className = 'btn-group btn-group-justified';
            /*
            * Create buttons the previous range year, current range year and next range year
            */
            for (var j = 0; j < 3; j++) {
                var btnGroup = document.createElement('div');
                btnGroup.className = 'btn-group';
                var button = document.createElement('button');
                button.type = 'button';
                button.className = 'btn btn-default';
                var i = document.createElement('i');
                /*
                * Add className and events for buttons
                */
                switch (j) {
                    case 0:
                        i.className = 'fa fa-chevron-circle-left';
                        button.onclick = function () {
                            var year = displayDate.getFullYear() - 12;
                            if (year <= yearGregorian) {
                                year = yearGregorian;
                            }
                            displayDate = new Date(year, 0, 01);
                            fillDataByYears();
                            HtmlElement.removeChildren();
                            createCalendarByYears();
                        };
                        break;
                    case 1:
                        i.className = 'fa fa-circle';
                        button.onclick = function () {
                            /*
                            * If not is the current year,
                            * go to current range year.
                            */
                            if (displayDate.getFullYear() !== today.getFullYear()) {
                                displayDate = today.clone();
                                fillDataByYears();
                                HtmlElement.removeChildren();
                                createCalendarByYears();
                            }
                        };
                        break;
                    case 2:
                        i.className = 'fa fa-chevron-circle-right';
                        button.onclick = function () {
                            displayDate = new Date(displayDate.getFullYear() + 12, 0, 01);
                            fillDataByYears();
                            HtmlElement.removeChildren();
                            createCalendarByYears();
                        };
                        break;
                }
                button.appendChild(i);
                btnGroup.appendChild(button);
                btnGroupJustified.appendChild(btnGroup);
            }
            colButtons.appendChild(btnGroupJustified);
            row.appendChild(colTitle);
            row.appendChild(colButtons);
            return row;
        }
        /*
        *Create calendar body HTML for show by year range. 
        *@returns HTMLElement
        */
        function createCalendarBoby() {
            var row = document.createElement('div');
            row.className = 'row ';
            var col = document.createElement('div');
            col.className = 'col-sm-12';

            var panelDefault = document.createElement('div');
            panelDefault.className = 'ui-calendar panel panel-default';

            var panelBody = document.createElement('div');
            panelBody.className = 'panel-body';
            /*
            * Create the table
            */
            table = document.createElement('table');
            table.className = 'table table-condensed';
            var tbody = document.createElement('tbody');
            var tr = document.createElement('tr');
            var mod = 1;
            /*
            * Create range year.            
            */
            var year = data.year;
            var currentYear = data.currentYear;
            for (var j = 0; j < 12; j++) {
                var td = document.createElement('td');
                /*
                * If the j is the current day,
                * make the background darker.
                */
                if (year === currentYear) {
                    td.className = 'bg-primary';
                }
                td.textContent = year++;
                tr.appendChild(td);
                /*
                * add event to go to year selected.
                */
                td.onclick = function () {
                    displayDate.setFullYear(this.textContent);
                    fillDataByMonths();
                    HtmlElement.removeChildren();
                    createCalendarByMonths();
                }
                /*
                * If mod is greater than zero and is module of 3,
                * add new row.
                */
                if (mod > 1 && mod % 3 === 0) {
                    tbody.appendChild(tr);
                    tr = document.createElement('tr');
                }
                mod++;
            }
            table.appendChild(tbody);
            panelBody.appendChild(table);
            panelDefault.appendChild(panelBody);
            col.appendChild(panelDefault);
            row.appendChild(col);
            return row;
        }
    }

    /*
    * display date from value
    */
    function displayDateFromValue() {
        if (options && options.isInput) {
            var input = options.input;
            var value = input.value;
            if (!value.isEmpty()) {
                displayDate = new Date().parse(value, input.dataset.date);
                displayDate = displayDate.isValid() ? displayDate : new Date();
                var col = displayDate.getDay();
                var row = displayDate.getWeekOfMonth();
                displayDate.setDate(01);
                fillDataByDays();
                HtmlElement.removeChildren();
                createCalendarByDays();
                var cell = table.rows[row].cells[col];
                selectedCell.classList.remove('bg-primary');
                cell.classList.add('bg-primary');
                selectedCell = cell;
            }
        }
    }
    /*
    * config options init
    */
    function setOptionsInit() {
        if (options) {
            if (options.isInput) {
                HtmlElement.className = 'hidden ui-calendar-input';
            }
        }
    }

    /*
    * Event open
    *@param function callback
    */

    this.open = function (callback) {
        HtmlElement.classList.remove('hidden');
        displayDateFromValue();
        if (callback) callback();
    }

    /*
    * Event close
    *@param function callback
    */
    this.close = function (callback) {
        HtmlElement.classList.add('hidden');
        if (callback) callback();
    }

    /*
    * the calendar is open or visible.
    *returns true if the calendar is open or visible.
    */
    this.isOpen = function () {
        return !HtmlElement.classList.contains('hidden');
    }

    init();

}
/*
 * ========================================================================
 * UI-CHECKBOX CUSTOM
 * Author  : Yonatan Alexis Quintero Rodriguez
 * Version : 0.1
 * Date    : 30 Oct 2014
 * ========================================================================
 */
//UI.Checkbox = function(){
//	
//	function customize(className, classChecked, classUnchecked) {
//	    var checks = document.getElementsByClassName(className);
//	    var n =  checks.length;
//	    for (var i = 0; i < n; i++) {
//	        var check = checks[i];
//	        var input = check.getElementsByTagName('input')[0];
//	        if (input.checked) {
//	            check.classList.add('fa');
//	            check.classList.add(classChecked);
//	            check.classList.add('fa-fw');
//	        } else {
//	            check.classList.add('fa');
//	            check.classList.add(classUnchecked);
//	            check.classList.add('fa-fw');
//	        }
//	        check.onclick = function () {
//	            if (this.classList.contains(classUnchecked)) {
//	                this.classList.remove(classUnchecked);
//	                this.classList.add(classChecked);//console.log(this);
//	                eval(this.dataset.fn)
//	                var input = this.getElementsByTagName('input')[0];
//	              //  input.onclick();
//	                
//	            } else {
//	                this.classList.add(classUnchecked);
//	                this.classList.remove(classChecked);
//	                eval(this.dataset.fn)
//	                var input = this.getElementsByTagName('input')[0];
//	               // input.onclick();
//
//	            }
//	        }
//	    }
//	}
//	/*
//	 * ui-checbox
//	 */
////	customize('ui-checkbox', 'fa-check-square', 'fa-square');
//	/*
//	 * ui-checkbox-ui
//	 */
//	customize('ui-checkbox-o', 'fa-check-square-o', 'fa-square-o');
//	/*
//	 * ui-checkbox-plus
//	 */
//	customize('ui-checkbox-plus', 'fa-plus-square', 'fa-minus-square');
//	/*
//	 * ui-checkbox-plus-o
//	 */
//	customize('ui-checkbox-plus-o', 'fa-plus-square-o', 'fa-minus-square-o');
//	/*
//	 * ui-checkbox-toggle
//	 */
//	customize('ui-checkbox-toggle', 'fa-toggle-on', 'fa-toggle-off');
//	/*
//	 * ui-checkbox-start
//	 */
//	customize('ui-checkbox-start', 'fa-star', 'fa-star-o');
//	/*
//	 * ui-checkbox-heart
//	 */
//	customize('ui-checkbox-heart', 'fa-heart', 'fa-heart-o');
//	/*
//	 * ui-checkbox-simplex
//	 */
//	customize('ui-checkbox-simplex', 'fa-check', 'fa-times');	
//	
//}
//UI.Checkbox();

/*
 * ========================================================================
 * UI-Utils
 * Author  : Yonatan Alexis Quintero Rodriguez
 * Version : 0.1
 * Date    : 6 Oct 2014
 * ========================================================================
 */
UI.ReloadCSS = function (htmlElement, href) {
    var queryString = '?reload=' + new Date().getTime();
    htmlElement.href = href.replace(/\?.*|$/, queryString);
}

UI.Sleep = function (milliseconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliseconds);
}



Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
}

NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    for (var i = 0, len = this.length; i < len; i++) {
        if (this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

Element.prototype.removeChildren = function () {
    while (this.childNodes.length > 0) {
        this.removeChild(this.childNodes[0]);
    }
}

Element.prototype.moveChildrenTo = function (target) {
    while (this.childNodes.length > 0) {
        target.appendChild(this.childNodes[0]);
    }
    this.remove();
}

Element.prototype.getContentFromFrame = function () {
    return this.contentDocument || this.contentWindow.document;
}

String.prototype.isEmpty = function () {
    return this == undefined || this === null || this === '' || this.length <= 0;
}
/*
 * ========================================================================
 * UI-Utils: extends Date Object 
 * Author  : Yonatan Alexis Quintero Rodriguez
 * Version : 0.1
 * Date    : 22 Oct 2014
 * ========================================================================
 */

/*
* Provide month names
*/
Date.prototype.getMonthName = function () {
    var month_names = [
                        'January',
                        'February',
                        'March',
                        'April',
                        'May',
                        'June',
                        'July',
                        'August',
                        'September',
                        'October',
                        'November',
                        'December'
    ];
    return month_names[this.getMonth()];
}
/*
* Provide month abbreviation
*/
Date.prototype.getMonthAbbr = function () {
    var month_abbrs = [
                        'Jan',
                        'Feb',
                        'Mar',
                        'Apr',
                        'May',
                        'Jun',
                        'Jul',
                        'Aug',
                        'Sep',
                        'Oct',
                        'Nov',
                        'Dec'
    ];

    return month_abbrs[this.getMonth()];
}
/*
* Provide full day of week name
*/
Date.prototype.getDayFull = function () {
    var days_full = [
                        'Sunday',
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                        'Saturday'
    ];
    return days_full[this.getDay()];
};

/*
*  Provide full day of week name
*/
Date.prototype.getDayAbbr = function () {
    var days_abbr = [
                        'Sun',
                        'Mon',
                        'Tue',
                        'Wed',
                        'Thur',
                        'Fri',
                        'Sat'
    ];
    return days_abbr[this.getDay()];
};
/*
* Provide the day of year 1-365
*/
Date.prototype.getDayOfYear = function () {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((this - onejan) / 86400000);
};
/*
* Provide the day suffix (st,nd,rd,th)
*/
Date.prototype.getDaySuffix = function () {
    var d = this.getDate();
    var sfx = ["th", "st", "nd", "rd"];
    var val = d % 100;
    return (sfx[(val - 20) % 10] || sfx[val] || sfx[0]);
};
/*
* Provide Week of Year
*/
Date.prototype.getWeekOfYear = function () {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}
/*
* @return week of month
*/
Date.prototype.getWeekOfMonth = function () {
    /*
    * var firstDayOfMonth = new Date(this.getFullYear(),this.getMonth(),01).getDay();        
    * var position = this.getDate() + (firstDayOfMonth); // Position real on the calendar.   
    * week = Math.ceil(week /7);                         // get the week
    */
    var firstDayOfMonth = new Date(this.getFullYear(), this.getMonth(), 01).getDay();
    return Math.ceil((this.getDate() + firstDayOfMonth) / 7);
}

/*
* Provide if it is a leap year or not
*/
Date.prototype.isLeapYear = function () {
    return (this.getFullYear() % 4 === 0 || (this.getFullYear() % 100 !== 0 && this.getFullYear() % 400 === 0));
}
/*
* Provide Number of Days in a given month
*/
Date.prototype.getMonthDayCount = function () {
    var month_day_counts = [
                                31,
                                this.isLeapYear() ? 29 : 28,
                                31,
                                30,
                                31,
                                30,
                                31,
                                31,
                                30,
                                31,
                                30,
                                31
    ];

    return month_day_counts[this.getMonth()];
}
/*
* back month 
*/
Date.prototype.previousMonth = function () {
    var month = this.getMonth() - 1;
    var year = this.getFullYear();
    if (month < 0 && year > 1582) {
        month = 11;
        year--;
    }
    var tDays = this.getMonthDayCount();
    if (this.getDate() > tDays) {
        this.setDate(tDays);
    }
    this.setMonth(month);
    this.setFullYear(year);
}
/*
* next month 
*/
Date.prototype.nextMonth = function () {
    var month = this.getMonth() + 1;
    var year = this.getFullYear();
    if (month > 11) {
        month = 0;
        year++;
    }
    var tDays = this.getMonthDayCount();
    if (this.getDate() > tDays) {
        this.setDate(tDays);
    }
    this.setMonth(month);
    this.setFullYear(year);
}
/*
* clone
* @returns clone date
*/
Date.prototype.clone = function () {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate());
}
/*
 * check valid date
 * @returns true if the date is valid
 */
Date.prototype.isValid = function () {
    return !isNaN(this.getTime());
}
/*
* format provided date into this.format format
*/
Date.prototype.format = function (dateFormat) {
    /*
    * break apart format string into array of characters
    */
    dateFormat = dateFormat.split("");
    var date = this.getDate(),
        month = this.getMonth(),
        hours = this.getHours(),
        minutes = this.getMinutes(),
        seconds = this.getSeconds();
    /*
    * get all date properties
    * ( based on PHP date object functionality )
    */
    var date_props = {
        d: date < 10 ? '0' + date : date,
        D: this.getDayAbbr(),
        j: this.getDate(),
        l: this.getDayFull(),
        S: this.getDaySuffix(),
        w: this.getDay(),
        z: this.getDayOfYear(),
        W: this.getWeekOfYear(),
        F: this.getMonthName(),
        m: month < 9 ? '0' + (month + 1) : month + 1,
        M: this.getMonthAbbr(),
        n: month + 1,
        t: this.getMonthDayCount(),
        L: this.isLeapYear() ? '1' : '0',
        Y: this.getFullYear(),
        y: this.getFullYear() + ''.substring(2, 4),
        a: hours > 12 ? 'pm' : 'am',
        A: hours > 12 ? 'PM' : 'AM',
        g: hours % 12 > 0 ? hours % 12 : 12,
        G: hours > 0 ? hours : "12",
        h: hours % 12 > 0 ? hours % 12 : 12,
        H: hours,
        i: minutes < 10 ? '0' + minutes : minutes,
        s: seconds < 10 ? '0' + seconds : seconds
    };
    /*
    * loop through format array of characters and add matching data 
    * else add the format character (:,/, etc.)
    */
    var date_string = "";
    var n = dateFormat.length;
    for (var i = 0; i < n; i++) {
        var f = dateFormat[i];
        if (f.match(/[a-zA-Z]/g)) {
            date_string += date_props[f] ? date_props[f] : '';
        } else {
            date_string += f;
        }
    }

    return date_string;
};
/*
* parse string date to object Date
* @param string date
* @param string pattern formmat
* @returns object Date
*/
Date.prototype.parse = function (dateString, pattern) {
    /*
    * break apart format string into array paralel of characters
    */
    dateString = dateString.split(/\W/);
    var pattern = pattern.split(/\W/);
    var n = pattern.length;
    var date = new Date();
    for (var i = 0; i < n; i++) {
        var str = pattern[i];
        switch (str) {
            case 'd':
            case 'j':
                date.setDate(dateString[i]);
                break;
            case 'm':
            case 'n':
                date.setMonth(dateString[i] - 1);
                break;
            case 'F':
                var monthNames = [
                        'January',
                        'February',
                        'March',
                        'April',
                        'May',
                        'June',
                        'July',
                        'August',
                        'September',
                        'October',
                        'November',
                        'December'
                ];
                date.setMonth(monthNames.indexOf(dateString[i]));
                break;
            case 'M':
                var monthAbbrs = [
                             'Jan',
                             'Feb',
                             'Mar',
                             'Apr',
                             'May',
                             'Jun',
                             'Jul',
                             'Aug',
                             'Sep',
                             'Oct',
                             'Nov',
                             'Dec'
                ];
                date.setMonth(monthAbbrs.indexOf(dateString[i]));
                break;
            case 'Y':
                date.setFullYear(dateString[i]);
                break;
        }
    }
    return date;
};
/*
*
* END - Date object extension
*
******************************************/

var author = 'Yonatan Alexis Quintero Rodriguez';
var version = '0.1';