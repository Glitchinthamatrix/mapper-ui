const MAIN_NODE_SIZE = 30;
const CHILD_NODE_SIZE = 13;
const LEAF_NODE_SIZE = 5;
const DEFAULT_DISTANCE = 30;
const LEAF_NODE_DISTANCE = 30;
const MAIN_NODES_DISTANCE = 50;

export const MANY_BODY_STRENGTH = -10;
export const nodes = [];
export const links = [];

function addMainNode(node) {
  node.size = MAIN_NODE_SIZE;
  nodes.push(node);
}

function addChildNode(
  parent,
  node,
  size = CHILD_NODE_SIZE,
  distance = DEFAULT_DISTANCE
) {
  node.size = size;
  nodes.push(node);
  links.push({ source: parent, target: node, distance });
}

function connectMainNodes(parent1, parent2) {
  links.push({
    source: parent1,
    target: parent2,
    distance: MAIN_NODES_DISTANCE,
  });
}

function assembleChildNode(parent, id, numLeafNodes = 20) {
  let childNode = { id: id };
  addChildNode(parent, childNode);

  for (let i = 0; i < numLeafNodes; i++) {
    addChildNode(childNode, { id: "" }, LEAF_NODE_SIZE, LEAF_NODE_DISTANCE);
  }
}

// Arts Web
const artsWeb = { id: "Arts Web" };
addMainNode(artsWeb);
assembleChildNode(artsWeb, "Silicon Valley Creates");
assembleChildNode(artsWeb, "Community Vision");

// Social Impact Commons
const socialImpact = { id: "Social Impact Commons" };
addMainNode(socialImpact);
assembleChildNode(socialImpact, "Theatre Bay Area");
assembleChildNode(socialImpact, "Eastside Art Alliance");
assembleChildNode(socialImpact, "Local Color");

// Community Arts Stablization Trust
const CAST = { id: "Community Arts Stablization Trust" };
addMainNode(CAST);
assembleChildNode(CAST, "Counter Pulse");
assembleChildNode(CAST, "Luggage Store Gallery");
assembleChildNode(CAST, "Performing Arts Workshops");
assembleChildNode(socialImpact, "447 Minna St.", 5);

connectMainNodes(artsWeb, socialImpact);
connectMainNodes(socialImpact, CAST);
connectMainNodes(artsWeb, CAST);
