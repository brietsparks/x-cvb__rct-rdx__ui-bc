export default function getHeaders(state) {
    return { Authorization: 'Bearer ' + state.auth.user.api_token };
}