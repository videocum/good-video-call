import { connect } from 'https://cdn.skypack.dev/livekit-client';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTMyODE3MTAsImlzcyI6IkFQSTdSZjg0MnpHQWtDNSIsIm5iZiI6MTc1MzI4MDgxMCwic3ViIjoidmlkZW8gY2FsbCIsInZpZGVvIjp7ImNhblB1Ymxpc2giOnRydWUsImNhblB1Ymxpc2hEYXRhIjp0cnVlLCJjYW5TdWJzY3JpYmUiOnRydWUsInJvb20iOiJ2aWRlb2NhbGwiLCJyb29tSm9pbiI6dHJ1ZX19._VWgp2XRL0UsTlZDbHHlQJ9M8LI5KaYhUGFYBidCHq4";
const livekitUrl = "wss://facechangerapp-dbpjte7v.livekit.cloud";

async function start() {
  const room = await connect(livekitUrl, token);
  console.log("Connected to room:", room.name);

  // Attach local video
  const localTracks = await room.localParticipant.enableCameraAndMicrophone();
  const localVideo = document.getElementById("local-video");
  localVideo.srcObject = new MediaStream([localTracks[0].mediaStreamTrack]);

  // Attach remote video
  room.on('participantConnected', (participant) => {
    participant.on('trackSubscribed', (track) => {
      if (track.kind === 'video') {
        const remoteVideo = document.getElementById("remote-video");
        remoteVideo.srcObject = new MediaStream([track.mediaStreamTrack]);
      }
    });
  });
}

start();
