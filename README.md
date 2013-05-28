# wChar.js

A jQuery plugin for `textarea`, `text` and `password` inputs to add a character counter bubble that fades in while you type and fades out when you stop typing.


[http://wchar.websanova.com](View the demo here)

## Related Plugins

* [wSelect](http://wselect.websanova.com) - Custom select boxes.
* [wInput](http://winput.websanova.com) - Input plugin that handles backwards compatability for placeholders.
* [wCheck](http://wcheck.websanova.com) - Radio and checkbox input plugin.


## Settings

Available options with notes, the values here are the defaults.

```js
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
    delayOut: 2000            // delay after stop typing before bubble fades out
};
```

## Examples

Include the following files:

```js
<script type="text/javascript" src="./wChar.js"></script>
<link rel="Stylesheet" type="text/css" href="./wChar.css" />
```

You can then apply the plugin to any input text, password and textarea elements using the jQuery selector function:

```js
$('input:text, input:password, textarea').wChar();
```

Set the minlength and maxlength using data attributes `data-minlength` and `data-maxlength`.  Note that the minlength is optional and not required.  Also if you do not set a `maxlength` a default from the options will be used.

```html
<input type="text" data-minlength="10" data-maxlength="100"/>
```


## Resources

* [More jQuery plugins by Websanova](http://websanova.com/plugins)
* [jQuery Plugin Development Boilerplate](http://www.websanova.com/tutorials/jquery/jquery-plugin-development-boilerplate)
* [The Ultimate Guide to Writing jQuery Plugins](http://www.websanova.com/tutorials/jquery/the-ultimate-guide-to-writing-jquery-plugins)


## License

MIT licensed

Copyright (C) 2011-2013 Websanova http://www.websanova.com