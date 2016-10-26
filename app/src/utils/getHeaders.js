export default function getHeaders(state) {
    return { Authorization: 'Bearer ' + state.user.api_token };
}