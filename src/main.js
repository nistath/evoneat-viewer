var gens = [];
var nodes, edges;

function makeTable() {
  var ind = $('#genfile')[0].value;
  // ind = '{"species":[{"members":[{"genome":[{"start":1,"target":6,"weight":1.1317337957053129,"enabled":true,"innovation":1},{"start":1,"target":3,"weight":1.8474760398824994,"enabled":true,"innovation":3},{"start":3,"target":6,"weight":1.6882348519698949,"enabled":true,"innovation":4},{"start":4,"target":6,"weight":1.6882348519698949,"enabled":true,"innovation":4}],"geneList":[null,true,null,true,true],"maxNeuron":2,"innovationMin":1,"innovationMax":4,"fitness":92.19857526312263},{"genome":[{"start":1,"target":6,"weight":0.976372389268775,"enabled":false,"innovation":1},{"start":1,"target":3,"weight":1.8474760398824994,"enabled":true,"innovation":3},{"start":3,"target":6,"weight":-0.006930217015430247,"enabled":true,"innovation":4}],"geneList":[null,true,null,true,true],"maxNeuron":2,"innovationMin":1,"innovationMax":4,"fitness":9.927098063806278},{"genome":[{"start":1,"target":6,"weight":-0.03846770597661997,"enabled":false,"innovation":1},{"start":1,"target":3,"weight":5.389037522034177e-8,"enabled":true,"innovation":3},{"start":3,"target":6,"weight":-0.0000010563982390097149,"enabled":true,"innovation":4}],"geneList":[null,true,null,true,true],"maxNeuron":2,"innovationMin":1,"innovationMax":4,"fitness":9.600000000006427},{"genome":[{"start":1,"target":6,"weight":1.1317337957053129,"enabled":true,"innovation":1},{"start":1,"target":3,"weight":1.8474760398824994,"enabled":true,"innovation":3},{"start":3,"target":6,"weight":-0.006930217015430247,"enabled":true,"innovation":4}],"geneList":[null,true,null,true,true],"maxNeuron":2,"innovationMin":1,"innovationMax":4,"fitness":0.6622397727714728},{"genome":[{"start":1,"target":6,"weight":-0.03846770597661997,"enabled":false,"innovation":1},{"start":1,"target":3,"weight":1.32136036932956e-9,"enabled":true,"innovation":3},{"start":3,"target":6,"weight":-0.006930217015430247,"enabled":true,"innovation":4}],"geneList":[null,true,null,true,true],"maxNeuron":2,"innovationMin":1,"innovationMax":4,"fitness":9.600000001033825},{"genome":[{"start":1,"target":6,"weight":-4.423802808507935e-7,"enabled":false,"innovation":1},{"start":1,"target":3,"weight":0.3109329476161066,"enabled":true,"innovation":3},{"start":3,"target":6,"weight":-0.15394605827943025,"enabled":true,"innovation":4}],"geneList":[null,true,null,true,true],"maxNeuron":2,"innovationMin":1,"innovationMax":4,"fitness":16.325258378771426},{"genome":[{"start":1,"target":6,"weight":1.1317337957053129,"enabled":true,"innovation":1},{"start":1,"target":3,"weight":5.389037522034177e-8,"enabled":true,"innovation":3},{"start":3,"target":6,"weight":1.6882348519698949,"enabled":true,"innovation":4}],"geneList":[null,true,null,true,true],"maxNeuron":2,"innovationMin":1,"innovationMax":4,"fitness":0.6562046062360114},{"genome":[{"start":1,"target":6,"weight":-5.225891966251753e-8,"enabled":false,"innovation":1},{"start":1,"target":3,"weight":5.389037522034177e-8,"enabled":true,"innovation":3},{"start":3,"target":6,"weight":-0.0000010563982390097149,"enabled":true,"innovation":4}],"geneList":[null,true,null,true,true],"maxNeuron":2,"innovationMin":1,"innovationMax":4,"fitness":9.600000000006427},{"genome":[{"start":1,"target":6,"weight":-0.03846770597661997,"enabled":false,"innovation":1},{"start":1,"target":3,"weight":1.32136036932956e-9,"enabled":true,"innovation":3},{"start":3,"target":6,"weight":-0.0000024031293976339895,"enabled":true,"innovation":4}],"geneList":[null,true,null,true,true],"maxNeuron":2,"innovationMin":1,"innovationMax":4,"fitness":9.600000000000358},{"genome":[{"start":1,"target":6,"weight":1.1317337957053129,"enabled":true,"innovation":1},{"start":1,"target":3,"weight":1.32136036932956e-9,"enabled":true,"innovation":3},{"start":3,"target":6,"weight":1.6882348519698949,"enabled":true,"innovation":4}],"geneList":[null,true,null,true,true],"maxNeuron":2,"innovationMin":1,"innovationMax":4,"fitness":0.6562047943333958}],"avgFitness":39.953611279795325,"sorted":false,"stagnant":16,"maxFitness":92.19857526312263}],"generation":20,"populationSize":10,"globalMax":0,"totalAvgFitness":39.953611279795325}';
  try{
    var obj = JSON.parse(ind);
  }
  catch(e) {
    alert('Check your JSON input!');
    console.error(e);
    return;
  }

  console.log(obj);
  if(gens[obj.generation]) {
    alert('Already imported!');
    console.error('Tried to import existing generation with id '+obj.generation+'.');
    return;
  }
  else gens[obj.generation] = obj;

  for(speId in obj.species) {
    for(orgId in obj.species[speId].members) {
      let org = obj.species[speId].members[orgId];
      let genId = obj.generation;
      $('#tableBody').append('<tr><td>'+genId+'</td><td>'+speId+'</td><td>'+org.fitness+'</td><td> <button onclick="expandBox('+ genId +','+ speId +','+ orgId +')">Expand</button> </td></tr>');
    }
  }
}

function expandBox(genId, speId, orgId) {
  let org = gens[genId].species[speId].members[orgId];
  console.log(org);

  nodes = [];
  edges = [];
  let exist = [];

  function add(id) {
    if(exist[id]) return;
    exist[id] = true;

    let col;
    if(id <= 1)      col = 'green';
    else if (id < 6) col = 'blue';
    else             col = 'red';

    nodes.push({id: id, color: col, title: 'id:'+id});
  }

  for(let gene of org.genome) {
    add(gene.start);
    add(gene.target);

    edges.push({from: gene.start, to: gene.target, value: gene.weight, title: gene.weight});
  }
  console.log(edges);

  draw();
}

function draw() {
  var container = document.getElementById('mynetwork');
  var data = {
    nodes: nodes,
    edges: edges
  };
  var options = {
    nodes: {
      shape: 'dot'
    }
  };
  network = new vis.Network(container, data, options);
}
