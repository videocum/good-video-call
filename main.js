import { Room, connect } from 'https://cdn.skypack.dev/@livekit/client';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTMyODE3MTAsImlzcyI6IkFQSTdSZjg0MnpHQWtDNSIsIm5iZiI6MTc1MzI4MDgxMCwic3ViIjoidmlkZW8gY2FsbCIsInZpZGVvIjp7ImNhblB1Ymxpc2giOnRydWUsImNhblB1Ymxpc2hEYXRhIjp0cnVlLCJjYW5TdWJzY3JpYmUiOnRydWUsInJvb20iOiJ2aWRlb2NhbGwiLCJyb29tSm9pbiI6dHJ1ZX19._VWgp2XRL0UsTlZDbHHlQJ9M8LI5KaYhUGFYBidCHq4';
const livekitUrl = 'wss://facechangerapp-dbpjte7v.livekit.cloud';

const room = new Room();

try {
  const localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
  });

  // Show local video
  const videoElement = document.getElementById('local-video');
  videoElement.srcObject = localStream;
  await videoElement.play();

  // Connect to LiveKit room
  await room.connect(livekitUrl, token);
  console.log('Connected to LiveKit');

  // Publish camera + mic
  await room.localParticipant.publishTracks(localStream.getTracks());
} catch (err) {
  console.error('Failed to connect or open camera', err);
  alert('Could not access camera/microphone. Please allow permissions.');
}
