let params = { 
  horizontalVoronoiDivisions: 26,
  verticalVoronoiDivisions: 28,
  voronoiIrregularity: 0.2,
  shadeVariance: 0.3,
  hueStart: 160,
  hueEnd: 240,
  brightness: 70,
  saturation: 95,
  offset: 25,
  animationSpeed: 500,
  hideText: true,
  createNew: function(){
    resetVoronoiDesign();
  },
};

let delaunay, voronoi, polygons, voronoiPoints, scaledVoronoiPoints;

function setup(){
  createCanvas(windowWidth, windowHeight); 
  colorMode(HSB, 360, 100, 100, 1); 
  rectMode(CENTER);
  
  textSize(22);
  textAlign(CENTER);
  textStyle(BOLD);
  textFont('Courier New');
  
  resetVoronoiDesign();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  scaleVoronoiPoints();
  createVoronoiPolygons();
  drawPolygons();
}

function resetVoronoiDesign(){
  noiseSeed(frameCount);
  createVoronoiPoints();
  scaleVoronoiPoints();
  createVoronoiPolygons();
  drawPolygons();
}

function createVoronoiPoints(){
  voronoiPoints = [];
  //The following code is derived from this StackOverflow answer
  //https://stackoverflow.com/questions/3667927/do-randomly-generated-2d-points-clump-together-and-how-do-i-stop-it
  let randomnessFactor = params.voronoiIrregularity;

  for (let ySubDivisions = 0; ySubDivisions < params.verticalVoronoiDivisions; ++ySubDivisions){
    for (let xSubDivisions = 0; xSubDivisions < params.horizontalVoronoiDivisions; ++xSubDivisions){
      let regularity = 0.5 * (1 - randomnessFactor);
      let x = regularity + randomnessFactor * random(0, 1) + xSubDivisions / (params.horizontalVoronoiDivisions - 1);
      let y = regularity + randomnessFactor * random(0, 1) + ySubDivisions / (params.verticalVoronoiDivisions - 1);
      voronoiPoints.push([x - 0.5, y - 0.5]);
    }
  }
}

function scaleVoronoiPoints(){
  scaledVoronoiPoints = [];
  for (let i = 0; i < voronoiPoints.length; i++){
    scaledVoronoiPoints.push([voronoiPoints[i][0] * windowWidth, voronoiPoints[i][1] * windowHeight]);
  }
}

function createVoronoiPolygons(){
  delaunay = d3.Delaunay.from(scaledVoronoiPoints);
  voronoi = delaunay.voronoi([0, 0, windowWidth, windowHeight]);
  polygons = voronoi.cellPolygons();
}

function drawPolygons(){
  for (const cell of polygons){
    strokeWeight(0.6);
    let intensity = noise(cell[0][0] / (windowWidth * (1 - params.shadeVariance)), cell[0][1] / (windowHeight * (1 - params.shadeVariance)), frameCount / params.animationSpeed);
    let cellColour = color(lerp(params.hueStart, params.hueEnd, intensity), params.saturation, params.brightness);
    let strokeColour = color(lerp(params.hueStart, params.hueEnd, intensity), params.saturation, params.brightness + params.offset);
    fill(cellColour);
    stroke(strokeColour);
    
    beginShape();
    for (let i = 0; i < cell.length; i++){
      vertex(cell[i][0], cell[i][1]);
    }
    endShape();
  }
  
  if (params.hideText == false){
    drawText();
  }
}

function draw(){
  polygons = voronoi.cellPolygons();
  drawPolygons();
}

function drawText(){
  noStroke();
  //fill(250);
  //rect(windowWidth / 2 - 1, windowHeight - 29, 220, 30)
  fill(250);
  text("这个好", windowWidth / 2, windowHeight - 24);
}