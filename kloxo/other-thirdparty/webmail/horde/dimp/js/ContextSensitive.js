var ContextSensitive=Class.create({initialize:function(){this.current=this.target=null;this.elements=$H();document.observe("contextmenu",this.rightClickHandler.bindAsEventListener(this));document.observe("click",this.leftClickHandler.bindAsEventListener(this));document.observe(Prototype.Browser.Gecko?"DOMMouseScroll":"mousescroll",this.close.bind(this))},addElement:function(d,c,a){var b=Boolean(a.left);if(d&&!this.validElement(d,b)){this.elements.set(d+Number(b),new ContextSensitive.Element(d,c,a))}},removeElement:function(a){this.elements.unset(a+"0");this.elements.unset(a+"1")},close:function(){if(this.current){this.current.hide();this.current=this.target=null}},element:function(){return this.target},currentmenu:function(){if(this.current&&this.current.visible()){return this.current}},validElement:function(b,a){return this.elements.get(b+Number(Boolean(a)))},disable:function(d,c,a){var b=this.validElement(d,c);if(b){b.disable=a}},leftClickHandler:function(a){if(a.isRightClick()){return}this.rightClickHandler(a,true)},rightClickHandler:function(b,a){if(this.trigger(b.element(),a,b.pointerX(),b.pointerY())){b.stop()}},trigger:function(f,e,h,g){this.close();var j,b,d,c,k,i,a;[f].concat(f.ancestors()).find(function(l){j=this.validElement(l.id,e);return j},this);if(!j||j.disable){return false}b=$(j.ctx);if(!b){return false}this.current=b;this.target=$(j.id);d=j.opts.offset;if(!d&&(Object.isUndefined(h)||Object.isUndefined(g))){d=f.id}d=$(d);if(d){c=d.viewportOffset();a=document.viewport.getScrollOffsets();h=c[0]+a.left;g=c[1]+d.getHeight()+a.top}i=document.viewport.getDimensions();k=b.getDimensions();if((g+k.height)>i.height){g=i.height-k.height-10}if((h+k.width)>i.width){h=i.width-k.width-10}if(j.opts.onShow){j.opts.onShow(j)}b.setStyle({display:"block",left:h+"px",top:g+"px"});return true}});ContextSensitive.Element=Class.create({initialize:function(c,b,a){this.id=c;this.ctx=b;this.opts=a;this.opts.left=Boolean(a.left);this.disable=false}});