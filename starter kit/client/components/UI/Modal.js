import React, { Component } from 'react';
import modal from './Modal.css';

class Modal extends Component {

  render(){
    if(!this.props.isOpen) return null;
    return (
      <div>
        <div className={modal.modalStyle}>
          {this.props.children}
        </div>
        <div className={modal.backdropStyle} onClick={() => this.props.onClose()}></div>
      </div>
    )
  }
}

export default Modal;
