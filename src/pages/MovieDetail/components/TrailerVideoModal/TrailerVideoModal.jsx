import React from 'react';
import YouTube from 'react-youtube';
import { Modal } from 'react-bootstrap';
import './TrailerVideoModal.style.css';

const TrailerVideoModal = props => {
  const onPlayerReady = event => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const opts = {
    width: '711',
    height: '400',
    playerVars: {
      autoplay: 1, // 자동 재생 활성화
      controls: 1,
    },
  };

  return (
    <Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <YouTube videoId={props.movieID} opts={opts} onReady={onPlayerReady} />
      </Modal.Body>
    </Modal>
  );
};

export default TrailerVideoModal;
