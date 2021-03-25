export default function Loader() {
  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className="spinner-grow text-primary">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow text-primary mx-1">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow text-primary">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
