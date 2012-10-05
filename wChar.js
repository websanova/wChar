/******************************************
 * Websanova.com
 *
 * Resources for web entrepreneurs
 *
 * @author          Websanova
 * @copyright       Copyright (c) 2012 Websanova.
 * @license         This wChar jQuery plug-in is dual licensed under the MIT and GPL licenses.
 * @link            http://www.websanova.com
 * @github			http://github.com/websanova/wChar
 * @version         Version 1.1.1
 *
 ******************************************/
(function($)
{
	$.fn.wChar = function(option, settings)
	{
		if(typeof option === 'object')
		{
			settings = option;
		}
		else if(typeof option === 'string')
		{
			var values = [];

			var elements = this.each(function()
			{
				var data = $(this).data('_wChar');

				if(data)
				{
					if($.fn.wChar.defaultSettings[option] !== undefined)
					{
						if(settings !== undefined) { data.settings[option] = settings; }
						else { values.push(data.settings[option]); }
					}
				}
			});

			if(values.length === 1) { return values[0]; }
			if(values.length > 0) { return values; }
			else { return elements; }
		}
		
		settings = $.extend({}, $.fn.wChar.defaultSettings, settings || {});

		return this.each(function()
		{
			var elem = $(this);
			
			var $settings = jQuery.extend(true, {}, settings);
			$settings.min =  elem.attr('data-wChar-min') || settings.min;
			$settings.max =  elem.attr('data-wChar-max') || settings.max;
			
			var cc = new CharCounter($settings, elem);

			cc.generate();
			cc.appendToBody();

			elem
			.keyup(function()
			{
				cc.showCount();
				cc.setBestPosition(elem);
			})
			
			elem.data('_wChar', cc);
		});
	}

	$.fn.wChar.defaultSettings =
	{
		position	: 'tr',			// position of the counter (tl,tc,tr,rt,rm,rb,bl,bc,br,lt,lm,lb)
		color		: 'black', 		// color of counter
		colorMin	: 'red',		// color of counter when showing min required
		message		: 'left',		// message to show with characters left
		messageMin	: 'to go',		// message to show for min characters required
		opacity		: 0.6,			// opacity level
		min			: 0,			// minimum amount of characters
		max			: 100,			// maximum amount of characters
		fadeIn		: 500,			// time before counter appears in milliseconds
		fadeOut		: 500,			// time before counter fades in milliseconds
		delayIn		: 0,			// time before counter displays in milliseconds
		delayOut	: 1500,			// time before counter begins to dissapear in milliseconds
		width		: 50,			// define a set width for the counter
		height		: 0,			// define a set height for the counter (0 is auto)
		offsetX		: 1,			// x offset of counter (negative if left of element)
		offsetY		: 2,			// y offset of counter (negative if above element)
		showMinCount: true			// show negative count for minimum required amonut
	};

	/**
	 * Tooltip class definition
	 */
	function CharCounter(settings, elem)
	{
		this.cc = null;
		this.content = null;

		this.settings = settings;
		this.hoverOffTimer = null;
		this.elem = elem;
		
		return this;
	}
	
	CharCounter.prototype = 
	{
		generate: function()
		{
			if(this.cc) return this.cc;
						
			this.content = $('<div class="_wChar_content"></div>').css({width: this.settings.width || '', height: this.settings.height || ''});
			
			var bg = $('<div class="_wChar_bg"></div>').css({opacity: this.settings.opacity});
			
			this.cc =
			$('<div class="_wChar_holder"></div>')
			.append(
				$('<div class="_wChar_outer"></div>')
				.append(
					$('<div class="_wChar_inner"></div>')
					.append( bg )
					.append( this.content )
				)
			)
			.addClass('_wChar_' + this.settings.color)

			return this.cc;
		},
		
		appendToBody: function()
		{
			$('body').append(this.cc);
		},
		
		showCount: function()
		{
			var $this = this;
			
			var count = this.elem.val().length;
			
			var colorClass = '_wChar_' + this.settings.color;
			var colorMinClass = '_wChar_' + this.settings.colorMin;
			
			if(count > this.settings.max)this.elem.val(this.elem.val().substring(0, this.settings.max));
			else if(this.settings.showMinCount && count < this.settings.min)
			{
				this.cc.removeClass(colorClass).addClass(colorMinClass);
				this.content.html(parseInt(this.settings.min - count) + ' ' + this.settings.messageMin);
			}
			else
			{
				if(!this.cc.hasClass(colorClass))this.cc.removeClass(colorMinClass).addClass(colorClass);
				this.content.html(this.settings.max - count + ' ' + this.settings.message);
			}
			
			setTimeout(function(){ $this.cc.fadeIn($this.settings.fadeIn); }, this.settings.delayIn);
			
			clearTimeout(this.hoverOffTimer);
			this.hoverOffTimer = setTimeout(function(){ $this.cc.fadeOut($this.settings.fadeOut); }, this.settings.delayOut);
		},

		isOverflow: function(left, top)
		{
			var rightWall = (left + this.settings.offsetX + this.cc.outerWidth()) - ($(window).scrollLeft() + $(window).width());
			var leftWall = left - $(window).scrollLeft();
			var bottomWall = (top + this.settings.offsetY + this.cc.outerHeight()) - ($(window).scrollTop() + $(window).height());
			var topWall = top - $(window).scrollTop();

			overflowTotal = 0;
			
			if(rightWall > 0) overflowTotal += rightWall;
			if(leftWall < 0) overflowTotal += Math.abs(leftWall);
			if(bottomWall > 0) overflowTotal += bottomWall;
			if(topWall < 0) overflowTotal += Math.abs(topWall)

			return overflowTotal;
		},
		
		getOffset: function(elem, position)
		{
			var first = position.substring(0, 1);
			var second = position.substring(1, 2);
			 
			var elem_offset = elem.offset();
			var elem_left = elem_offset.left;
			var elem_top = elem_offset.top;
			
			var elem_width = elem.outerWidth();
			var elem_height = elem.outerHeight();
			
			var window_width = $(window).width();
			var window_height = $(window).height();
			
			var tooltip_width = this.cc.outerWidth();
			var tooltip_height = this.cc.outerHeight();
			
			var left = null;
			var top = null;
			
			if(!(first == 'm' && second == 'm'))//manual set
			{
				//based on position
				if(first == 't') top = elem_top - tooltip_height - this.settings.offsetY;
				else if(first == 'b') top = elem_top + elem_height + this.settings.offsetY;
				else if(second == 't') top = elem_top + this.settings.offsetY;
				else if(second == 'b') top = elem_top + elem_height - tooltip_height - this.settings.offsetY;
				else if(second == 'm') top = elem_top - (tooltip_height - elem_height)/2;
				
				//get left position
				if(first == 'l') left = elem_left - tooltip_width - this.settings.offsetX;
				else if(first == 'r') left = elem_left + elem_width + this.settings.offsetX;
				else if(second == 'l') left = elem_left + this.settings.offsetX;
				else if(second == 'r') left = elem_left - (tooltip_width - elem_width) - this.settings.offsetX;
				else if(second == 'c') left = elem_left - (tooltip_width - elem_width)/2;
			}
			
			return {left: left, top: top};
		},

		setBestPosition: function(elem)
		{
			var positions_best_fit_map = {
				'lt': ['lt', 'lm', 'lb', 'rt', 'rm', 'rb', 'tl', 'tc', 'tr', 'bl', 'bc', 'br', 'mm'],
				'lm': ['lm', 'lt', 'lb', 'rm', 'rt', 'rb', 'tl', 'tc', 'tr', 'bl', 'bc', 'br', 'mm'],
				'lb': ['lb', 'lm', 'lt', 'rb', 'rm', 'rt', 'bl', 'bc', 'br', 'tl', 'tc', 'tr', 'mm'],
				'rt': ['rt', 'rm', 'rb', 'lt', 'lm', 'lb', 'tr', 'tc', 'tl', 'br', 'bc', 'bl', 'mm'],
				'rm': ['rm', 'rt', 'rb', 'lm', 'lt', 'lb', 'tr', 'tc', 'tl', 'br', 'bc', 'bl', 'mm'],
				'rb': ['rb', 'rm', 'rt', 'lb', 'lm', 'lt', 'br', 'bc', 'bl', 'tr', 'tc', 'tl', 'mm'],
				'tl': ['tl', 'tc', 'tr', 'bl', 'bc', 'br', 'lt', 'lm', 'lb', 'rt', 'rm', 'rb', 'mm'],
				'tc': ['tc', 'tl', 'tr', 'bc', 'bl', 'br', 'lt', 'lm', 'lb', 'rt', 'rm', 'rb', 'mm'],
				'tr': ['tr', 'tc', 'tl', 'br', 'bc', 'bl', 'rt', 'rm', 'rb', 'lt', 'lm', 'lb', 'mm'],
				'bl': ['bl', 'bc', 'br', 'tl', 'tc', 'tr', 'lb', 'lm', 'lt', 'rb', 'rm', 'rt', 'mm'],
				'bc': ['bc', 'bl', 'br', 'tc', 'tl', 'tr', 'lb', 'lm', 'lt', 'rb', 'rm', 'rt', 'mm'],
				'br': ['br', 'bc', 'bl', 'tr', 'tc', 'tl', 'rb', 'rm', 'rt', 'lb', 'lm', 'lt', 'mm']
			};
			
			var overflowTotal = null;
			var overflowPositionMin = null;
			var overflowTotalMin = null;
			
			var offset = null;
			var positions = positions_best_fit_map[this.settings.position];
			
			for(index in positions)
			{
				offset = this.getOffset(elem, positions[index]);
				overflowTotal = this.isOverflow(offset.left, offset.top);
				
				if(overflowTotalMin == null || overflowTotal < overflowTotalMin)
				{
				 	overflowPositionMin = positions[index];
					overflowTotalMin = overflowTotal;
				}
				
				if(!overflowTotal) break;
			}
			
			//manual override
			if(offset.left == null && offset.top == null) offset = this.getOffset(elem, overflowPositionMin);
			
			this.cc.css({left: offset.left, top: offset.top});
		}
	}
})(jQuery);