import { Injectable } from '@nestjs/common';
const graph = {
  a: { b: 2, c: 1 },
  b: { f: 7 },
  c: { d: 5, e: 2 },
  d: { f: 2 },
  e: { f: 1 },
  f: { g: 1 },
  g: {},
};

@Injectable()
export class NavigationService {
  getHello(): string {
    return 'Hello World!';
  }

  async findNearestVertex(distances, visited) {
    let minDistance = Infinity;
    let nearestVertex = null;

    Object.keys(distances).forEach((vertex) => {
      if (!visited[vertex] && distances[vertex] < minDistance) {
        nearestVertex = vertex;
        minDistance = distances[vertex];
      }
    });

    return nearestVertex;
  }

  async dijkstra(graph, startVertex) {
    const visited = {};
    const distances = {}; // кратчайшие пути из стартовой вершины
    const previous = {}; // просмотренные вершины

    const vertices = Object.keys(graph); // список всех вершин графа

    // по умолчанию все расстояния неизвестны (бесконечны)
    vertices.forEach((vertex) => {
      distances[vertex] = Infinity;
      previous[vertex] = null;
    });

    // расстояние до стартовой вершины равно 0
    distances[startVertex] = 0;

    function handleVertex(vertex) {
      // расстояние до вершины
      const activeVertexDistance = distances[vertex];

      // смежные вершины (с расстоянием до них)
      const neighbours = graph[vertex];

      // для всех смежных вершин пересчитать расстояния
      Object.keys(neighbours).forEach((neighbourVertex) => {
        // известное на данный момент расстояние
        const currentNeighbourDistance = distances[neighbourVertex];
        // вычисляем расстояние
        const newNeighbourDistance =
          activeVertexDistance + neighbours[neighbourVertex];

        if (newNeighbourDistance < currentNeighbourDistance) {
          distances[neighbourVertex] = newNeighbourDistance;
          previous[neighbourVertex] = vertex;
        }
      });

      // пометить вершину как посещенную
      visited[vertex] = 1;
    }

    // ищем самую близкую вершину из необработанных
    let activeVertex = this.findNearestVertex(distances, visited);

    // продолжаем цикл, пока остаются необработанные вершины
    while (activeVertex) {
      handleVertex(activeVertex);
      activeVertex = this.findNearestVertex(distances, visited);
    }

    return { distances, previous };
  }

  async aStar(graph, h, startVertex, finalVertex) {
    //Здесь указаны расстояния от начальноЙ вершины до всех остальных вершин
    const distances = [];
    // по умолчанию все расстояния неизвестны (бесконечны)
    for (let i = 0; i < graph.length; i++) distances[i] = Number.MAX_VALUE;
    // расстояние до стартовой вершины равно 0
    distances[startVertex] = 0;

    //Здесь содержатся приоритеты, с которыми следует посещать вершины, вычисленные с использованием эвристики.
    const priorities = [];
    // по умолчанию все приоритеты неизвестны (бесконечны)
    for (let i = 0; i < graph.length; i++) priorities[i] = Number.MAX_VALUE;
    //начальный узел имеет приоритет, равный расстоянию по прямой до цели.
    priorities[startVertex] = h[startVertex][finalVertex];

    //Здесь указывается, была ли уже посещена вершина
    const visited = [];

    //продолжаем цикл, пока остаются необработанные вершины
    while (true) {
      // ... ищем вершину с самым низким приоритетом...
      let lowestPriority = Number.MAX_VALUE;
      let lowestPriorityIndex = -1;
      for (let i = 0; i < priorities.length; i++) {
        //... проходим по всем вершинам, которые еще не были посещены
        if (priorities[i] < lowestPriority && !visited[i]) {
          lowestPriority = priorities[i];
          lowestPriorityIndex = i;
        }
      }

      if (lowestPriorityIndex === -1) {
        // Нет ни одной вершины, которая еще не была посещена
        return -1;
      } else if (lowestPriorityIndex === finalVertex) {
        // Найдена целевая вершина
        return distances[lowestPriorityIndex];
      }

      //...затем смотрим все соседние вершины, которые еще не были посещены....
      for (let i = 0; i < graph[lowestPriorityIndex].length; i++) {
        if (graph[lowestPriorityIndex][i] !== 0 && !visited[i]) {
          //...если путь по этому ребру короче...
          if (
            distances[lowestPriorityIndex] + graph[lowestPriorityIndex][i] <
            distances[i]
          ) {
            //...сохраняем этот путь как самый короткий
            distances[i] =
              distances[lowestPriorityIndex] + graph[lowestPriorityIndex][i];
            //...и устанавливаем приоритет, с которым мы должны продолжить работу с этой вершиной
            priorities[i] = distances[i] + h[i][finalVertex];
          }
        }
      }

      // помечаем узел как посещенный
      visited[lowestPriorityIndex] = true;
    }
  }
}
