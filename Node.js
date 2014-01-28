'use strict';

function Node(args) {
    args = args || {};
    
    this.text   = args.text     || 'New Node';
    this.id     = args.id       || Date.now().toString(36);
    this.x      = args.x        || Math.floor(Math.random() * 100);
    this.y      = args.y        || Math.floor(Math.random() * 100);
    
    this.domReference = null;
}

Node.prototype = Object.create(new Rss.EventEmitter(), {
    'render' : {
        'value' : function() {
            var graph  = document.getElementById('graph') || document.body;
            
            if (this.domReference) {
                this.domReference.parentNode.removeChild(this.domReference);
            }
            
            var domElement = document.createElement('div');
            
            domElement.setAttribute('id', this.id);
            domElement.setAttribute('class', 'node');
            
            domElement.style.top = this.y + 'px';
            domElement.style.left = this.x + 'px';
            
            domElement.textContent = this.text;
            
            graph.appendChild(domElement);
            this.domReference = domElement;
            
            this.initBehavior();
        },
        'enumerable' : false
    },
    'initBehavior' : {
        'value' : function() {
            var firstLayerX, firstLayerY, self = this, newTop, newLeft;
            
            function drag(event) {
                newTop = event.clientY - this.parentNode.offsetTop - firstLayerY;
                newLeft = event.clientX - this.parentNode.offsetLeft - firstLayerX;
                
                if (newTop < 0) {
                    newTop = 0;
                } else if (newTop > this.parentNode.offsetHeight - this.offsetHeight) {
                    newTop = this.parentNode.offsetHeight - this.offsetHeight;
                }
                
                if (newLeft < 0) {
                    newLeft = 0;
                } else if (newLeft > this.parentNode.offsetWidth - this.offsetWidth) {
                    newLeft = this.parentNode.offsetWidth - this.offsetWidth;
                }
                
                self.x = newLeft;
                self.y = newTop;
                
                this.style.top = newTop + 'px';
                this.style.left = newLeft + 'px';
                
                self.emit('dragged');
            }
            
            this.domReference.addEventListener('mousedown', function(event) {
                firstLayerX = event.layerX;
                firstLayerY = event.layerY;
                document.onmousemove = drag.bind(this);
            });

            this.domReference.addEventListener('mouseover', function(event) {
                var parentNode = this.parentNode;
                parentNode.removeChild(this);
                parentNode.appendChild(this);
            });

            document.addEventListener('mouseup', function() {
                document.onmousemove = null;
            });
            
            this.domReference.addEventListener('click', function(event) {
                this.classList.add('selected');
                self.emit('selected');
            });
            
            this.domReference.addEventListener('dblclick', function(event) {
                
            });
        },
        'enumerable' : true
    }
});
