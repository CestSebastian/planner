"use strict";

Graph.render();

document.getElementById('add_node_form').addEventListener('submit', function(event) {
    var textElement = this.querySelector('[name="node_text"]');
    
    if (textElement && textElement.value.length > 0) {
        Graph.addNode(textElement.value);
        textElement.value = '';
    }
    event.preventDefault();
});