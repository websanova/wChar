# wChar.js

A jQuery character counter tooltip plugin that shows minimum required and remaining characters. [Check out the live demo](http://www.websanova.com/plugins/char/jquery).


## Settings

Available options with notes, the values here are the defaults.

```javascript
$('input, textarea').wChar({
    position      : 'tr',       // position of the counter (tl,tc,tr,rt,rm,rb,bl,bc,br,lt,lm,lb)
    color         : 'black',    // color of counter
    colorMin      : 'red',      // color of counter when showing min required
    message       : 'left',     // message to show with characters left
    messageMin    : 'to go',    // message to show for min characters required
    opacity       : 0.6,        // opacity level
    min           : 0,          // minimum amount of characters
    max           : 100,        // maximum amount of characters
    fadeIn        : 500,        // time before counter appears in milliseconds
    fadeOut       : 500,        // time before counter fades in milliseconds
    delayIn       : 0,          // time before counter displays in milliseconds
    delayOut      : 1500,       // time before counter begins to dissapear in milliseconds
    width         : 50,         // define a set width for the counter
    height        : 0,          // define a set height for the counter (0 is auto)
    offsetX       : 1,          // x offset of counter (negative if left of element)
    offsetY       : 2,          // y offset of counter (negative if above element)
    showMinCount  : true        // show negative count for minimum required amonut
});
```

Update settings on the fly:

```javascript
$('input').wChar('max', 300);
```

Retrieve settings, if more than one it will return an array otherwise just the value.

```javascript
console.log($('#elem').wChar('max'))            // 100
console.log($('input').wChar('max'))            // ['100', '100', '100']
```


## Examples

Set for all input and textarea elements:

```html
<form id="form1">
    <input type="text" data-wChar-min="5" data-wChar-max="10"/>
    <input type="text" data-wChar-min="5" data-wChar-max="10"/>
    <textarea data-wChar-min="10" data-wChar-max="100"></textarea>
</form>

<script type="text/javascript">
    $("#form1").find("input, textarea").wChar();
</script>
```

Set for specific element:

```html
<input id="wChar1" type="text" data-wChar-min="5" data-wChar-max="10"/>
    
<script type="text/javascript">
    $("#wChar1").wChar();
</script>
```

Change settings on the fly:

```html
<textarea id="wChar2" data-wChar-min="10" data-wChar-max="100"></textarea>

<script type="text/javascript">
    var cc = $("#wChar2").wChar();
    
    cc.wChar("max", 200);
</script>
```

## Resources

* [jQuery Plugin Development Boilerplate](http://www.websanova.com/tutorials/jquery/jquery-plugin-development-boilerplate)
* [The Ultimate Guide to Writing jQuery Plugins](http://www.websanova.com/tutorials/jquery/the-ultimate-guide-to-writing-jquery-plugins)

## License

MIT licensed

Copyright (C) 2011-2012 Websanova http://www.websanova.com