import React, { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import 'bootstrap/dist/css/bootstrap.min.css';
import audio_wave from '../assets/audio-wave.gif';
import stop_record from '../assets/stop-record.gif';

const Microphone = () => {
    const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();
    const [text, setText] = useState("start");
    const [previousTranscript, setPreviousTranscript] = useState([]);

    const handleOnClick = () => {
        setText((prevText) => (prevText === "start" ? "stop" : "start"));

        if (text === "start") {
            SpeechRecognition.startListening({
                continuous: true,
                language: "en-IN",
            });
        } else {
            SpeechRecognition.stopListening();

            // Save the current transcript when stopping and then reset it
            setPreviousTranscript((prev) => [...prev, transcript]); // Save the current transcript
            resetTranscript(); // Clear the current transcript
        }
    };

    const cleanText = () => {
        window.location.reload();
    };

    const handleCopyClick = () => {
        navigator.clipboard.writeText(transcript);
        alert("Text copied to clipboard!");
    };

    if (!browserSupportsSpeechRecognition) {
        return <span className="text-danger">YOUR BROWSER IS NOT SUPPORTING</span>;
    }

    return (
        <div className="container mt-4">
            <div className="card shadow p-4">
                <p className="text-muted">Click the text below to copy:</p>
                <div
                    className="border p-2 mb-3 bg-light rounded"
                    style={{
                        width: "100%",  
                        maxWidth: "300px", 
                        maxHeight: "200px",
                        overflowY: "auto", 
                        cursor: "pointer",
                    }}
                    onClick={handleCopyClick}
                >
                    {transcript || "Start speaking to see the transcript..."}
                </div>

                <p className="text-muted">Previously transcribed text:</p>
                <div
                    className="border p-2 mb-3 bg-light rounded"
                    style={{
                        width: "100%",
                        maxWidth: "300px",
                        maxHeight: "200px", 
                        overflowY: "auto",
                    }}
                >
                    {previousTranscript.length > 0 ? (
                        previousTranscript.map((text, index) => (
                            <ul key={index}>
                                <li>{text}</li>
                            </ul>
                        ))
                    ) : (
                        <div>No previous transcription available.</div>
                    )}
                </div>

                {text === 'stop' ? (
                    <img src={audio_wave} alt="Audio Wave" />
                ) : (
                    <img src={stop_record} alt="Stop Recording" />
                )}

                <div className="btn-group d-flex justify-content-between" role="group">
                    <button className={`btn ${text === "start" ? "btn-success" : "btn-danger"} mr-2`} onClick={handleOnClick}>
                        {text}
                    </button>
                    <button className="btn btn-secondary" onClick={cleanText}>Clean Window</button>
                </div>
            </div>
        </div>
    );
};

export default Microphone;
