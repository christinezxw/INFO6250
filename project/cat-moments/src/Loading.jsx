import spinner from './spinner.svg';

const Loading = function () {
    return (
        <div>
            <div>Loading...</div>
            <img src={spinner} className="spinner" alt="spinner" />
        </div>
    );
};

export default Loading;