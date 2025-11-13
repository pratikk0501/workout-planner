import ReactDom from "react-dom";

function Modal(props) {
  const { showExerciseDescription, handleCloseModal } = props;
  const { name, description } = showExerciseDescription || {};
  return ReactDom.createPortal(
    <div className="modal-container">
      <button className="modal-underlay" onClick={handleCloseModal} />
      <div className="modal-content">
        <h6>Name</h6>
        <h2 className="skill-name">{name.replaceAll("-", " ")}</h2>
        <h6>Description</h6>
        <p>{description}</p>
      </div>
    </div>,
    document.getElementById("portal")
  );
}

export default Modal;
