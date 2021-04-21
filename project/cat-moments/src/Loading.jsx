import spinner from './spinner.svg';

const Loading = function () {
    return (
        <div className="loading">
            <div>Loading...</div>
            <img src={spinner} className="spinner" alt="spinner" />
        </div>
    );
};

export default Loading;