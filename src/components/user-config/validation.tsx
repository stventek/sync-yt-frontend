const validateUserConfigForm = ({username} : {username: string}) => {
    var errors: {username: string | null} = {username: null}
    if (username.length < 3)
        errors.username = 'user must be greater than 3 characters'
    return errors
}

export default validateUserConfigForm;