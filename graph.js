var graphData = [
    { name : 'Project', pos : { top : '12px', left : '489px' },  depends : [
        { name : 'Resources', pos : { top: '90px', left: '301px' }, depends : [
                { name : 'Worker 1', pos : { top: '12px', left: '121px' } },
                { name : 'Worker 2', pos : { top: '105px', left: '117px' } },
                { name : 'Worker 3', pos : { top: '184px', left: '116px' }, depends : [
                        { name : 'Training', pos : { top: '273px', left: '12px' } }
                ] },
        ] },
        { name : 'Project Owner', pos : { top: '85px', left: '636px' }, depends : [] }

    ]},
];