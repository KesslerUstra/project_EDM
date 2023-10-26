"use client"

const routes = [
    {
        name: 'Problema Estatico das Molas',
        href: '/problems/springs',
        dimension: 2,
    },
    {
        name: 'Problema do Pêndulo',
        href: '/problems/pendulum',
        dimension: 2,
    },
    {
        name: 'Projeto de um Mastro de Bandeira',
        href: '/problems/flagpole',
        dimension: 2,
        restriction: true
    },
    {
        name: 'Problema Transporte de Aço',
        href: '/problems/steeltransport',
        dimension: 6,
        restriction: true
    },
    {
        name: 'Problema do Fazendeiro',
        href: '/problems/farmer',
        dimension: 3,
        restriction: true
    },
    {
        name: 'Problema Recipiente de Pressão',
        href: '/problems/pressure',
        dimension: 4,
        restriction: true
    },
    {
        name: 'Problema Viga Engastada',
        href: '/problems/beam',
        dimension: 4,
        restriction: true
    }
]

export async function getRoutes(){

    if (typeof window !== 'undefined') {
        const existingRoutes = await JSON.parse(localStorage.getItem('routes')) || [];
        if(existingRoutes.length < 1){
            localStorage.setItem('routes', JSON.stringify(routes));
            return routes;
        }
        return existingRoutes;
    }
    return [];
}

export async function addNewRoute(newRoute) {
    const existingRoutes = await JSON.parse(localStorage.getItem('routes')) || routes;
    const updatedRoutes = [...existingRoutes, newRoute];
    localStorage.setItem('routes', JSON.stringify(updatedRoutes));
    return updatedRoutes;
}