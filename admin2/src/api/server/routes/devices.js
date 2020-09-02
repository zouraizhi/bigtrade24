import security from '../lib/security';
import DevicesService from '../services/devices';

class SecurityTokensRoute {
	constructor(router) {
		this.router = router;
		this.registerRoutes();
	}

	registerRoutes() {
		this.router.post('/v1/devices', this.addDeviceToken.bind(this));
		this.router.post('/v1/push-notification', this.pushNotification.bind(this));
	}

	addDeviceToken(req, res, next) {
		DevicesService.addDeviceToken(req.body)
			.then(data => {
				if (data.message) {
					res.status(400).json(data);
				} else {
					res.send(data);
				}
			})
			.catch(next);
	}

	pushNotification(req, res, next) {
		DevicesService.pushNotification(req.body)
			.then(data => {
				if (data.message) {
					res.status(400).json(data);
				} else {
					res.send(data);
				}
			})
			.catch(next);
	}
}

export default SecurityTokensRoute;
