import csv
import json

nodes_path = './nodes.csv'
edges_path = './edges.json'
graph_path = './graph.json'

def get_nodes():
    nodes = []
    with open(nodes_path, 'r') as f:
        reader = csv.reader(f)
        for row in reader:
            nid = row[0]
            name = row[1]
            bio = row[2]

            nodes.append({
                'name': name,
                'bio': bio
            })
    return nodes

def get_edges():
    edges = None
    with open(edges_path, 'r') as f:
        edges = json.load(f)
    return edges
    

if __name__=='__main__':
    nodes = get_nodes()
    edges = get_edges()
    graph = {
        'nodes': nodes,
        'links': edges
    }
    with open(graph_path, 'w') as f:
        json.dump(graph,f)
