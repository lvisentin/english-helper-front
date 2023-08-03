'use client';

import {
  faMicrophone,
  faMicrophoneSlash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import LoadingButton from '../LoadingButton/LoadingButton';
import styles from './AudioRecorder.module.scss';

function AudioRecorder({
  setAudioFile,
  handleSubmit,
  loading,
  onStartRecording,
  onStopRecording,
  handleReset,
}: {
  setAudioFile: any;
  handleSubmit: any;
  handleReset?: any;
  onStartRecording?: any;
  onStopRecording?: any;
  loading: boolean;
}) {
  const mediaRecorder = useRef<any>(null);
  const [recordingStatus, setRecordingStatus] = useState<string>('inactive');
  const [stream, setStream] = useState<any>(null);
  const [audioChunks, setAudioChunks] = useState<any>([]);
  const [audio, setAudio] = useState<any>(null);

  async function startRecording() {
    onStartRecording();
    setRecordingStatus('recording');
    const media = new MediaRecorder(stream, { mimeType: 'audio/webm' });
    mediaRecorder.current = media;
    mediaRecorder.current.start();

    let localAudioChunks: any = [];
    mediaRecorder.current.ondataavailable = (event: any) => {
      if (typeof event.data === 'undefined') return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  }

  function clearAudio() {
    setAudio(null);
  }

  function stopRecording() {
    setRecordingStatus('inactive');
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudio(audioUrl);
      setAudioFile(audioBlob);
      setAudioChunks([]);
      onStopRecording();
    };
  }

  async function getMicrophonePermission() {
    if ('MediaRecorder' in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setStream(streamData);
      } catch (err: any) {
        toast.error('Por favor, autorize o uso do microfone');
      }
    } else {
      toast.error('The MediaRecorder API is not supported in your browser.');
    }
  }

  async function handleRecordingClick() {
    if (!stream || !stream.active) {
      getMicrophonePermission();
    } else {
      if (recordingStatus === 'recording') {
        stopRecording();
      } else {
        startRecording();
      }
    }
  }

  useEffect(() => {
    getMicrophonePermission();
  }, []);

  return (
    <>
      <div className="audio-controls mt-4 flex flex-col items-center justify-center">
        <div className="prose max-w-full w-full">
          {recordingStatus === 'recording' ? (
            <p className="prose-p text-center mb-4">
              Clique no botão novamente para parar a gravação...
            </p>
          ) : (
            <p className="prose-p text-center mb-4">
              {audio
                ? 'Você pode ouvir seu áudio no player abaixo'
                : 'Clique no botão abaixo para iniciar a gravação...'}
            </p>
          )}
        </div>
        <button
          type="button"
          className={`${styles.recordBtn} btn btn-primary rounded-full my-auto`}
          disabled={audio}
          onClick={handleRecordingClick}
        >
          {recordingStatus === 'recording' ? (
            <FontAwesomeIcon icon={faMicrophoneSlash} />
          ) : (
            <FontAwesomeIcon icon={faMicrophone} />
          )}
        </button>
        {recordingStatus === 'recording' && (
          <p className="prose-p text-center mt-4">Gravando...</p>
        )}
      </div>
      {audio ? (
        <div className="audio-container flex flex-col items-center justify-center gap-4">
          <audio id="audioField" src={audio} controls></audio>
          <div className="buttons flex gap-4">
            <LoadingButton
              loading={loading}
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Solicitar análise
            </LoadingButton>

            <button
              type="button"
              className="btn btn-primary"
              onClick={clearAudio}
            >
              Gravar outro áudio
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default AudioRecorder;
