const mimeTypeMap: Record<string, string> = {
	aac: 'audio/aac',
	caf: 'audio/caf; codecs=opus',
	mp3: 'audio/mp3',
	mp4: 'audio/mp4',
	m4a: 'audio/mp4',
	oga: 'audio/ogg; codecs=vorbis',
	ogg: 'audio/ogg; codecs=vorbis',
	opus: 'audio/ogg; codecs=opus',
	wav: 'audio/wave',
	webm: 'audio/webm',
};

class AudioPlayer extends HTMLElement {
	#songTitle: string | null;
	#songArtist: string | null;
	#songImage: string;
	#isCompact: boolean;
	#isBlurred: boolean;
	#isPlaying = false;
	#minHeight = 280;
	#audio: HTMLAudioElement = document.createElement('audio');

	#shadow: ShadowRoot;

	static get observedAttributes() {
		return ['title', 'artist', 'image', 'sources', 'compact', 'min-height'];
	}

	static get svgPlay() {
		return '<svg xmlns="https://www.w3.org/2000/svg" width="24" height="24" viewBox="-1 0 23 24"><title>Play</title><polygon class="icon-play" points="19.05 12 6 3.36 6 20.64 19.05 12"/></svg>';
	}
	static get svgPause() {
		return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>Pause</title><g><rect class="icon-pause" x="6" y="3" width="4" height="18"/><rect class="icon-pause" x="14" y="3" width="4" height="18"/></g></svg>';
	}

	constructor() {
		super();

		this.#shadow = this.attachShadow({ mode: 'open' });
		this.#songTitle = this.getAttribute('title');
		this.#songArtist = this.getAttribute('artist');
		this.#songImage = this.getAttribute('image') || '';
		this.#isCompact = this.getAttribute('compact') !== null;
		this.#isBlurred = this.getAttribute('blurred') !== 'false' || !(this.#songTitle && this.#songArtist);

		const minHeight = Number(this.getAttribute('min-height') ?? 280);
		this.#minHeight = Number.isSafeInteger(minHeight) ? minHeight : 280;

		const sources = this.getAttribute('sources')?.split(',') ?? [];
		this.loadAudio(sources);

		// Apply CSS and add audio element to DOM
		this.#shadow.appendChild(AudioPlayer.createElement({ tagName: 'style', textContent: this.styleCss }));

		this.createPlayer();
	}

	static padTime(num: number) {
		return num < 10 ? `0${num}` : num.toString();
	}

	static createElement({ tagName = 'div', className = '', ...props }: Record<string, string> = {}) {
		const elm = document.createElement(tagName);
		elm.className = className;

		for (const [key, value] of Object.entries(props)) {
			elm[key] = value;
		}

		return elm;
	}

	loadAudio(sources: string[]) {
		for (const src of sources) {
			const extension = src.split('.').pop();
			const type = mimeTypeMap[extension ?? 'mp3'];
			if (!type) {
				console.warn(`Could not find MIME-type for '${extension}' type. Skipping.`);
				continue;
			}

			this.#audio.appendChild(
				AudioPlayer.createElement({
					tagName: 'source',
					src,
					type,
				}),
			);
		}
		this.#audio.load();
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
			font-weight: 900;
			display: block;
			margin-bottom: 16px;
		}

		.tap--metadata__artist {
			font-size: 28px;
			font-weight: 700;
		}

		.tap--container .tap--controls {
			margin: 0 16px 16px;
		}

		.tap--controls {
			display: flex;
			background-color: #f9f9f9;
			border-radius: 32px;
			height: 64px;
			align-items: center;
			box-shadow: 0 2px 16px rgba(0, 0, 0, 0.25);
		}

		.tap--button {
			cursor: pointer;
			border: 0;
			font-size: 24px;
			border-radius: 24px;
			width: 48px;
			height: 48px;
			position: relative;
			background-color: #fff;
			margin-left: 8px;
		}

		.tap--button:hover {
			background-color: #f9f9f9;
			border: 2px solid #666;
		}

		.tap--button,
		.tap--progress--bar {
			border: 2px solid #999;
		}

		.tap--button svg {
			position: absolute;
			top: 12.5%;
			left: 12.5%;
			width: 75%;
			height: 75%;
			fill: var(--text);
		}

		.tap--progress--bar {
			flex: 1;
			height: 24px;
			background-color: #f0f0f0;
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
			background-color: var(--primary);
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
			color: var(--text);
			user-select: none;
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

	addOverlayToContainer(container: HTMLElement) {
		if (this.#isCompact) return;

		const img = AudioPlayer.createElement({
			tagName: 'img',
			className: 'tap--img',
			src: this.#songImage,
		});
		if (this.#isBlurred) {
			img.classList.add('blurred');
		}
		container.appendChild(img);

		if (!(this.#songTitle && this.#songArtist)) return;

		const overlay = AudioPlayer.createElement({ className: 'tap--overlay' });
		const metadata = AudioPlayer.createElement({ className: 'tap--metadata' });
		const title = AudioPlayer.createElement({
			tagName: 'span',
			className: 'tap--metadata__title',
			innerText: this.#songTitle,
		});
		const artist = AudioPlayer.createElement({
			tagName: 'span',
			className: 'tap--metadata__artist',
			innerText: this.#songArtist,
		});

		metadata.appendChild(title);
		metadata.appendChild(artist);
		container.appendChild(overlay);
		container.appendChild(metadata);
	}

	createPlayer() {
		// Create elements
		const container = AudioPlayer.createElement({ className: 'tap--container' });
		if (!this.#isCompact) {
			container.style.minHeight = `${this.#minHeight}px`;
		}
		this.addOverlayToContainer(container);

		const controls = AudioPlayer.createElement({ className: 'tap--controls' });
		const progressBar = AudioPlayer.createElement({ className: 'tap--progress--bar' });
		const progressPlayhead = AudioPlayer.createElement({ className: 'tap--progress--playhead' });
		const progressText = AudioPlayer.createElement({ className: 'tap--progress--timestamp' });
		const playBtn = AudioPlayer.createElement({ tagName: 'button', className: 'tap--button' });
		playBtn.innerHTML = AudioPlayer.svgPlay;

		const setProgressText = () => {
			const currentMins = AudioPlayer.padTime(Math.floor(this.#audio.currentTime / 60));
			const currentSecs = AudioPlayer.padTime(Math.floor(this.#audio.currentTime % 60));

			const totalMins = AudioPlayer.padTime(Math.floor((this.#audio.duration || 0) / 60));
			const totalSecs = AudioPlayer.padTime(Math.floor((this.#audio.duration || 0) % 60));

			progressText.innerHTML = `${currentMins}:${currentSecs}<br/>${totalMins}:${totalSecs}`;
			progressPlayhead.style.width = `${(this.#audio.currentTime * 100) / (this.#audio.duration || 1)}%`;
		};

		// User interaction
		playBtn.onclick = () => {
			if (!this.#isPlaying) {
				this.#audio.play();
				this.#isPlaying = true;
				playBtn.innerHTML = AudioPlayer.svgPause;
				return;
			}

			this.#audio.pause();
			this.#isPlaying = false;
			playBtn.innerHTML = AudioPlayer.svgPlay;
		};

		const scrub = (e: MouseEvent) => {
			const percentage = e.layerX / (e.target as HTMLDivElement).offsetWidth;
			this.#audio.fastSeek(this.#audio.duration * percentage);
		};

		let mousedown = false;

		progressBar.onmousedown = () => {
			mousedown = true;
		};

		progressBar.onmouseup = () => {
			mousedown = false;
		};

		progressBar.onmousemove = e => mousedown && scrub(e);
		progressBar.onclick = scrub;

		progressBar.appendChild(progressPlayhead);

		controls.appendChild(playBtn);
		controls.appendChild(progressBar);
		controls.appendChild(progressText);

		setProgressText();
		this.#audio.ondurationchange = setProgressText;
		this.#audio.ontimeupdate = setProgressText;

		this.#audio.onended = () => {
			this.#audio.currentTime = 0;
			this.#isPlaying = false;
			playBtn.innerHTML = AudioPlayer.svgPlay;
		};

		this.#audio.style.display = 'none';

		if (this.#isCompact) {
			this.#shadow.appendChild(controls);
			return;
		}

		container.appendChild(controls);
		this.#shadow.appendChild(container);
	}
}

window.customElements.define('audio-player', AudioPlayer);
