"use strict";

Graph.render();

//var graphElement = document.getElementById('graph'),
//    nodeIdCounter = 0;
//
//function makeNodes(nodes, connectedTo) {
//    var i, nodeDiv, nodeId, linkDiv;
//    
//    for (i=0; i<nodes.length; i++) {
//        nodeId = 'node_' + nodeIdCounter++;
//        nodeDiv = document.createElement('div');
//        
//        nodeDiv.id = nodeId;
//        nodeDiv.className = 'node';
//        nodeDiv.textContent = nodes[i].name;
//        
//        if (nodes[i].pos) {
//            nodeDiv.style.left = nodes[i].pos.left;
//            nodeDiv.style.top = nodes[i].pos.top;
//        }
//        
//        graphElement.appendChild(nodeDiv);
//        
//        if (connectedTo) {
//            linkDiv = document.createElement('div');
//            
//            linkDiv.className = 'link';
//            linkDiv.setAttribute('data-node-from', connectedTo);
//            linkDiv.setAttribute('data-node-to', nodeId);
//            
//            graphElement.insertBefore(linkDiv, graphElement.firstChild);
//        }
//        
//        if (nodes[i].depends) {
//            makeNodes(nodes[i].depends, nodeId);
//        }
//    }
//}

//makeNodes(graphData);

//var nodes = document.querySelectorAll('.node'),
//    i, firstLayerX, firstLayerY;
//
//function drag(event) {
//    this.style.top = event.clientY - firstLayerY + 'px';
//    this.style.left = event.clientX - firstLayerX + 'px';
//    makeLinks();
//}
//
//for (i=0; i<nodes.length; i++) {
//    nodes[i].addEventListener('mousedown', function(event) {
//        firstLayerX = event.layerX;
//        firstLayerY = event.layerY;
//        document.onmousemove = drag.bind(this);
//    });
//    
//    nodes[i].addEventListener('mouseover', function(event) {
//        var tmpParentNode = this.parentNode;
//        tmpParentNode.removeChild(this);
//        tmpParentNode.appendChild(this);
//    });
//    
//    document.addEventListener('mouseup', function() {
//        document.onmousemove = null;
//    });
//}


//function makeLinks() {
//    var links = document.querySelectorAll('.link'),
//        i, nodeFrom, nodeTo, x1, y1, x2, y2, length, angle, transform;
//    
//    for (i=0; i<links.length; i++) {
//        nodeFrom    = document.querySelector('#' + links[i].getAttribute('data-node-from'));
//        nodeTo      = document.querySelector('#' + links[i].getAttribute('data-node-to'));
//        y1 = nodeFrom.offsetTop + (nodeFrom.offsetHeight / 2);
//        x1 = nodeFrom.offsetLeft + (nodeFrom.offsetWidth / 2);
//        
//        y2 = nodeTo.offsetTop + (nodeTo.offsetHeight / 2);
//        x2 = nodeTo.offsetLeft + (nodeTo.offsetWidth / 2);
//        
//        length = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
//        angle  = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
//        transform = 'rotate('+angle+'deg)';
//        
//        links[i].style.width = length + 'px';
//        links[i].style.transform = transform;
//        links[i].style.left = x1 + 'px';
//        links[i].style.top  = y1 + 'px';
//    }
//};
//
//makeLinks();