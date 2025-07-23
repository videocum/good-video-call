import { connect, createLocalVideoTrack, RoomEvent } from 'https://cdn.skypack.dev/livekit-client';

const livekitURL = 'wss://your-livekit-server-url'; // Replace with your LiveKit server URL
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTMyODE3MTAsImlzcyI6IkFQSTdSZjg0MnpHQWtDNSIsIm5iZiI6MTc1MzI4MDgxMCwic3ViIjoidmlkZW8gY2FsbCIsInZpZGVvIjp7ImNhblB1Ymxpc2giOnRydWUsImNhblB1Ymxpc2hEYXRhIjp0cnVlLCJjYW5TdWJzY3JpYmUiOnRydWUsInJvb20iOiJ2aWRlb2NhbGwiLCJyb29tSm9pbiI6dHJ1ZX19._VWgp2XRL0UsTlZDbHHlQJ9M8LI5KaYhUGFYBidCHq4'; // Replace with your real token

const statusEl = document.getElementById('status');
const videoEl = document.getElementById('local-video');

async function startVideoCall() {
  try {
    const room = await connect(livekitURL, token, {
      autoSubscribe: true,
    });

    const localVideoTrack = await createLocalVideoTrack();
    const mediaStream = new MediaStream([localVideoTrack.mediaStreamTrack]);
    videoEl.srcObject = mediaStream;

    room.localParticipant.publishTrack(localVideoTrack);
    statusEl.textContent = '✅ Connected to LiveKit. Video is live.';

    // Log participants joining/leaving
    room.on(RoomEvent.ParticipantConnected, participant => {
      console.log('Participant connected', participant.identity);
    });

    room.on(RoomEvent.ParticipantDisconnected, participant => {
      console.log('Participant disconnected', participant.identity);
    });

  } catch (err) {
    console.error('❌ Error connecting to LiveKit:', err);
    statusEl.textContent = '❌ Failed to connect: ' + err.message;
  }
}

startVideoCall();
