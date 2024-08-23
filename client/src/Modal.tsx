import React from 'react';

interface ModalProps {
    item: any;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ item, onClose }) => {
    return (
        <div style={modalStyles.overlay}>
            <div style={modalStyles.modal}>
                <h2>Details</h2>
                <p><strong>Author:</strong> {item.owner?.login}</p>
                <p><strong>Commit Date:</strong> {new Date(item.pushed_at).toLocaleDateString()}</p>
                <p><strong>Message:</strong> {item.description}</p>
                <div style={modalStyles.buttonContainer}>
                    <button style={modalStyles.closeButton} onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

const modalStyles = {
    overlay: {
        position: 'fixed' as 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex' as 'flex',
        justifyContent: 'center' as 'center',
        alignItems: 'center' as 'center',
    },
    modal: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    },
    buttonContainer: {
        marginTop: '20px',
        display: 'flex' as 'flex',
        justifyContent: 'center' as 'center',
    },
    closeButton: {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#d3d3d3',
        cursor: 'pointer',
        fontSize: '1rem',
    },
};

export default Modal;
