import csv
from sets import Set
import json

IN_PATH = './edges.csv'
OUT_PATH = './edges.json'

def read_edges():
    edges = {}
    with open(IN_PATH, 'r') as f:
        next(f)
        reader = csv.reader(f)
        for row in reader:
            source = row[0]
            target = row[1]
            label = row[2]

            # because undirected graph is assumed
            key = (source,target)
            flip_key = (target,source)
            edges[key] = label
            edges[flip_key] = label
    # endwith
    return edges

def _get_triad_type(labels):
    ally = 0
    enemy = 0
    for l in labels:
        if l == '+': ally += 1
        else: enemy += 1

    if ally == 3:
        return 'T3'
    elif ally == 1 and enemy == 2:
        return 'T1'
    elif ally == 2 and enemy == 1:
        return 'T2'
    else:
        return 'T0'


def _get_neighbors(edges):
    neighbors = {}
    for key in edges:
        s = key[0]
        t = key[1]

        if not s in neighbors:
            neighbors[s] = Set([t])
        else:
            neighbors[s].add(t)

        if not t in neighbors:
            neighbors[t] = Set([s])
        else:
            neighbors[t].add(s)

    return neighbors

def _prune_triads(triads):
    redundant = Set([])
    for edge in triads:
        s = edge[0]
        t = edge[1]
        if (t,s) in triads and not ((s,t) in redundant or (t,s) in redundant):
            redundant.add((t,s))
    for edge in redundant:
        del triads[edge]

def get_triads(edges):
    neighbors = _get_neighbors(edges)
    triads = {}
    for key in edges:
        s = key[0]
        s_neighbors = neighbors[s]

        for n1 in s_neighbors:
            for n2 in s_neighbors:
                if n1 == n2: continue
                if not (n1,n2) in edges: continue

                l1 = edges[(n1,n2)]
                l2 = edges[(s,n1)]
                l3 = edges[(s,n2)]

                t = _get_triad_type([l1,l2,l3])
                
                if not (n1,n2) in triads:
                    triads[(n1,n2)] = Set([t])
                else:
                    triads[(n1,n2)].add(t)

                if not (s,n1) in triads:
                    triads[(s,n1)] = Set([t])
                else:
                    triads[(s,n1)].add(t)

                if not (s,n2) in triads:
                    triads[(s,n2)] = Set([t])
                else:
                    triads[(s,n2)].add(t)
        _prune_triads(triads)
    return triads

def write_triads(triads,edges):
    j = []
    for edge in triads:
        s = edge[0]
        t = edge[1]
        l = edges[(s,t)]
        tr = list(triads[(s,t)])
        j.append({
            'source': s,
            'target': t,
            'type': l,
            'triads': tr
        })
    with open(OUT_PATH, 'w') as f:
        json.dump(j,f)

if __name__=='__main__':
    edges = read_edges()
    triads = get_triads(edges)
    write_triads(triads,edges)
