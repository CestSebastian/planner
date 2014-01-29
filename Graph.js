'use strict';

var lastNodeId = 0;
var Graph = {
    'selectedNodeId' : null,
    'nodes' : [
        new Node({ id : 'node_' + lastNodeId++, text : 'Project', x : 489, y : 12 }),
        new Node({ id : 'node_' + lastNodeId++, text : 'Resources', x : 301, y : 90 }),
        new Node({ id : 'node_' + lastNodeId++, text : 'Worker 1', x : 116, y : 12 }),
        new Node({ id : 'node_' + lastNodeId++, text : 'Worker 2', x : 116, y : 105 }),
        new Node({ id : 'node_' + lastNodeId++, text : 'Worker 3', x : 116, y : 184 }),
        new Node({ id : 'node_' + lastNodeId++, text : 'Training', x : 12, y : 273 }),
        new Node({ id : 'node_' + lastNodeId++, text : 'Project Owner', x : 636, y : 85 })
    ],
    'links' : [
        [0, 1], [0, 6], [1, 2], [1, 3], [1, 4], [4, 5], [5, 6]
    ],
    'getNodeById' : function (nodeId) {
        var node;
        
        for (var i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].id === nodeId) {
                node = this.nodes[i];
            }
        }
        
        return node;
    },
    'addNode' : function (text) {
        var newNode = new Node({ id : 'node_' + lastNodeId++, text : text });
        
        this.nodes.push(newNode);
        this.renderNodes();
    },
    'renderNodes' : function() {
        var self = this;
        
        for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].render();
            this.nodes[i].on('dragged', function() {
                self.renderLinks(this.id);
            });
            
            this.nodes[i].on('selected', function() {
                self.selectNode(this.id);
            });
        }
    },
    'selectNode' : function (nodeId) {
        if (this.selectedNodeId) {
            this.getNodeById(this.selectedNodeId).domReference.classList.remove('selected');
        }
        
        var node = this.getNodeById(nodeId);
        
        if (node) {
            node.domReference.classList.add('selected');
            this.selectedNodeId = nodeId;
            selected_node_id.querySelector('strong').textContent = nodeId;
            selected_node_text.querySelector('strong').textContent = node.text;
        }
    },
    'renderLinks' : function(forNodeId) {
        var linkDiv, nodeFrom, nodeTo, style, length, angle, transform, x1, y1, x2, y2,
            graph = document.getElementById('graph') || document.body;
        
        for (var i = 0; i < this.links.length; i++) {
            nodeFrom = this.nodes[this.links[i][0]];
            nodeTo   = this.nodes[this.links[i][1]];
            
            if (forNodeId && (forNodeId !== nodeFrom.id && forNodeId !== nodeTo.id)) {
                continue;
            }
            
            linkDiv = graph.querySelector('div.link[data-node-from=' + nodeFrom.id + '][data-node-to=' + nodeTo.id + ']');
            
            if (linkDiv) {
                linkDiv.parentNode.removeChild(linkDiv);
            }
            
            linkDiv = document.createElement('div');
            
            linkDiv.className = 'link';
            linkDiv.setAttribute('data-node-from', nodeFrom.id);
            linkDiv.setAttribute('data-node-to', nodeTo.id);
            
            y1 = nodeFrom.domReference.offsetTop + (nodeFrom.domReference.offsetHeight / 2);
            x1 = nodeFrom.domReference.offsetLeft + (nodeFrom.domReference.offsetWidth / 2);

            y2 = nodeTo.domReference.offsetTop + (nodeTo.domReference.offsetHeight / 2);
            x2 = nodeTo.domReference.offsetLeft + (nodeTo.domReference.offsetWidth / 2);

            length = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
            angle  = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
            transform = 'rotate('+angle+'deg)';

            style = 'width: ' + length + 'px;';
            style += 'transform: ' + transform + ';';
            style += '-webkit-transform: ' + transform + ';';
            style += 'left: ' + x1 + 'px;';
            style += 'top: ' + y1 + 'px;';
            
            linkDiv.setAttribute('style', style);
            
            graph.insertBefore(linkDiv, graph.firstChild);
        }
    },
    'render' : function () {
        this.renderNodes();
        this.renderLinks();
    }
};