import * as authSagas from "./auth/sagas";
import * as galleriesSagas from "./galleries/sagas";
import * as commentsSagas from "./comments/sagas";

const sagas = {
    ...authSagas,
    ...galleriesSagas,
    ...commentsSagas
};

export default sagas;