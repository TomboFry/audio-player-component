import * as React from 'preact';
import * as ReactDOM from 'preact';
import 'preact/compat';
import { useEffect, useRef, useState } from 'preact/hooks';
import styles from './web-player.module.css';
import type { CSSProperties } from 'preact/compat';

const audio = new Audio();

const classes = (classList: Record<string, boolean> | string[]): string => {
	if (Array.isArray(classList)) return classList.join(' ');

	const output: string[] = [];
	for (const [key, value] of Object.entries(classList)) {
		if (value) output.push(key);
	}
	return output.join(' ');
};

interface PlaylistItem {
	title: string;
	artist?: string;
	album: string;
	src: string;
	imageSrc?: string;
}

interface NowPlayingProps {
	nowPlaying: null | PlaylistItem;
	togglePanel: () => void;
}

const NowPlaying = ({ nowPlaying, togglePanel }: NowPlayingProps) => {
	const { title, album } = nowPlaying ?? { title: 'Nothing is playing right now.' };

	return (
		<div onClick={togglePanel} class={styles.nowPlaying}>
			<div class={styles.metadataTitle}>{title}</div>
			<div class={styles.metadataAlbum}>{album}</div>
		</div>
	);
};

interface PlayButtonsProps {
	buttonsEnabled: boolean;
	isPlaying: boolean;
	isLoading: boolean;
	skipBack: () => void;
	playPause: () => void;
	skipForward: () => void;
}

const PlayButtons = (props: PlayButtonsProps) => {
	const classNames = {
		[styles.button]: true,
		[styles.playbackControlButton]: true,
		[styles.disabled]: !props.buttonsEnabled,
	};
	return (
		<div class={styles.playbackButtons}>
			<div onClick={props.skipBack} class={classes(classNames)}>
				{'\uf049'}
			</div>
			<div
				onClick={props.playPause}
				class={classes({
					...classNames,
					[styles.playing]: props.isPlaying && !props.isLoading,
					[styles.loading]: props.isLoading,
					[styles.playPauseBtn]: true,
				})}
			/>
			<div onClick={props.skipForward} class={classes(classNames)}>
				{'\uf050'}
			</div>
		</div>
	);
};

interface PlayheadProps {
	onClick: (event: MouseEvent) => void;
	buttonsEnabled: boolean;
}

const Playhead = (props: PlayheadProps) => {
	const [playheadWidth, setPlayheadWidth] = useState(0);

	useEffect(() => {
		for (const eventName of ['timeupdate', 'ended']) {
			audio.addEventListener(eventName, () => {
				setPlayheadWidth((100 * audio.currentTime) / (audio.duration || 1));
			});
		}
	}, []);

	const classNames = classes({
		[styles.playheadContainer]: true,
		[styles.disabled]: !props.buttonsEnabled,
	});
	return (
		<div onClick={props.onClick} class={classNames}>
			<div style={{ width: `${playheadWidth}%` }} class={styles.playheadControl} />
		</div>
	);
};

interface PlaylistToggleProps {
	open: boolean;
	togglePanel: () => void;
}

const PlaylistToggle = (props: PlaylistToggleProps) => {
	const classNames = classes({
		[styles.button]: true,
		[styles.playlistToggleButton]: true,
		[styles.open]: props.open,
	});

	return <div onClick={props.togglePanel} className={classNames} />;
};

interface PlaylistProps {
	open: boolean;
	closing: boolean;
	nowPlayingIndex: number;
	closePanel: () => void;
	playSong: (index: number) => void;
	removeSong: (index: number) => void;
	playlist: PlaylistItem[];
}

const PlaylistPanel = (props: PlaylistProps) => {
	const playlistPreviousLength = useRef(0);

	useEffect(() => {
		playlistPreviousLength.current = props.playlist.length;
	}, [props.playlist.length]);

	const items = [];
	for (let i = 0; i < props.playlist.length; i++) {
		const { title, album, src } = props.playlist[i];
		const classNames = classes({
			[styles.playlistItem]: true,
			[styles.currentlyPlaying]: props.nowPlayingIndex === i,
			[styles.newItem]: i >= playlistPreviousLength.current,
		});
		items.push(
			<div key={src} class={classNames}>
				<div class={styles.playIndicator}> </div>
				<div class={styles.metadata} onClick={() => props.playSong(i)}>
					<div class={styles.title}>{title}</div>
					<div class={styles.album}>{album}</div>
				</div>
				<div
					class={classes([styles.removeBtn, styles.button])}
					onClick={() => props.removeSong(i)}
				/>
			</div>,
		);
	}

	if (items.length === 0) {
		items.push(
			<div class={styles.playlistEmpty}>
				<p>
					<strong>There's nothing in the queue.</strong>
				</p>
				<p>
					You can play music by clicking "Play" on any music player, or the plus icon to
					add it to the end of the queue.
				</p>
			</div>,
		);
	}

	const classNames = classes({
		[styles.playlistPanel]: true,
		[styles.open]: props.open,
		[styles.closing]: props.closing,
	});
	return (
		<div className={classNames}>
			<div className={styles.playlistTitle} onClick={props.closePanel}>
				Play Queue
			</div>
			{items}
		</div>
	);
};

interface FloatingButtonProps {
	nowPlaying: PlaylistItem | null;
	isPlaying: boolean;
	onClick: () => void;
}

const FloatingButton = (props: FloatingButtonProps) => {
	const imageSrc = props.nowPlaying?.imageSrc;

	const style: CSSProperties = {
		backgroundImage: imageSrc && props.isPlaying ? `url(${imageSrc})` : null,
	};

	const className = classes({
		[styles.button]: true,
		[styles.floatingButton]: true,
		[styles.hasImage]: imageSrc && props.isPlaying,
	});

	return <div onClick={props.onClick} className={className} style={style} />;
};

const setNavigatorPlaybackState = (state: MediaSessionPlaybackState) => {
	if (!('mediaSession' in navigator)) return;
	navigator.mediaSession.playbackState = state;
};
const setNavigatorPositionState = () => {
	if (!('mediaSession' in navigator)) return;
	navigator.mediaSession.setPositionState({
		duration: audio.duration,
		playbackRate: audio.playbackRate,
		position: audio.currentTime,
	});
};
const setNavigatorMetadata = (nowPlaying: PlaylistItem | null) => {
	if (!('mediaSession' in navigator)) return;
	if (nowPlaying === null) {
		navigator.mediaSession.metadata = null;
		return;
	}

	const metadata: MediaMetadataInit = {
		album: nowPlaying.album,
		artist: nowPlaying.artist,
		title: nowPlaying.title,
	};

	if (nowPlaying.imageSrc) {
		metadata.artwork = [{ src: nowPlaying.imageSrc }];
	}

	navigator.mediaSession.metadata = new MediaMetadata(metadata);
};

interface PlayerProps {
	css: string;
}

const Player = (props: PlayerProps) => {
	const [playPanelOpen, setPlayPanelOpen] = useState(false);
	const [playlistPanelOpen, setPlaylistPanelOpen] = useState(false);
	const [playlistPanelClosing, setPlaylistPanelClosing] = useState(false);

	const nowPlayingIndex = useRef<number | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [playlist, setPlaylist] = useState<PlaylistItem[]>([]);
	const nowPlaying = () => (nowPlayingIndex.current === null ? null : playlist[nowPlayingIndex.current]);

	useEffect(() => {
		audio.onended = () => {
			if (nowPlayingIndex.current === playlist.length - 1) {
				stop();
				return;
			}
			skipForward();
		};

		if (!('mediaSession' in navigator)) return;
		navigator.mediaSession.setActionHandler('pause', () => playPause(true));
		navigator.mediaSession.setActionHandler('play', () => playPause(false));
		navigator.mediaSession.setActionHandler('nexttrack', skipForward);
		navigator.mediaSession.setActionHandler('previoustrack', skipBack);
		navigator.mediaSession.setActionHandler('stop', stop);
		navigator.mediaSession.setActionHandler('seekbackward', seek);
		navigator.mediaSession.setActionHandler('seekforward', seek);
		navigator.mediaSession.setActionHandler('seekto', seek);
	}, [playlist]);

	const setupAudioPlayer = () => {
		if (nowPlayingIndex.current === null) return;
		setIsLoading(true);
		audio.src = playlist[nowPlayingIndex.current].src;
		audio.currentTime = 0;
		audio.load();
	};

	const skipForward = () => {
		if (nowPlaying() === null) return;
		playSong(nowPlayingIndex.current < playlist.length - 1 ? nowPlayingIndex.current + 1 : 0);
	};

	const skipBack = () => {
		if (nowPlaying() === null) return;
		playSong(nowPlayingIndex.current > 0 ? nowPlayingIndex.current - 1 : playlist.length - 1);
	};

	const stop = () => {
		audio.pause();
		audio.currentTime = 0;
		nowPlayingIndex.current = null;
		setIsPlaying(false);
		setNavigatorPlaybackState('none');
		setNavigatorMetadata(null);
	};

	const playPause = (playingOverride: boolean = null) => {
		let actualIsPlaying = isPlaying;
		if (typeof playingOverride === 'boolean') {
			actualIsPlaying = playingOverride;
		}

		if (nowPlaying() === null && !actualIsPlaying) {
			if (playlist.length === 0) return;
			nowPlayingIndex.current = 0;
			setupAudioPlayer();
		}

		if (!actualIsPlaying) {
			audio.play().then(() => {
				setIsLoading(false);
				setIsPlaying(true);
				setNavigatorPlaybackState('playing');
				setNavigatorMetadata(nowPlaying());
				setNavigatorPositionState();
			});
			return;
		}

		if (actualIsPlaying) {
			audio.pause();
			setIsPlaying(false);
			setNavigatorPlaybackState('paused');
		}
	};

	const seek = (details: MediaSessionActionDetails) => {
		let newTime = audio.currentTime;

		if (details.action === 'seekto') {
			newTime = details.seekTime || audio.currentTime;
		}
		if (details.action === 'seekbackward') {
			newTime -= details.seekOffset || 5;
		}
		if (details.action === 'seekforward') {
			newTime += details.seekOffset || 5;
		}

		setNavigatorPositionState();

		if (details.fastSeek && audio.fastSeek) {
			audio.fastSeek(newTime);
			return;
		}

		audio.currentTime = newTime;
	};

	const seekEvent = (event: MouseEvent) => {
		const percentage = event.layerX / (event.target as HTMLDivElement).offsetWidth;
		seek({ action: 'seekto', seekTime: audio.duration * percentage });
	};

	const playSong = (index: number) => {
		nowPlayingIndex.current = index;
		setupAudioPlayer();
		setIsPlaying(false);
		playPause(false);
	};

	const togglePlaylistPanelOpen = () => {
		if (!playlistPanelOpen) {
			setPlaylistPanelOpen(true);
			setPlaylistPanelClosing(false);
			return;
		}
		setPlaylistPanelClosing(true);
		setTimeout(() => {
			setPlaylistPanelClosing(false);
			setPlaylistPanelOpen(false);
		}, 150);
	};
	const togglePlayPanelOpen = () => setPlayPanelOpen(open => !open);

	const loadPlaylistFromJson = async (url: string, playImmediately = false) => {
		const json: PlaylistItem[] = await (await fetch(url)).json();
		if (!(Array.isArray(json) && json.every(item => !!item.src))) {
			throw new Error(
				'JSON contains invalid data - must be an array of objects, containing at minimum `src`.',
			);
		}

		if (playImmediately) {
			addToPlaylistAndPlay(json);
			return;
		}

		addToPlaylist(json);
	};

	const addToPlaylist = (items: PlaylistItem | PlaylistItem[]) => {
		if (playlist.length === 0) {
			setPlayPanelOpen(true);
			setPlaylistPanelOpen(true);
		}
		setPlaylist(list => list.concat(items));
	};

	const addToPlaylistAndPlay = (items: PlaylistItem | PlaylistItem[]) => {
		const len = playlist.length;
		setPlayPanelOpen(true);
		addToPlaylist(items);

		// ! This is a big hack - we want to make sure the `playSong`
		// ! function has at least the first song in array by the time
		// ! we play it, but the `addToPlaylist` function will only
		// ! update the array by the next render.
		playlist.push(Array.isArray(items) ? items[0] : items);

		playSong(len);
	};

	const removeFromPlaylist = (index: number) => {
		if (nowPlayingIndex.current === index || playlist.length === 1) {
			stop();
		}
		if (nowPlayingIndex.current > index) {
			nowPlayingIndex.current -= 1;
		}
		setPlaylist(list => {
			const newList = [...list];
			newList.splice(index, 1);
			return newList;
		});
	};

	// @ts-expect-error
	window.TomboAudioPlayer = {
		audio,
		addToPlaylist,
		addToPlaylistAndPlay,
		playPause,
		skipBack,
		skipForward,
		loadPlaylistFromJson,
	};

	const playPanelClasses = classes({
		[styles.playPanel]: true,
		[styles.open]: playPanelOpen,
	});

	return (
		<>
			<link rel="stylesheet" type="text/css" href={props.css} />
			<div class={styles.container}>
				<div class={playPanelClasses}>
					<NowPlaying togglePanel={togglePlaylistPanelOpen} nowPlaying={nowPlaying()} />
					<PlayButtons
						buttonsEnabled={!!nowPlaying()}
						playPause={playPause}
						skipBack={skipBack}
						skipForward={skipForward}
						isPlaying={isPlaying}
						isLoading={isLoading}
					/>
					<Playhead buttonsEnabled={!!nowPlaying()} onClick={seekEvent} />
					<PlaylistToggle
						open={playlistPanelOpen}
						togglePanel={togglePlaylistPanelOpen}
					/>
					<PlaylistPanel
						open={playlistPanelOpen}
						closing={playlistPanelClosing}
						playlist={playlist}
						playSong={playSong}
						removeSong={removeFromPlaylist}
						nowPlayingIndex={nowPlayingIndex.current}
						closePanel={togglePlaylistPanelOpen}
					/>
				</div>
				<FloatingButton
					isPlaying={isPlaying}
					nowPlaying={nowPlaying()}
					onClick={togglePlayPanelOpen}
				/>
			</div>
		</>
	);
};

(async () => {
	const { default: r2wc } = await import('react-to-webcomponent');
	// @ts-expect-error
	const WebPlayer = r2wc(Player, React, ReactDOM, {
		props: {
			css: 'string',
		},
		shadow: 'open',
	});
	window.customElements.define('web-player', WebPlayer);
})();
