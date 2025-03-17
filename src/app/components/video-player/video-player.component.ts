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
  isLoading = false
  countdown = 0
  isDragging = false

  onTimeUpdate(event: any) {
    this.currentTime = event.target.currentTime
  }

  onLoadedMetadata(event: any) {
    this.duration = event.target.duration
  }

  togglePlay(video: HTMLVideoElement) {
    if (this.isPlaying) {
      video.pause()
      this.isPlaying = false
      return
    }

    this.isLoading = true
    this.countdown = 8

    const countdownInterval = setInterval(() => {
      this.countdown--
      if (this.countdown <= 0) {
        clearInterval(countdownInterval)
        this.isLoading = false
        video.play()
        this.isPlaying = true
      }
    }, 1000)
  }

  seekVideo(event: MouseEvent, video: HTMLVideoElement) {
    const progressBar = event.currentTarget as HTMLElement
    const rect = progressBar.getBoundingClientRect()
    const pos = (event.clientX - rect.left) / progressBar.offsetWidth
    video.currentTime = pos * video.duration
  }

  startDragging(event: MouseEvent, video: HTMLVideoElement) {
    this.isDragging = true
    this.seekVideo(event, video)
  }

  onDrag(event: MouseEvent, video: HTMLVideoElement) {
    if (this.isDragging) {
      this.seekVideo(event, video)
    }
  }

  stopDragging() {
    this.isDragging = false
  }

  onVolumeChange(event: any) {
    this.volume = event.target.value
  }
}
