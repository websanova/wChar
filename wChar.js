/******************************************
 * Websanova.com
 *
 * Resources for web entrepreneurs
 *
 * @author          Websanova
 * @copyright       Copyright (c) 2012 Websanova.
 * @license         This websanova wChar jQuery plug-in is dual licensed under the MIT and GPL licenses.
 * @link            http://www.websanova.com
 * @github          http://github.com/websanova/wChar
 * @version         Version 2.1.0
 *
 ******************************************/

(function($) {
    
    function Char(el, options) {
        this.$el = $(el);
        this.options = options;
        this.timeout = null;

        this.generate();
    };
    
    Char.prototype = {
        generate: function() {
            if (!this.$char) {
                var _self = this;

                this.$container = $('<div style="position:relative; display:inline-block; *display:inline; zoom:1;"></div>');
                this.$el.after(this.$container).appendTo(this.$container);

                this.$char = $('<div class="wChar">123</div>').hide();
                this.$char.appendTo(this.$container);
                this.setTheme(this.options.theme);
                this.setOpacity(this.options.opacity);
                this.setPosition(this.options.position);

                this.$el.keyup(function(e){ _self.onKeyup(e); });
            }

            return this.$char;
        },

        onKeyup: function(e) {
            var length = this.$el.val().length,
                charsLeft = this.options.max - length;

            this.setTimeout();

            if (charsLeft < 0) {
                this.$el.val(this.$el.val().substring(0, this.options.max));
                charsLeft = 0;
            }

            if (this.options.showMinCount && this.options.min > 0 && length < this.options.min) {
                this.$char.html(length + (this.options.messageMin ? ' ' + this.options.messageMin : '') );
                this.$char.addClass('wChar-min');
            }
            else {
                if (charsLeft <= 0) { this.$char.addClass('wChar-min'); }
                else { this.$char.removeClass('wChar-min'); }
                this.$char.html(charsLeft + (this.options.message ? ' ' + this.options.message : '') );
            }
        },

        setTimeout: function() {
            var _self = this;
            setTimeout(function(){ _self.$char.fadeIn(_self.options.fadeIn); }, _self.options.delayIn);
            clearTimeout(this.timeout);
            this.timeout = setTimeout(function(){ _self.$char.fadeOut(_self.options.fadeOut); }, _self.options.delayOut);
        },

        setTheme: function(theme) {
            this.$char.attr('class', this.$char.attr('class').replace(/wChar-theme-.+\s|wChar-theme-.+$/, ''));
            this.$char.addClass('wChar-theme-' + theme);
        },

        setOpacity: function(opacity) {
            this.$char.css('opacity', opacity);
        },

        setPosition: function(position) {
            var width = this.$char.outerWidth(true),
                height = this.$char.outerHeight(true),
                center = (this.$el.outerWidth()/2) - (width/2),
                middle = (this.$el.outerHeight()/2) - (height/2);

            this.$char.css({left:'', right:'', top:'', bottom:''});

            switch (position) {
                case 'tl': this.$char.css({left:0, top:-1*height}); break;
                case 'tc': this.$char.css({left:center, top:-1*height}); break;
                case 'tr': this.$char.css({right:0, top:-1*height}); break;
                case 'rt': this.$char.css({right:-1*width, top:0}); break;
                case 'rm': this.$char.css({right:-1*width, top:middle}); break;
                case 'rb': this.$char.css({right:-1*width, bottom:0}); break;
                case 'br': this.$char.css({right:0, bottom:-1*height}); break;
                case 'bc': this.$char.css({left:center, bottom:-1*height}); break;
                case 'bl': this.$char.css({left:0, bottom:-1*height}); break;
                case 'lb': this.$char.css({left:-1*width, bottom:0}); break;
                case 'lm': this.$char.css({left:-1*width, top:middle}); break;
                case 'lt': this.$char.css({left:-1*width, top:0}); break;
            }
        }
    };

    $.fn.wChar = function(options, value) {
        if (typeof options === 'string') {
            var values = [];
            var elements = this.each(function() {
                var wChar = $(this).data('wChar');

                if (wChar) {
                    var func = (value ? 'set' : 'get') + options.charAt(0).toUpperCase() + options.substring(1).toLowerCase();

                    if (wChar[options]) {
                        wChar[options].apply(wChar, [value]);
                    } else if (value) {
                        if (wChar[func]) { wChar[func].apply(wChar, [value]); }
                        if (wChar.options[options]) { wChar.options[options] = value; }
                    } else {
                        if(wChar[func]) { values.push(wChar[func].apply(wChar, [value])); }
                        else if (wChar.options[options]) { values.push(wChar.options[options]); }
                        else { values.push(null); }
                    }
                }
            });

            if (values.length === 1) { return values[0]; }
            else if (values.length > 0) { return values; }
            else { return elements; }
        }

        options = $.extend({}, $.fn.wChar.defaults, options);

        function get(el) {
            var wChar = $.data(el, 'wChar');
            if (!wChar) {
                var _options = jQuery.extend(true, {}, options);
                _options.min = $(el).attr('data-minlength') || _options.min;
                _options.max = $(el).attr('data-maxlength') || _options.max;

                wChar = new Char(el, _options);
                $.data(el, 'wChar', wChar);
            }

            return wChar;
        }

        return this.each(function() { get(this); });
    };
    
    $.fn.wChar.defaults = {
        theme: 'classic',         // set theme
        position: 'tr',           // position of character bubble (tl,tc,tr,rt,rm,rb,br,bc,bl,lb,lm,lt)
        opacity: 0.9,             // set opacity of counter bubble
        showMinCount: true,       // display count down for min characters
        min: 0,                   // min default
        max: 100,                 // max default
        fadeIn: 500,              // bubble fade in speed
        fadeOut: 500,             // bubble fade out speed
        delayIn: 0,               // delay after start typing before bubble fades in
        delayOut: 2000,           // delay after stop typing before bubble fades out
        message: '',              // if set will display a message along side max number of characters
        messageMin: ''            // if set will display a message along side min number of characters
    };
    
})(jQuery);
