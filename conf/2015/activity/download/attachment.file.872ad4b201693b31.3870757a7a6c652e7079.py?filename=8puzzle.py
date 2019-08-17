"""
Ejemplo de resolucion de un problema de busqueda, utilizando la libreria
SimpleAI.

En este ejemplo intentamos resolver el 8-puzzle, ese rompecabezas que tiene
un espacio vacio y 8 fichas numeradas, que deben ordenarse solo moviendo fichas
adyacentes al espacio vacio.
"""

from simpleai.search import SearchProblem, astar, breadth_first, depth_first
from simpleai.search.viewers import WebViewer


# el tablero que queremos resolver
INITIAL = (
    (4, 5, 1),
    (8, 3, 7),
    (0, 6, 2),
)

# la meta a la que queremos llegar
GOAL = (
    (1, 2, 3),
    (4, 5, 6),
    (7, 8, 0),
)


def find_number(number, state):
    """
    Encontrar un numero dentro de un tablero. Devuelve tupla (fila, columna).
    """
    for ri, row in enumerate(state):
        for ci, value in enumerate(row):
            if value == number:
                return ri, ci


class PuzzleProblem(SearchProblem):
    """
    Formalizacion de nuestro problema.
    """
    def actions(self, state):
        """
        Funcion que determina que acciones hay disponibles en un estado dado.
        Para un determinado tablero, las acciones son los numeros que podemos
        mover, porque estan adyacentes al casillero vacio (0).
        """
        actions = []
        r0, c0 = find_number(0, state)
        if r0 > 0:
            actions.append(state[r0 - 1][c0])
        if r0 < 2:
            actions.append(state[r0 + 1][c0])
        if c0 > 0:
            actions.append(state[r0][c0 - 1])
        if c0 < 2:
            actions.append(state[r0][c0 + 1])

        return actions

    def result(self, state, action):
        """
        Funcion que aplica una accion a un estado. Para un tablero dado y una
        ficha que debe moverse (accion), el resultado es intercambiar esa ficha
        con el espacio vacio (0).
        """
        state_mutable = list(list(row) for row in state)
        r0, c0 = find_number(0, state)
        ra, ca = find_number(action, state)

        state_mutable[r0][c0] = action
        state_mutable[ra][ca] = 0

        return tuple(tuple(row) for row in state_mutable)

    def cost(self, state1, action, state2):
        """
        Costo de cada accion.
        """
        return 1

    def is_goal(self, state):
        """
        Determinar si un tablero es o no el tablero meta.
        """
        return state == GOAL

    def heuristic(self, state):
        """
        Funcion que nos estima, no exactamente pero sin pasarse, cuanto de costo
        nos falta desde un estado hasta la meta. Para un tablero dado, contamos
        la distancia de cada ficha a la posicion en la que deberia estar en la
        meta, como minimo vamos a necesitar esa cantidad de movimientos.
        """
        distance = 0
        for ri, row in enumerate(state):
            for ci, value in enumerate(row):
                rg, cg = find_number(value, GOAL)
                distance += abs(ri - rg)
                distance += abs(ci - cg)

        return distance

# para simplemente resolver el problema:
result = astar(PuzzleProblem(INITIAL))
# si queremos debuguear con el debuger interactivo web, usar esto en su lugar:
# result = astar(PuzzleProblem(INITIAL), viewer=WebViewer())

# imprimir el camino de acciones desde el estado inicial, hasta la meta
for action, state in result.path():
    print 'Accion:', action
    print 'State:', state

# imprimir la profundidad de la solucion en el arbol
print 'Depth:', len(result.path())
