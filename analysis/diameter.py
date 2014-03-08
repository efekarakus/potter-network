import csv
from priodict import priorityDictionary

IN_PATH = './relations.csv'

def read_graph():
    G = {}
    with open(IN_PATH, 'r') as f:
        next(f)
        reader = csv.reader(f)
        for row in reader:
            source = row[0]
            target = row[1]

            if not source in G:
                G[source] = {
                    target: 1
                }
            else:
                G[source][target] = 1

            if not target in G:
                G[target] = {
                    source: 1
                }
            else:
                G[target][source] = 1
    return G

def dijkstra(G,start,end=None):
    """
    Taken from http://code.activestate.com/recipes/119466-dijkstras-algorithm-for-shortest-paths/
    """

    D = {}  # dictionary of final distances
    P = {}  # dictionary of predecessors
    Q = priorityDictionary()   # est.dist. of non-final vert.
    Q[start] = 0
    
    for v in Q:
        D[v] = Q[v]
        if v == end: break
        
        for w in G[v]:
            vwLength = D[v] + G[v][w]
            if w in D:
                if vwLength < D[w]:
                    raise ValueError, \
  "Dijkstra: found better path to already-final vertex"
            elif w not in Q or vwLength < Q[w]:
                Q[w] = vwLength
                P[w] = v
    
    return (D,P)

if __name__=='__main__':
    G = read_graph()
    max_dist = -1
    max_path = []
    for start in G:
        for end in G:
            if start == end: continue
            D,P = dijkstra(G,start,end)
            path = []
            while 1:
                path.append(end)
                if end==start: break
                end = P[end]
            path.reverse()
            if len(path) <= max_dist: continue
            max_dist = len(path)
            max_path = path
        # endfor
    # endfor
    print max_dist, max_path
