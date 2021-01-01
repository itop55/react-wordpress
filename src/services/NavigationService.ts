import axios from 'axios';
import { Navigation } from '../models';

const api = process.env.REACT_APP_API_URL;

function getNavigations(navId: number): Promise<Array<Navigation>> {
    return axios.get(`${api}/navigation/${navId}`).then(resp => resp.data);
}

export const NavigationService = {
    getNavigations
};