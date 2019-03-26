import axios from 'axios';
// import config from 'react-native-config';
//import { AsyncStorage } from 'react-native';
import {
	Service
} from 'axios-middleware';

const urlStandard = 'http://localhost:8080/';

const request = axios.create({
	baseURL: urlStandard,
});

// const service = new Service(request);
// service.register({
// 	async onRequest(config) {
// 		if (!!config.headers.Authorization) return config;
// 		let token;
// 		try {
// 			token = await AsyncStorage.getItem('TOKEN');
// 		} catch (err) {
// 			token = '';
// 		}
// 		let _config = { ...config };
// 		_config.headers.Authorization = JSON.parse(token);
// 		return _config;
// 	}
// })

export async function index(uri, baseURL = urlStandard) {
	return request({
		url: uri,
		headers: {
			'Content-Type': 'application/json'
		},
		baseURL,
	}).then(({
		data
	}) => {
		return data;
	}).catch(err => {
		return err
	});
}

export async function show(id, uri, baseURL = urlStandard) {
	return request({
		url: `${uri}/${id}`,
		headers: {
			'Content-Type': 'application/json'
		},
		baseURL,
	}).then(({
		data
	}) => {
		return data;
	}).catch(err => {
		return err
	});
}

export async function create(value, uri, baseURL = urlStandard) {
	return request({
		url: `${uri}`,
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		data: value,
		baseURL,
	}).then(({
		data
	}) => {
		return data;
	}).catch(err => {
		return err
	});
}

export async function update(value, id, uri, baseURL = urlStandard) {
	return request({
		url: `${uri}/${id}`,
		method: 'PUT',
		data: value,
		headers: {
			'Content-Type': 'application/json'
		},
		baseURL,
	}).then(({
		data
	}) => {
		return data;
	}).catch(err => {
		return err
	});
}

export async function remove(id, uri, baseURL = urlStandard) {
	return request({
		url: `${uri}/${id}`,
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
		baseURL,
	}).then(({
		data
	}) => {
		return data;
	}).catch(err => {
		return err
	});
}

export async function login(value) {
	return request({
		url: `sessions/adminuser`,
		method: 'POST',
		data: value
	}).then(({
		data
	}) => {
		return data;
	}).catch(err => {
		throw Error(err)
	});
}

export default {
	index,
	show,
	create,
	update,
	remove,
	login,
	request,
};