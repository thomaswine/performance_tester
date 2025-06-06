import http from 'k6/http';
import { check, sleep } from 'k6';
import { getToken, getHeaders } from '../utils/auth.js';
import config from '../config/dev.js';

export const options = {
    vus: config.vus,
    duration: config.duration,
};

export default function () {
    const token = getToken();

    check(token, {
        'token exists': (t) => t && t.length > 10,
    });

    const profileRes = http.get(`${config.baseUrl}/user/profile`, {
        headers: getHeaders(token),
    });

    check(profileRes, {
        'profile 200': (r) => r.status === 200,
        'profile has name': (r) => r.body.includes('name'),
    });

    const logoutRes = http.post(`${config.baseUrl}/logout`, null, {
        headers: getHeaders(token),
    });

    check(logoutRes, {
        'logout 200': (r) => r.status === 200,
    });

    sleep(1);
}
