import React, { createContext, useContext, useEffect, useReducer } from 'react';

const STORAGE_KEY = 'lecoeurdumultivers.elements';

const EMPTY_STATE = {
  characters: [],
  locations: [],
  objects: [],
  bestiaires: [],
  nourritures: [],
  materiauxs: [],
  relations: [],
  equipes: [],
  pouvoirs: [],
  termes: [],
  concepts: [],
  evenements: [],
  cartes: [],
  territoires: [],
  diplomatieRelations: [],
  ecolesMagie: [],
  stylesCombat: [],
  universMultivers: [],
  divinites: [],
  mythes: [],
  quetes: [],
  langues: [],
  artefacts: [],
  ressources: [],
  routesCommerciales: [],
  sciences: [],
  technologies: []
};

function loadInitialState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_STATE;
    const parsed = JSON.parse(raw);
    return { ...EMPTY_STATE, ...parsed };
  } catch {
    return EMPTY_STATE;
  }
}

// Certains managers passent une catégorie au singulier (ex: 'character'),
// qu'on fait correspondre au tableau pluriel correspondant dans le store.
const CATEGORY_ALIASES = {
  character: 'characters',
  location: 'locations',
  object: 'objects',
  bestiaire: 'bestiaires',
  nourriture: 'nourritures',
  materiau: 'materiauxs',
  materiaux: 'materiauxs',
  relation: 'relations',
  equipe: 'equipes',
  pouvoir: 'pouvoirs',
  terme: 'termes',
  concept: 'concepts',
  evenement: 'evenements',
  carte: 'cartes',
  territoire: 'territoires',
  diplomatie: 'diplomatieRelations',
  ecoleMagie: 'ecolesMagie',
  styleCombat: 'stylesCombat',
  univers: 'universMultivers',
  divinite: 'divinites',
  mythe: 'mythes',
  quete: 'quetes',
  langue: 'langues',
  artefact: 'artefacts',
  ressource: 'ressources',
  route: 'routesCommerciales',
  science: 'sciences',
  technologie: 'technologies'
};

function resolveCategory(category) {
  return CATEGORY_ALIASES[category] || category;
}

function reducer(state, action) {
  switch (action.type) {
    case 'IMPORT_BULK':
      return { ...state, ...action.payload };
    case 'ADD_ELEMENT': {
      const category = resolveCategory(action.category);
      const { data } = action;
      const item = { id: data.id || `${category}-${Date.now()}`, ...data };
      return { ...state, [category]: [...(state[category] || []), item] };
    }
    case 'UPDATE_ELEMENT': {
      const category = resolveCategory(action.category);
      const { id, data } = action;
      return {
        ...state,
        [category]: (state[category] || []).map(item =>
          item.id === id ? { ...item, ...data } : item
        )
      };
    }
    case 'DELETE_ELEMENT': {
      const category = resolveCategory(action.category);
      const { id } = action;
      return {
        ...state,
        [category]: (state[category] || []).filter(item => item.id !== id)
      };
    }
    default:
      return state;
  }
}

const StateContext = createContext(EMPTY_STATE);
const ActionsContext = createContext(null);

export function ElementsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitialState);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // stockage indisponible, on ignore silencieusement
    }
  }, [state]);

  const actions = {
    importBulk: payload => dispatch({ type: 'IMPORT_BULK', payload }),
    addElement: (category, data) => dispatch({ type: 'ADD_ELEMENT', category, data }),
    updateElement: (category, id, data) => dispatch({ type: 'UPDATE_ELEMENT', category, id, data }),
    deleteElement: (category, id) => dispatch({ type: 'DELETE_ELEMENT', category, id })
  };

  return (
    <StateContext.Provider value={state}>
      <ActionsContext.Provider value={actions}>
        {children}
      </ActionsContext.Provider>
    </StateContext.Provider>
  );
}

export function useElementsState() {
  return useContext(StateContext);
}

export function useElementsActions() {
  return useContext(ActionsContext);
}
