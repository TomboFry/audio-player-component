(() => {
  // audio-player-component.ts
  var mimeTypeMap = {
    aac: "audio/aac",
    caf: "audio/caf; codecs=opus",
    mp3: "audio/mp3",
    mp4: "audio/mp4",
    m4a: "audio/mp4",
    oga: "audio/ogg; codecs=vorbis",
    ogg: "audio/ogg; codecs=vorbis",
    opus: "audio/ogg; codecs=opus",
    wav: "audio/wave",
    webm: "audio/webm"
  };
  var AudioPlayer = class _AudioPlayer extends HTMLElement {
    #songTitle;
    #songArtist;
    #isCompact;
    #audio = document.createElement("audio");
    #playBtn = null;
    #isPlaying = false;
    #isLoaded = false;
    #shadow;
    static get observedAttributes() {
      return [
        "title",
        "artist",
        "image",
        "compact",
        "blurred",
        "min-height",
        "sources",
        "colour",
        "dark",
        "length-secs"
      ];
    }
    static get svgPlay() {
      return '<svg xmlns="https://www.w3.org/2000/svg" width="24" height="24" viewBox="-1 0 23 24"><title>Play</title><polygon class="icon-play" points="19.05 12 6 3.36 6 20.64 19.05 12"/></svg>';
    }
    static get svgPause() {
      return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>Pause</title><g><rect class="icon-pause" x="6" y="3" width="4" height="18"/><rect class="icon-pause" x="14" y="3" width="4" height="18"/></g></svg>';
    }
    static get svgLoading() {
      return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="loading"><circle cx="12" cy="4" r="2.5"/><circle cx="6" cy="6" r="2.25"/><circle cx="4" cy="12" r="2"/><circle cx="6" cy="18" r="1.75"/><circle cx="12" cy="20" r="1.5"/><circle cx="18" cy="18" r="1.25"/><circle cx="20" cy="12" r="1"/><circle cx="18" cy="6" r="0.75"/></svg>';
    }
    constructor() {
      super();
      this.#shadow = this.attachShadow({ mode: "open" });
      this.#songTitle = this.getAttribute("title");
      this.#songArtist = this.getAttribute("artist");
      this.#isCompact = this.getAttribute("compact") !== null;
      const preload = this.getAttribute("preload") ?? "auto";
      if (preload === "" || preload === "none" || preload === "auto" || preload === "metadata") {
        this.#audio.preload = preload;
      }
      const sources = this.getAttribute("sources")?.split(",") ?? [];
      this.loadAudio(sources);
      this.#shadow.appendChild(_AudioPlayer.createElement({ tagName: "style", textContent: this.styleCss }));
      this.createPlayer();
    }
    static padTime(num) {
      return num < 10 ? `0${num}` : num.toString();
    }
    static createElement({ tagName = "div", className = "", ...props } = {}) {
      const elm = document.createElement(tagName);
      elm.className = className;
      for (const [key, value] of Object.entries(props)) {
        elm[key] = value;
      }
      return elm;
    }
    loadAudio(sources) {
      if (sources.length === 1) {
        this.#audio.src = sources[0];
        return;
      }
      for (const src of sources) {
        const extension = src.split(".").pop();
        const type = mimeTypeMap[extension ?? "mp3"];
        if (!type) {
          console.warn(`Could not find MIME-type for '${extension}' type. Skipping.`);
          continue;
        }
        this.#audio.appendChild(
          _AudioPlayer.createElement({
            tagName: "source",
            src,
            type
          })
        );
      }
    }
    get styleCss() {
      return `
		.tap--container {
			width: 100%;
			position: relative;
			display: flex;
			flex-direction: column;
			overflow: hidden;
			border-radius: 32px;
			box-shadow: 0 2px 16px rgba(0, 0, 0, 0.25);
			justify-content: flex-end;
		}

		.tap--overlay {
			background: linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%);
			position: absolute;
			width: 100%;
			height: 100%;
			z-index: -998;
		}

		.tap--img {
			position: absolute;
			width: 100%;
			height: 100%;
			object-fit: cover;
			z-index: -999;
		}

		.tap--img.blurred {
			filter: blur(16px);
		}

		.tap--metadata {
			display: flex;
			flex-direction: column;
			margin: 32px;
			color: #fff;
			user-select: none;
			text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
		}

		.tap--metadata__title {
			font-size: 32px;
			font-weight: 700;
			display: block;
			margin-bottom: 16px;
		}

		.tap--metadata__artist {
			font-size: 28px;
			font-weight: 400;
		}

		.tap--container .tap--controls {
			margin: 0 16px 16px;
		}

		.tap--controls {
			display: flex;
			background-color: var(--audio-player-controls-bg);
			border-radius: 32px;
			height: 64px;
			align-items: center;
			box-shadow: 0 2px 16px rgba(0, 0, 0, 0.25);

			--audio-player-controls-bg: #f9f9f9;
			--audio-player-button: #fff;
			--audio-player-button-hover: #f9f9f9;
			--audio-player-border: #999;
			--audio-player-border-hover: #666;
			--audio-player-progress: #f0f0f0;
			--audio-player-text: #333;
		}
		.tap--controls.dark {
			--audio-player-controls-bg: #222;
			--audio-player-button: #333;
			--audio-player-button-hover: #555;
			--audio-player-border: #aaa;
			--audio-player-border-hover: #bbb;
			--audio-player-progress: #555;
			--audio-player-text: #fff;
		}

		.tap--button {
			cursor: pointer;
			font-size: 24px;
			border-radius: 24px;
			width: 48px;
			height: 48px;
			position: relative;
			margin-left: 8px;
			background-color: var(--audio-player-button);
		}

		.tap--button:hover {
			border: 2px solid var(--audio-player-border-hover);
			background-color: var(--audio-player-button-hover);
		}

		.tap--button,
		.tap--progress--bar {
			border: 2px solid var(--audio-player-border);
		}

		.tap--button svg {
			position: absolute;
			top: 12.5%;
			left: 12.5%;
			width: 75%;
			height: 75%;
			fill: var(--audio-player-text);
		}

		.tap--progress--bar {
			flex: 1;
			height: 24px;
			background-color: var(--audio-player-progress);
			border-radius: 12px;
			margin: 0 12px;
			cursor: pointer;
			position: relative;
			overflow: hidden;
		}

		.tap--progress--playhead {
			border-radius: 0 12px 12px 0;
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 0%;
			pointer-events: none;
			transition: width 0.2s;
		}

		.tap--progress--playhead {
			box-shadow: 0 0 32px rgba(0, 0, 0, 0.75);
		}

		.tap--progress--timestamp {
			font-weight: 700;
			font-family: monospace;
			margin-right: 16px;
			color: var(--audio-player-text);
			user-select: none;
		}

		.loading {
			animation: 1s infinite loading linear;
		}

		@keyframes loading {
			from { transform: rotate(0); }
			to { transform: rotate(360deg); }
		}

		@media (max-width: 640px) {
			.tap--metadata__title {
				font-size: 24px;
			}
			.tap--metadata__artist {
				font-size: 18px;
			}
			.tap--container .tap--controls {
				margin: 8px;
			}
		}
		`;
    }
    addOverlayToContainer(container) {
      if (this.#isCompact) return;
      const img = _AudioPlayer.createElement({
        tagName: "img",
        className: "tap--img",
        src: this.getAttribute("image") || ""
      });
      const blurred = this.getAttribute("blurred");
      const isBlurred = blurred === null ? !!(this.#songTitle && this.#songArtist) : blurred !== "false";
      if (isBlurred) {
        img.classList.add("blurred");
      }
      container.appendChild(img);
      if (!(this.#songTitle && this.#songArtist)) return;
      const overlay = _AudioPlayer.createElement({ className: "tap--overlay" });
      const metadata = _AudioPlayer.createElement({ className: "tap--metadata" });
      const title = _AudioPlayer.createElement({
        tagName: "span",
        className: "tap--metadata__title",
        innerText: this.#songTitle
      });
      const artist = _AudioPlayer.createElement({
        tagName: "span",
        className: "tap--metadata__artist",
        innerText: this.#songArtist
      });
      metadata.appendChild(title);
      metadata.appendChild(artist);
      container.appendChild(overlay);
      container.appendChild(metadata);
    }
    createPlayer() {
      const container = _AudioPlayer.createElement({ className: "tap--container" });
      if (!this.#isCompact) {
        const minHeightUnsafe = Number(this.getAttribute("min-height") ?? 280);
        const minHeight = Number.isSafeInteger(minHeightUnsafe) ? minHeightUnsafe : 280;
        container.style.minHeight = `${minHeight}px`;
      }
      this.addOverlayToContainer(container);
      const controls = _AudioPlayer.createElement({ className: "tap--controls" });
      if (this.getAttribute("dark") !== null) controls.classList.add("dark");
      const progressBar = _AudioPlayer.createElement({ className: "tap--progress--bar" });
      const progressPlayhead = _AudioPlayer.createElement({ className: "tap--progress--playhead" });
      const progressText = _AudioPlayer.createElement({ className: "tap--progress--timestamp" });
      this.#playBtn = _AudioPlayer.createElement({
        tagName: "button",
        className: "tap--button"
      });
      this.#playBtn.innerHTML = _AudioPlayer.svgPlay;
      progressPlayhead.style.backgroundColor = this.getAttribute("colour") || this.getAttribute("color") || "#3FA9F5";
      const setProgressText = () => {
        const lengthSecs = Number(this.getAttribute("length-secs") ?? 0);
        const currentMins = _AudioPlayer.padTime(Math.floor(this.#audio.currentTime / 60));
        const currentSecs = _AudioPlayer.padTime(Math.floor(this.#audio.currentTime % 60));
        const totalMins = _AudioPlayer.padTime(Math.floor((this.#audio.duration || lengthSecs) / 60));
        const totalSecs = _AudioPlayer.padTime(Math.floor((this.#audio.duration || lengthSecs) % 60));
        progressText.innerHTML = `${currentMins}:${currentSecs}<br/>${totalMins}:${totalSecs}`;
        progressPlayhead.style.width = `${this.#audio.currentTime * 100 / (this.#audio.duration || 1)}%`;
      };
      this.#playBtn.onclick = () => {
        if (this.#isPlaying && !this.#isLoaded) return;
        if (!this.#isPlaying) return this.play();
        this.pause();
      };
      const scrub = (e) => {
        const percentage = e.layerX / e.target.offsetWidth;
        this.#audio.fastSeek(this.#audio.duration * percentage);
      };
      let mousedown = false;
      progressBar.onmousedown = () => {
        mousedown = true;
      };
      progressBar.onmouseup = () => {
        mousedown = false;
      };
      progressBar.onmousemove = (e) => mousedown && scrub(e);
      progressBar.onclick = scrub;
      progressBar.appendChild(progressPlayhead);
      controls.appendChild(this.#playBtn);
      controls.appendChild(progressBar);
      controls.appendChild(progressText);
      setProgressText();
      this.#audio.ondurationchange = setProgressText;
      this.#audio.ontimeupdate = setProgressText;
      this.#audio.onended = () => {
        this.#audio.currentTime = 0;
        this.#isPlaying = false;
        this.#playBtn.innerHTML = _AudioPlayer.svgPlay;
      };
      this.#audio.style.display = "none";
      if (this.#isCompact) {
        this.#shadow.appendChild(controls);
        return;
      }
      container.appendChild(controls);
      this.#shadow.appendChild(container);
    }
    async play() {
      this.#isPlaying = true;
      if (this.#audio.readyState <= 1) {
        this.#audio.load();
        this.#playBtn.innerHTML = _AudioPlayer.svgLoading;
      }
      await this.#audio.play();
      this.#isLoaded = true;
      this.#playBtn.innerHTML = _AudioPlayer.svgPause;
    }
    pause() {
      this.#audio.pause();
      this.#isPlaying = false;
      this.#playBtn.innerHTML = _AudioPlayer.svgPlay;
    }
    stop() {
      this.pause();
      this.#audio.fastSeek(0);
    }
  };
  window.customElements.define("audio-player", AudioPlayer);
})();
