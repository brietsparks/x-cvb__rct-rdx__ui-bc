export default function getBearerToken(state) {
    return 'Bearer ' + state.auth.user.api_token;
}