import csv

IN_PATH = './relations.csv'

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

            if not key in edges and not flip_key in edges:
                edges[key] = label

    # endwith
    return edges

if __name__=='__main__':
    edges = read_edges()

    print len(edges)

