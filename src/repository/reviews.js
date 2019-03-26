import Application from '.';

const url = 'reviews';

class ReviewsRepository {
	static index() {
		return Application.index(url);
	}
	static show(id) {
		return Application.show(id, url);
	}
	static filter(value) {
		return Application.filter(value, url);
	}
	static create(value) {
		return Application.create(value, url);
	}
	static update(value, id) {
		return Application.update(value, id, url);
	}
	static delete(id) {
		return Application.remove(id, url);
	}
	static login(value) {
		return Application.login(value);
	}
}
export default ReviewsRepository;