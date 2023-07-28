import PropTypes from 'prop-types';

import * as httpRequest from '~/utils/httpRequest';

const defaultFn = () => {
    console.log('Có lỗi khi call api-search');
};

//#region dùng async, await
export const search = async (q, type = 'less', handleErrorFromOutSide = defaultFn) => {
    try {
        const res = await httpRequest.get('/users/search', {
            params: {
                q,
                type,
            },
        });
        return res.data;
    } catch (err) {
        console.log('Có lỗi khi call api-search');
        handleErrorFromOutSide();
    }
};

search.propTypes = {
    q: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    handleErrorFromOutSide: PropTypes.func,
};
//#endregion
