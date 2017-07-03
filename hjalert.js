;(function() {
    'use strict';
    var HJalert = function() {
        // this.el = typeof el === 'object' ? el : document.getElementById(el);

        // For check current popup type
        this.type = 'alert';
        
        // Set default params
        this.params = {};
        this.defaultParams = {
            title: document.title,
            callback: null,
            buttons: {ok: 'Ok', cancel: 'Cancel'},
            inputs: {name: 'Please, enter your name'},
            container: document.body,
        }
        this.params = extend(this.params, this.defaultParams)


        this.wrap = document.createElement('div');
        this.wrap.id = 'hjalertWrap';
        document.body.appendChild(this.wrap);
        this.wrap.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (e.target == this.wrap) this.close('noActionCancel');

            // TODO: settings: close on click
            if (e.target.className.indexOf('hjalertButton') != -1) this.close(e.target.className.match(/_(.*)_/)[1]);
        }.bind(this));
    }
    HJalert.prototype.setParams = function (params, callback) {
        this.params = extend(this.params, params)
    }
    HJalert.prototype.show = function () {
        this.wrap.className = 'open';
        setTimeout(function(){
            this.wrap.className = 'open pop';
        }.bind(this), 20);
    }

    HJalert.prototype.close = function (confirm) {
        this.wrap.className = 'open';
        setTimeout(function() {
            this.wrap.className = '';
            var result = {confirm: confirm};
            
            var inputs = this.wrap.getElementsByTagName('input'); 
            for (var i = inputs.length; --i >= 0;) result[inputs[i].name] = inputs[i].value; 
            
            if (this.params.callback) this.params.callback.call(this, result);
        }.bind(this), 300);
    }

    HJalert.prototype.alert = function (p, c) {
        this.type = 'alert';
        this.setParams(p, c);
        
        var buttonsHtml = '';
        for (var i in this.params.buttons) buttonsHtml += '<span class="hjalertButton _'+i+'_">'+this.params.buttons[i]+'</span>';

        this.wrap.innerHTML = '<div>'+
                                '<div>'+
                                    '<div class="hjalertTitle">'+this.params.title+'</div>'+
                                    buttonsHtml+
                                '</div>'+
                               '</div>';
        this.show();
    }

    var extend = function ( defaults, options ) {
        var extended = {};
        var prop;
        for (prop in defaults) {
            if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
                extended[prop] = defaults[prop];
            }
        }
        for (prop in options) {
            if (Object.prototype.hasOwnProperty.call(options, prop)) {
                extended[prop] = options[prop];
            }
        }
        return extended;
    };
    window.hjalert = window.HJalert = new HJalert();
}());