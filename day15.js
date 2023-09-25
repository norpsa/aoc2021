import { readFileSync } from 'fs';

console.time("day15");

let data = [];

readFileSync('input_day15.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
    data.push(line.split('').map(a => parseInt(a)));
});

const getMinimumDistance = (dist, queue) =>
{
    let min = Number.MAX_VALUE;
    let min_key = "";
     
    for(let y = 0; y < dist.length; y++) {
      for(let x = 0; x < dist[0].length; x++) {
        if(dist[y][x] <= min && queue.has(JSON.stringify({x: x, y: y}))) {
            min = dist[y][x];
            min_key = {x: x, y: y};
        }
      }
    }

    return min_key;
}

const getNeighbours = (v) => {
  let neighbours = [];
  let x = v.x;
  let y = v.y;
  if(v.x > 0) {
    neighbours.push({x: x -1, y: y});
  }
  if(v.y > 0) {
    neighbours.push({x: x, y: y -1 });
  }
  if(v.x < newData[0].length - 1) {
    neighbours.push({x: x + 1, y: y })
  }
  if(v.y < newData.length - 1) {
    neighbours.push({x: x, y: y + 1 })
  }

  return neighbours;
}

const dijkstra = (graph, src) =>
{
    let dist = [];
    let queue = new Set();

    for(let i = 0; i < graph.length; i++) {
      let distRow = [];
      for(let j = 0; j < graph[0].length; j++) {
        distRow.push(Number.MAX_VALUE);
        queue.add(JSON.stringify({ x: j, y: i }));
      }
      dist.push(distRow);
    }
     
    dist[0][0] = 0;
     
    while(queue.size > 0) {
      console.log(queue.size);
      let v = getMinimumDistance(dist, queue);
      queue.delete(JSON.stringify(v));
      let vObject = v;

      let neighbours = getNeighbours(vObject);
      neighbours.forEach(u => {
        let alternative = dist[vObject.y][vObject.x] + graph[u.y][u.x];
        if(alternative < dist[u.y][u.x]) {
          dist[u.y][u.x] = alternative;
        }
      });
    }
    return dist;
}

//let distances = dijkstra(data, { x: 0, y:0 });
//console.log(distances.get(JSON.stringify({x: data[0].length -1, y: data.length -1 })));

let newData = [];
for(let addY = 0; addY < 5; addY++) {
  let newRows = [];
  for(let y = 0; y < data.length; y++) {
    let newRow = [];
    for(let addX = 0; addX < 5; addX++) {
      let column = data[y].map(a => {
        let value = a;
        for(let k = 0; k < addX + addY; k++) {
          if(value === 9) {
            value = 1;
          } else {
            value++;
          }
        }
        return value;
      });
      newRow.push(...column);
    }
    newRows.push(newRow);
  }
  newRows.forEach(r => newData.push(r));
}

let distances = dijkstra(newData, { x: 0, y:0 });
console.log(distances[newData.length -1][newData[0].length - 1]);

console.timeEnd("day15");