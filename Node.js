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
            var firstLayerX, firstLayerY, self = this;
            
            function drag(event) {
                this.style.top = event.clientY - firstLayerY + 'px';
                this.style.left = event.clientX - firstLayerX + 'px';
                
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
        },
        'enumerable' : true
    }
});
