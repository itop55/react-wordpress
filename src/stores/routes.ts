import { createRouterState, RouterState, RouterStore } from 'mobx-state-router';
import { RootStore } from './RootStore';
import { NavigationService } from '../services/NavigationService'

const signin = createRouterState('signin');

const checkForUserSignedIn = async (
    fromState: RouterState,
    toState: RouterState,
    routerStore: RouterStore
) => {
    const { rootStore } = routerStore.options;
    const { authStore } = rootStore as RootStore;
    if (!authStore.user) {
        authStore.setSignInRedirect(toState);
        return signin;
    }
};

//let routes;
NavigationService.getNavigations(36).then((nav) => {
    console.log('nav', nav)
})

// Routes are matched from top to bottom. Make sure they are sequenced
// in the order of priority. It is generally best to sort them by pattern,
// prioritizing specific patterns over generic patterns (patterns with
// one or more parameters). For example:
//     /items
//     /items/:id
export let routes = [
    {
        name: 'home',
        pattern: '/',
        onEnter: async (
            fromState: RouterState,
            toState: RouterState,
            routerStore: RouterStore
        ) => {
            const { rootStore } = routerStore.options;
            const { itemStore } = rootStore as RootStore;
            itemStore.loadFeaturedItems();
        },
    },
    { name: 'cart', pattern: '/cart' },
    {
        name: 'checkout',
        pattern: '/checkout',
        beforeEnter: checkForUserSignedIn,
    },
    {
        name: 'department',
        pattern: '/departments/:id',
        onEnter: async (
            fromState: RouterState,
            toState: RouterState,
            routerStore: RouterStore
        ) => {
            const { rootStore } = routerStore.options;
            const { itemStore } = rootStore as RootStore;
            itemStore.loadDepartmentItems(toState.params.id);
        },
    },
    {
        name: 'items',
        pattern: '/items',
        onEnter: async (
            fromState: RouterState,
            toState: RouterState,
            routerStore: RouterStore
        ) => {
            const { rootStore } = routerStore.options;
            const { itemStore } = rootStore as RootStore;
            itemStore.loadMatchingItems(toState.queryParams.q);
        },
    },
    {
        name: 'item',
        pattern: '/items/:id',
        onEnter: async (
            fromState: RouterState,
            toState: RouterState,
            routerStore: RouterStore
        ) => {
            const { rootStore } = routerStore.options;
            const { itemStore } = rootStore as RootStore;
            itemStore.selectItem(toState.params.id);
        },
    },
    { name: 'notFound', pattern: '/not-found' },
    { name: 'signin', pattern: '/signin' },
];

routes.push({
    name: 'profile',
    pattern: '/profile',
    beforeEnter: checkForUserSignedIn,
})
