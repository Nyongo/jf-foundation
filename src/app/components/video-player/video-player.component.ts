import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss',
})
export class VideoPlayerComponent {
  videoUrl = 'assets/videos/video.mp4' // Replace with your video path
  isPlaying = false
  currentTime = 0
  duration = 0
  volume = 1

  onTimeUpdate(event: any) {
    this.currentTime = event.target.currentTime
  }

  onLoadedMetadata(event: any) {
    this.duration = event.target.duration
  }

  togglePlay(video: HTMLVideoElement) {
    if (this.isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    this.isPlaying = !this.isPlaying
  }

  onVolumeChange(event: any) {
    this.volume = event.target.value
  }
}
