export default function (msg) {
    switch(msg) {
        case 'server is not available':
            return 'Сервер не доступен'
        case 'user_not_found':
            return 'Пользователь не найдет.'
        case 'wrong_email_or_password':
            return 'Имя пользователя или пароль введены не верно.'
        default:
            return msg
    }
}