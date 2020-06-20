export const logged = (datos) => {
    return {
        type: 'SIGN_APP',
        ...datos
    };
};