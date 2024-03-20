import {loading} from 'cli-loading-animation';

const isLoading = (status) => {
    const {start, stop} = loading('Creating your project...');

    status ? start() : stop();
}

export default isLoading