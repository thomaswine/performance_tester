import http from 'k6/http';

export function getToken() {
    const payload = JSON.stringify({
        username: 'demoUser',
        password: 'demoPass'
    });

    const res = http.post('https://example.com/api/login', payload, {
        headers: { 'Content-Type': 'application/json' },
    });

    if (res.status === 200) {
        const json = JSON.parse(res.body);
        return json.token || '';
    } else {
        console.error('Login failed:', res.status);
        return '';
    }
}

export function getHeaders(token) {
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
}
