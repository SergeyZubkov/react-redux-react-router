export default function handleResponse(res, success, failure) {
    // response = {status, data/message}
    const {status} = res;
        if (status === 'ok') {
            success(res.data)
        }
        if (status === 'err') {
            failure(res.message)
        }
}