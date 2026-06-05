'use client';

import { useEffect } from 'react';

interface GuiaTrackerProps {
  guideName: string; // ex: "Currículo de Impacto"
}

const ANALYTICS_URL = 'https://softechservicos.vercel.app/api/capacita-pgm/analytics';

function track(payload: Record<string, string>) {
  fetch(ANALYTICS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(() => {}); // silently ignore network errors
}

export default function GuiaTracker({ guideName }: GuiaTrackerProps) {
  useEffect(() => {
    // ── 1. Guide page view ──────────────────────────────────────────────────
    track({
      event: 'guide_view',
      guide_name: guideName,
      page: window.location.pathname,
    });

    // ── 2. Audio play ───────────────────────────────────────────────────────
    const audioElements = document.querySelectorAll<HTMLAudioElement>('audio');
    const audioHandlers: Array<{ el: HTMLAudioElement; fn: () => void }> = [];

    audioElements.forEach((audio) => {
      // Try to extract title from nearby <p> element
      const titleEl =
        audio.closest('div')?.querySelector('p') ||
        audio.parentElement?.querySelector('p');
      const audioTitle = titleEl?.textContent?.trim().slice(0, 80) || guideName;

      let played = false; // fire only once per audio per page load
      const onPlay = () => {
        if (played) return;
        played = true;
        track({
          event: 'audio_play',
          guide_name: guideName,
          audio_title: audioTitle,
        });
      };

      audio.addEventListener('play', onPlay);
      audioHandlers.push({ el: audio, fn: onPlay });
    });

    // ── 3. Video wrapper click (YouTube iframe cross-origin workaround) ─────
    // Detect click on iframe using window blur + hover state
    const iframeWrappers = document.querySelectorAll<HTMLElement>(
      'div.aspect-video, div[class*="pb-\\[56"], div[class*="relative"][class*="h-0"]'
    );
    const hoverState = new Map<HTMLElement, boolean>();
    const wrapperHandlers: Array<{ el: HTMLElement; event: string; fn: () => void }> = [];

    iframeWrappers.forEach((wrapper) => {
      const onEnter = () => hoverState.set(wrapper, true);
      const onLeave = () => hoverState.set(wrapper, false);
      wrapper.addEventListener('mouseenter', onEnter);
      wrapper.addEventListener('mouseleave', onLeave);
      wrapperHandlers.push({ el: wrapper, event: 'mouseenter', fn: onEnter });
      wrapperHandlers.push({ el: wrapper, event: 'mouseleave', fn: onLeave });
    });

    const clickedVideos = new Set<string>();

    const onWindowBlur = () => {
      iframeWrappers.forEach((wrapper) => {
        if (hoverState.get(wrapper)) {
          const iframe = wrapper.querySelector('iframe');
          if (!iframe) return;

          const src = iframe.getAttribute('src') || '';
          const title = iframe.getAttribute('title') || guideName;
          const videoIdMatch = src.match(/embed\/([a-zA-Z0-9_-]+)/);
          const videoId = videoIdMatch ? videoIdMatch[1] : src;

          if (clickedVideos.has(videoId)) return;
          clickedVideos.add(videoId);

          track({
            event: 'video_interact',
            guide_name: guideName,
            video_title: title,
            video_id: videoId,
          });
        }
      });
    };

    window.addEventListener('blur', onWindowBlur);

    // ── 4. Infographic download ─────────────────────────────────────────────
    const downloadLinks = document.querySelectorAll<HTMLAnchorElement>('a[download]');
    const downloadHandlers: Array<{ el: HTMLAnchorElement; fn: () => void }> = [];

    downloadLinks.forEach((link) => {
      const fileName = link.getAttribute('href')?.split('/').pop() || 'infografico';
      const fn = () => {
        track({
          event: 'infographic_download',
          guide_name: guideName,
          file_name: fileName,
        });
      };
      link.addEventListener('click', fn);
      downloadHandlers.push({ el: link, fn });
    });

    // ── 5. External link clicks inside guide ────────────────────────────────
    const externalLinks = document.querySelectorAll<HTMLAnchorElement>(
      'a[target="_blank"][href^="http"]'
    );
    const linkHandlers: Array<{ el: HTMLAnchorElement; fn: () => void }> = [];

    externalLinks.forEach((link) => {
      const url = link.getAttribute('href') || '';
      const label =
        link.querySelector('div')?.textContent?.trim().slice(0, 60) ||
        link.textContent?.trim().slice(0, 60) ||
        url;

      const fn = () => {
        track({
          event: 'external_link_click',
          guide_name: guideName,
          link_label: label,
          url,
        });
      };
      link.addEventListener('click', fn);
      linkHandlers.push({ el: link, fn });
    });

    // ── Cleanup ─────────────────────────────────────────────────────────────
    return () => {
      audioHandlers.forEach(({ el, fn }) => el.removeEventListener('play', fn));
      wrapperHandlers.forEach(({ el, event, fn }) => el.removeEventListener(event, fn));
      window.removeEventListener('blur', onWindowBlur);
      downloadHandlers.forEach(({ el, fn }) => el.removeEventListener('click', fn));
      linkHandlers.forEach(({ el, fn }) => el.removeEventListener('click', fn));
    };
  }, [guideName]);

  // Renders nothing — purely behavioral
  return null;
}
